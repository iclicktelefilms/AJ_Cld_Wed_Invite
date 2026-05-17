import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // TODO: Upload to Cloudflare R2
    // const key = generateMediaKey(studioId, invitationId, file.name);
    // const url = getR2PublicUrl(key);

    return NextResponse.json({
      url: "https://placeholder-r2-url.com/image.jpg",
      key: "placeholder-key",
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
