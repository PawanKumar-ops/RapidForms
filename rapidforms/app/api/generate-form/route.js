import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { purpose } = await req.json();

    if (!purpose) {
      return NextResponse.json(
        { error: "Purpose is required" },
        { status: 400 }
      );
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `
You generate ONLY valid JSON.
No explanation. No markdown.

Create a Google Form structure for:
"${purpose}"

Return EXACT JSON:
{
  "title": "",
  "description": "",
  "questions": [
    {
      "type": "short_text | long_text | mcq | checkbox",
      "label": "",
      "required": true,
      "options": []
    }
  ]
}
`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.4
          }
        })
      }
    );

    const data = await geminiRes.json();
    console.log("GEMINI RAW RESPONSE:", data);

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 500 }
      );
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: "No content returned from Gemini", raw: data },
        { status: 500 }
      );
    }

    let formJSON;
    try {
      formJSON = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Gemini returned invalid JSON", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      form: formJSON,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);
    return NextResponse.json(
      { error: "Gemini generation failed" },
      { status: 500 }
    );
  }
}
