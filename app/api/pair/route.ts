// app/api/pair/route.ts
import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

type PairRequest = {
  primary: string;
  suggestions: string[];
  primaryCategory: string;
};

type PairResponse = {
  rationales: Record<string, string>;
  extraSuggestions: { family: string; rationale: string }[];
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI rationales not configured" },
      { status: 501 }
    );
  }

  const body: PairRequest = await request.json();
  const { primary, suggestions, primaryCategory } = body;

  if (!primary || !suggestions?.length) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const prompt = `You are a typography expert. A user selected "${primary}" (${primaryCategory}) as their primary font and the system suggested these pairings: ${suggestions.join(", ")}.

For each suggested font, write a 2-3 sentence rationale explaining WHY this pairing works typographically. Focus on contrast, proportion, readability, and mood.

Also suggest up to 2 additional fonts from Google Fonts that could pair well with "${primary}" that aren't in the list above.

Respond in JSON format:
{
  "rationales": { "Font Name": "rationale text", ... },
  "extraSuggestions": [{ "family": "Font Name", "rationale": "why it works" }]
}

Respond ONLY with valid JSON, no markdown.`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed: PairResponse = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI pair error:", error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}
