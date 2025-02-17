import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error("Failed to parse request body:", err);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }
    
    const { user_id, prompt } = body;
    
    if (!user_id || !prompt) {
      console.error("Missing required fields:", { user_id, prompt });
      return NextResponse.json(
        { error: "User ID and prompt are required" },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user_id)
      .single();
    
    if (userError || !user) {
      console.error("User does not exist:", userError);
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }
    
    // 1. Store the user's prompt in prompt_history
    const { error: promptHistoryError } = await supabase
      .from("prompt_history")
      .insert([{ user_id, prompt }]);
      
    if (promptHistoryError) {
      console.error("Error inserting into prompt_history:", promptHistoryError);
      return NextResponse.json(
        { error: promptHistoryError.message },
        { status: 400 }
      );
    }
    
    // 2. Get previous messages for context
    const { data: previousMessages, error: messagesError } = await supabase
      .from("messages")
      .select("sender, content")
      .eq("user_id", user_id)
      .order("created_at", { ascending: true });
      
    if (messagesError) {
      console.error("Error fetching previous messages:", messagesError);
      return NextResponse.json(
        { error: messagesError.message },
        { status: 400 }
      );
    }
    
    // 3. Format messages for API call
    const formattedMessages = (previousMessages || []).map(msg => ({
      sender: msg.sender === user_id ? "user" : "bot",
      content: msg.content
    }));
    
    // 4. Call the FastAPI chatbot endpoint
    const apiUrl = "http://localhost:8000";
    console.log("Calling API at:", `${apiUrl}/chatbot/response`);
    
    let response;
    try {
      response = await fetch(`${apiUrl}/chatbot/response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          prompt,
          messages: formattedMessages
        }),
      });
    } catch (err) {
      console.error("Error calling FastAPI endpoint:", err);
      return NextResponse.json(
        { error: "Failed to connect to chatbot service" },
        { status: 503 }
      );
    }
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { detail: "Unknown error from chatbot service" };
      }
      console.error("Error response from FastAPI:", errorData);
      return NextResponse.json(
        { error: errorData.detail || "Error from chatbot service" },
        { status: response.status }
      );
    }
    
    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.error("Error parsing FastAPI response:", err);
      return NextResponse.json(
        { error: "Invalid response from chatbot service" },
        { status: 502 }
      );
    }
    
    return NextResponse.json({ response: data.response });
    
  } catch (error) {
    console.error("Unexpected error in POST /api/chatbot/response:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}