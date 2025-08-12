import Together from "together-ai"
import { type NextRequest, NextResponse } from "next/server"

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, prompt } = await request.json()

    if (!imageUrl || !prompt) {
      return NextResponse.json({ error: "Image URL and prompt are required" }, { status: 400 })
    }

    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-kontext-pro",
      width: 1024,
      height: 1024,
      prompt: prompt,
      image_url: imageUrl,
    })

    return NextResponse.json({
      generatedImageUrl: response.data[0].url,
    })
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 })
  }
}
