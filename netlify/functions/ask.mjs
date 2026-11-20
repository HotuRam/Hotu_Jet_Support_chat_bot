/**
 * Jet Funded AI Customer Support Center
 * Copyright (c) 2026 Hotu Ram (https://github.com/HotuRam)
 * All Rights Reserved.
 */

import { KNOWLEDGE_BASE } from "./knowledge.mjs";

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured in Netlify Environment Variables." },
      { status: 500 }
    );
  }

  try {
    const { question } = await req.json();
    if (!question || !question.trim()) {
      return Response.json({ error: "Please enter a question." }, { status: 400 });
    }

    const systemPrompt = `You are an independent AI Customer Support Prototype built by Hotu Ram (https://github.com/HotuRam) to demonstrate trader support automation using Jet Funded's (MB Investments, Dubai, UAE) published pre-launch rulebook.
- NEVER claim to be the official Jet Funded support system or operated/built by MB Investments or Jet Funded staff.
- If asked who made you, who built you, or if you are official, clearly state that you are an independent portfolio prototype built by Hotu Ram using Jet Funded's publicly available pre-launch terms.
- Answer trader rule questions STRICTLY using the official Knowledge Base below.
- If a user asks a combined or tricky scenario (e.g., two trades totaling >2% risk, or drawdown math), reason through the rules accurately and show the exact numbers.
- If something is genuinely not covered in the Knowledge Base, do NOT invent a rule—clearly state it is not specified in the pre-launch terms and direct them to submit a ticket to support@jetfunded.io (or partners@jetfunded.io for affiliates).
- Always return valid JSON with exactly three string fields:
  1. "category": Short topic label (e.g., "Drawdown Rules", "3 Lives Pass", "Funded Risk", "Payouts & KYC", "Affiliates", "Refunds", "Prototype Info")
  2. "short": A crisp 1-2 sentence TL;DR answer.
  3. "long": A clear, thorough policy explanation (use short bullet points with "• " and line breaks where helpful).

OFFICIAL KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`;

    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: question.trim() }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              category: { type: "STRING" },
              short: { type: "STRING" },
              long: { type: "STRING" },
            },
            required: ["category", "short", "long"],
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data?.error?.message || "Gemini API request failed." },
        { status: 502 }
      );
    }

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(rawText);

    return Response.json({
      category: parsed.category || "Support Answer",
      short: parsed.short || "Please contact support@jetfunded.io for assistance.",
      long: parsed.long || "",
    });
  } catch (err) {
    return Response.json(
      { error: "Unable to process your request right now. Please try again or submit a ticket." },
      { status: 500 }
    );
  }
};

export const config = {
  path: "/api/ask",
};
