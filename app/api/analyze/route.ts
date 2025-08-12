import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Fetch the image
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = await imageResponse.arrayBuffer()

    const result = await generateText({
      model: google("gemini-2.0-flash-exp"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this person's face and hairstyle. Provide 3-4 specific hairstyle recommendations that would suit their face shape, current hair texture, and features. Be specific about cuts, colors, and styling suggestions. Format your response as a JSON array with objects containing 'title' and 'description' fields.",
            },
            {
              type: "image",
              image: new Uint8Array(imageBuffer),
            },
          ],
        },
      ],
    })

    // Try to parse as JSON, fallback to plain text
    let recommendations
    try {
      recommendations = JSON.parse(result.text)
    } catch {
      // If not valid JSON, create a structured response
      recommendations = [
        {
          title: "AI Analysis Complete",
          description: result.text,
        },
      ]
    }

    return NextResponse.json({ recommendations })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
