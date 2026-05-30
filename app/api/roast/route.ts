import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, cvText } = body;

  if (!email || !cvText) {
    return Response.json(
      { error: "Missing email or cvText" },
      { status: 400 }
    );
  }

  const mockResponse = {
    overall_score: 42,
    summary:
      "Your CV reads like it was written by someone who has never been to a job interview. The bullet points are vague, the formatting is inconsistent, and there is no clear narrative. Here is what needs to change.",
    sections: [
      {
        name: "Summary/Objective",
        score: 30,
        feedback:
          "Generic and forgettable. Every candidate says they are results-driven and passionate. This tells the recruiter nothing about you.",
        rewrite:
          "BCG consultant with 5+ years across marketplace operations and logistics technology. Cut costs by 23% at Daraz across 5 countries. Now targeting AI-native companies where operational rigour meets product thinking.",
      },
      {
        name: "Work Experience",
        score: 45,
        feedback:
          "Responsibilities listed, not achievements. Recruiters want to see impact numbers, not job descriptions.",
        rewrite:
          "Led cross-functional team of 8 to redesign partner onboarding — reduced time-to-first-delivery from 14 days to 3 days, increasing 30-day retention by 34%.",
      },
      {
        name: "Skills",
        score: 55,
        feedback:
          "Skills section is a keyword dump with no context. Anyone can write SQL. Show where you used it.",
        rewrite:
          "Remove the skills list. Weave skills into bullet points with context: Built cohort analysis in SQL to identify churn signals 45 days early.",
      },
      {
        name: "Education",
        score: 70,
        feedback:
          "Fine but buried. If you have a strong institution lead with it higher up.",
        rewrite:
          "Move education above work experience if graduating within 2 years, otherwise keep below but add relevant coursework or thesis.",
      },
      {
        name: "Formatting",
        score: 35,
        feedback:
          "Inconsistent spacing, mixed date formats, and wall-of-text bullet points. A recruiter spends 6 seconds on first scan — yours would fail it.",
        rewrite:
          "Use consistent date format (MMM YYYY). Max 3 bullet points per role. Each bullet: Action verb + context + metric. White space is your friend.",
      },
    ],
  };

  return Response.json(mockResponse);
}
