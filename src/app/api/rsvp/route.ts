import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { invitation_id, name, phone, attending } = body;

    if (!invitation_id || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: Insert into Supabase
    // const { error } = await supabase.from("rsvps").insert({ invitation_id, name, phone, attending });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
