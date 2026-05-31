import type { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are a senior CV reviewer. Your standard is a BCG consultant who also has hands-on operator experience at a YC-backed startup.

You review CVs against one universal framework. It applies to every candidate regardless of seniority.

## The bullet formula — every bullet must have all four:

1. VERB — strong, specific action verb that owns the work
   (Built, Redesigned, Led, Owned, Developed — not "Responsible for", "Supported", "Helped", "Assisted")

2. WHAT — what exactly was built, designed, or delivered
   (name the thing — "a vendor performance scorecard", "a regional business planning model")

3. HOW — the mechanism, approach, or collaboration
   ("through network and capacity optimization", "in collaboration with finance and commercial teams", "by restructuring the pricing model across 5 SKUs")
   This is the most commonly missing part.

4. RESULT — quantified outcome, modest and believable
   - Prefer absolute figures over percentages (47 days, 7→3 days, $12B, 50+ partners)
   - Small credible percentages beat big round ones (~3%, 6%, 57% with an absolute anchor)
   - If no number exists, state the qualitative outcome clearly
   - Never invent or inflate — use [brackets] for missing figures the candidate must supply

## What to check for every bullet:
- Missing mechanism (HOW) — most common gap
- Vague verbs — "managed", "responsible for", "supported"
- Inflated numbers — 75%, 250%, "up to X%" with no anchor
- Activity without outcome — what changed because of this work?
- Speculative results presented as achieved — flag these

## Scoring
- 0-30: Actively hurting their chances
- 31-50: Below average, needs significant work
- 51-70: Decent but forgettable — some formula gaps
- 71-85: Strong — minor gaps only
- 86-100: Exceptional — leave it alone

## Output — return ONLY valid JSON, no markdown, no explanation:
{
  "overall_score": <0-100 integer>,
  "summary": "<2-3 sentences: honest verdict, what type of problem this is, what matters most to fix>",
  "sections": [
    {
      "name": "<section name>",
      "score": <0-100 integer>,
      "feedback": "<specific critique referencing their actual text — name the exact gap in the formula>",
      "rewrite": "<exact rewrite applying the formula — use [brackets] for numbers they must fill in>"
    }
  ]
}

## Rules
- Always reference actual text from their CV in your feedback
- Always provide a rewrite, not just criticism
- Never soften feedback to protect feelings
- Use [brackets] for any number the candidate must verify or fill in
- Believable modest numbers beat inflated big numbers every time`;

const MOCK_RESPONSE = {
  overall_score: 42,
  summary:
    "This CV describes activities, not achievements. Most bullets tell the reader what you did — not what changed because you did it. The mechanism (how) is almost always missing, and where numbers exist they are either absent or too vague to be credible. Fix the formula, fix the CV.",
  sections: [
    {
      name: "Summary/Objective",
      score: 30,
      feedback:
        "Generic and forgettable. Phrases like 'results-driven' and 'passionate professional' appear on 90% of CVs. This tells the recruiter nothing specific about you — your domain, your scale, or what you are actually good at.",
      rewrite:
        "Strategy and operations professional with [X] years across [your sectors]. [One specific achievement with a number]. Now targeting [type of role] where [your specific edge] drives [the outcome they care about].",
    },
    {
      name: "Work Experience",
      score: 40,
      feedback:
        "Bullets describe job responsibilities, not outcomes. 'Managed X' and 'Responsible for Y' appear repeatedly — these are job description words, not achievement words. The HOW is almost entirely absent. A recruiter reading this cannot tell what you actually built or what changed because of your work.",
      rewrite:
        "Pick your strongest bullet and apply the formula: [Strong verb] + [what you built] + [through/by/in collaboration with — the mechanism] + [quantified result with an absolute anchor, e.g. from X to Y or X days/$ saved].",
    },
    {
      name: "Skills",
      score: 55,
      feedback:
        "A list of tools with no context. Anyone can write SQL or Excel — the question is what you built with it and at what scale. A keyword dump here adds no signal.",
      rewrite:
        "Remove the standalone skills section. Weave tools into experience bullets with context: 'Built a [what] in SQL/Tableau/Excel to [outcome].' If you must keep a skills line, add scale: 'SQL — used to build [X] dashboards tracking [Y metric] across [Z teams].'",
    },
    {
      name: "Education",
      score: 65,
      feedback:
        "Fine but passive. Education section is clean but adds no differentiation beyond the degree name.",
      rewrite:
        "If within 2 years of graduating, move above experience. Otherwise keep below but add one line of distinction: a thesis, relevant coursework, or academic achievement that reinforces your professional angle.",
    },
    {
      name: "Formatting",
      score: 35,
      feedback:
        "Inconsistent date formats, uneven spacing, and wall-of-text bullets. A recruiter spends 6 seconds on first scan — dense formatting fails that scan before a word is read.",
      rewrite:
        "One date format throughout (MMM YYYY). Max 3-4 bullets per role. Each bullet on one line where possible. Consistent left margin. White space between sections. The eye should flow without effort.",
    },
  ],
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, cvText } = body;

  if (!email || !cvText) {
    return Response.json({ error: "Missing email or cvText" }, { status: 400 });
  }

  // If no API key, return improved mock
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(MOCK_RESPONSE);
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Please review this CV and return your assessment as JSON:\n\n${cvText}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");

    // Strip any markdown code fences if present
    const cleaned = content.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const result = JSON.parse(cleaned);

    return Response.json(result);
  } catch (error) {
    console.error("Anthropic API error:", error);
    // Fall back to mock on error
    return Response.json(MOCK_RESPONSE);
  }
}
