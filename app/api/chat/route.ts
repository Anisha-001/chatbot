import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.GOOGLE_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: message }],
      response_format: { type: "json_object" }, // Google-specific
    });

    console.log(completion);
    
    return NextResponse.json(
      { response: JSON.stringify({ response: completion.choices[0].message.content }), },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
