import { NextResponse } from "next/server";
import { utapi } from "../core";

export async function POST(req: Request) {
  try {
    const { fileKey } = await req.json();

    if (!fileKey) {
      return NextResponse.json(
        { error: "File key is required" },
        { status: 400 },
      );
    }

    // Delete the file from UploadThing
    await utapi.deleteFiles([fileKey]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 },
    );
  }
}
