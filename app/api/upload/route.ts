import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Generate a unique filename
    const timestamp = Date.now()
    const uniqueFilename = `uploads/${timestamp}-${file.name}`

    // Upload directly to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
      contentType: file.type,
    })

    return NextResponse.json({
      url: blob.url,
      downloadUrl: blob.url,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
