import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Fetch from Supabase with auth
  return NextResponse.json({ invitations: [] });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: Create in Supabase
    return NextResponse.json({ id: "new-invitation-id", ...body });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
