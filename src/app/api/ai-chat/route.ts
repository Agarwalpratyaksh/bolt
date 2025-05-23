import { ai } from "@/configs/Ai";
import { NextRequest, NextResponse } from "next/server"; // Remove NextApiResponse import

export async function POST(req: NextRequest) { // Remove res from parameters
  const { prompt } = await req.json();
  console.log(prompt);

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are a AI Assistant and experience in React Development.
                                     GUIDELINES:
                                    - Tell user what your are building
                                    - response less than 15 lines.
                                    - Skip code examples and commentary`,
      },
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk.text));
        }
        controller.close();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8", // Or "text/event-stream" for SSE
      },
    });
  } catch (error) {
    console.error(error);
    // Return a proper error response
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}