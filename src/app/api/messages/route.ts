// api/messages.ts or api/messages/route.ts (depending on your Next.js version)
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    const params = request.nextUrl.searchParams;
    const user_id = params.get('user_id');
    
    if (!user_id) {
      console.error("Missing user_id parameter");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    
    const { data, error } = await supabase
      .from("messages")
      .select("sender, content")
      .eq("user_id", user_id)
      .order("created_at", { ascending: true });
      
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    // If no messages found, return an empty array rather than an error
    return NextResponse.json(data || []);
    
  } catch (err) {
    console.error("Unexpected error in GET /api/messages:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}