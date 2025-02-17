// api/conversations
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";


// Get the prompt history
export async function GET(request: NextRequest) {
    const supabase = await createClient();

    const params = request.nextUrl.searchParams;
    const user_id = params.get('user_id');

    if (!user_id) {
        return NextResponse.json(
            { error: "User ID is required"},
            { status: 400 }
        );
    }

    const { data, error } = await supabase
        .from("prompt_history")
        .select("prompt, prompt_id, created_at")
        .eq("user_id", user_id)
        .order("created_at", { ascending: true });

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json(data);
}

// Start a new conversation
export async function POST(request: NextRequest) {
    const supabase = await createClient();
    const { user_id } = await request.json();

    if (!user_id) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
        );
    }

    const { error } = await supabase
        .from("messages")
        .delete()
        .eq("user_id", user_id);

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json({ message: "Conversation started" });
}