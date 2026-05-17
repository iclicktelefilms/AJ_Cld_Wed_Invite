import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { invitation_id } = await req.json();
    if (!invitation_id) return NextResponse.json({ ok: true });

    // TODO: call Supabase increment_invitation_views function
    // await supabase.rpc("increment_invitation_views", { inv_id: invitation_id });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
