import { NextRequest, NextResponse } from "next/server";
import * as pdfParseModule from "pdf-parse";
const pdfParse = (pdfParseModule as any).default ?? pdfParseModule;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parsed = await pdfParse(buffer);

    return NextResponse.json({ text: parsed.text });
  } catch (error) {
    console.error("PDF parse error:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
