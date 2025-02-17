import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    const { user_id } = await request.json();

    if (!user_id) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400}
        )
    }

    const { error } = await supabase
        .from("prompt_history")
        .delete()
        .eq("user_id", user_id)

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status:400 }
        )
    }

    return NextResponse.json(
        { message: "Prompt successfully cleared" }
    )
}