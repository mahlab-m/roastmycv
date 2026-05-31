"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useRouter } from "next/navigation";

// Fake CV — deliberately bad bullets showing all common mistakes
const BEFORE_CV = {
  name: "Alex Johnson",
  role: "Operations Manager",
  bullets: [
    {
      section: "Work Experience",
      bad: "Responsible for managing a team of 6 people and overseeing daily operations to ensure targets were met.",
      problem: "No verb, no mechanism, no result. Could describe literally any manager anywhere.",
    },
    {
      section: "Work Experience",
      bad: "Helped improve customer satisfaction scores by 75% through various initiatives.",
      problem: "'Helped' borrows someone else's credit. 75% with no base or mechanism is unbelievable.",
    },
    {
      section: "Work Experience",
      bad: "Performed data analysis on sales figures and presented findings to senior management.",
      problem: "Activity with no outcome. What changed because of this analysis?",
    },
    {
      section: "Work Experience",
      bad: "Was involved in the implementation of a new CRM system across the business.",
      problem: "'Was involved' — how? What did you actually do? What was the result?",
    },
  ],
};

const DEMO_RESULT = {
  overall_score: 34,
  summary:
    "This CV describes a job, not a career. Every bullet lists what Alex was responsible for — not what changed because Alex showed up. The mechanism is absent in every single bullet, and the one number present (75%) has no anchor that makes it believable. This CV is losing Alex interviews.",
  sections: [
    {
      name: "Summary/Objective",
      score: 25,
      feedback:
        "Missing entirely. No positioning statement means the recruiter has no anchor for reading the rest of the CV. They have to form their own opinion with no guidance — and that opinion will be generic.",
      bad_example: "(Not present)",
      good_example:
        "Operations manager with 4 years scaling logistics and customer operations at a Series B e-commerce startup. Reduced fulfilment costs by £180k in FY23 through network consolidation. Now targeting operations leadership roles at high-growth companies.",
      formula_breakdown: "Role + years + domain → specific achievement with absolute number → target",
    },
    {
      name: "Work Experience — Team Management",
      score: 20,
      feedback:
        "'Responsible for managing a team of 6 and overseeing daily operations' — this is a job description, not an achievement. Every operations manager manages a team. The HOW and RESULT are completely absent.",
      bad_example: "Responsible for managing a team of 6 people and overseeing daily operations to ensure targets were met.",
      good_example:
        "Managed a 6-person operations team across [2 sites / fulfilment + returns], introducing weekly performance scorecards that reduced SLA breaches from 18% to 6% over one quarter.",
      formula_breakdown: "Managed [6-person team] + [across 2 sites, introducing scorecards] + [SLA breaches 18% → 6%]",
    },
    {
      name: "Work Experience — Customer Satisfaction",
      score: 15,
      feedback:
        "'Helped improve customer satisfaction by 75%' — two problems. 'Helped' means you didn't own it. And 75% with no base metric or time frame reads as invented. A sharp interviewer will push on this and the answer will fall apart.",
      bad_example: "Helped improve customer satisfaction scores by 75% through various initiatives.",
      good_example:
        "Redesigned the post-purchase communication sequence — adding 3 automated touchpoints from order to delivery — lifting NPS from 32 to 51 over 6 months.",
      formula_breakdown: "Redesigned [post-purchase comms] + [3 automated touchpoints] + [NPS 32 → 51, 6 months]",
    },
    {
      name: "Work Experience — Data Analysis",
      score: 30,
      feedback:
        "'Performed data analysis and presented findings' — this is the process, not the outcome. What decision was made? What changed? What was the impact? Without the result this bullet adds zero signal.",
      bad_example: "Performed data analysis on sales figures and presented findings to senior management.",
      good_example:
        "Built a weekly sales velocity model in Excel tracking 8 product categories, identifying a £40k revenue gap in the [North region / Q3 season] that led to a targeted promotional campaign.",
      formula_breakdown: "Built [sales velocity model] + [tracking 8 categories] + [identified £40k gap → led to campaign]",
    },
    {
      name: "Work Experience — CRM Implementation",
      score: 25,
      feedback:
        "'Was involved in the implementation' is the weakest possible claim. It signals you were present, not that you contributed. Own the work or cut it.",
      bad_example: "Was involved in the implementation of a new CRM system across the business.",
      good_example:
        "Led requirements gathering and UAT for a Salesforce CRM rollout across 3 business units, coordinating 12 stakeholders and delivering on time against a 10-week timeline.",
      formula_breakdown: "Led [requirements + UAT] + [Salesforce, 3 units, 12 stakeholders] + [on time, 10-week timeline]",
    },
    {
      name: "Formatting",
      score: 50,
      feedback:
        "Structurally readable but the bullet length is inconsistent and two bullets exceed 2 lines — too long for first-pass scanning. A recruiter spends 6 seconds on first read. Dense text fails that scan.",
      bad_example: "Wall-of-text bullets, inconsistent length, no visual hierarchy.",
      good_example:
        "Max 2 lines per bullet. One idea per bullet. Verb at the start, number at the end. Consistent date format (MMM YYYY throughout).",
      formula_breakdown: "Visual rhythm: short verb → context → number. White space is signal.",
    },
  ],
};

function scoreTextColor(score: number) {
  if (score < 50) return "text-red-500";
  if (score <= 70) return "text-amber-400";
  return "text-green-400";
}

function scoreBarColor(score: number) {
  if (score < 50) return "bg-red-500";
  if (score <= 70) return "bg-amber-400";
  return "bg-green-400";
}

export default function DemoPage() {
  const router = useRouter();

  return (
    <main className="flex-1 px-6 py-16">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Live Demo</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">See a real roast</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Alex Johnson is a fictional operations manager. Their CV has all the most common mistakes.
            Here is exactly what our AI found — and how to fix each one.
          </p>
        </motion.div>

        {/* The CV being roasted */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="border-red-500/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-lg">{BEFORE_CV.name}</h2>
                  <p className="text-muted-foreground text-sm">{BEFORE_CV.role}</p>
                </div>
                <Badge variant="destructive">The CV being roasted</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {BEFORE_CV.bullets.map((b, i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{b.section}</p>
                  <p className="text-sm text-white/80 italic mb-2">"{b.bad}"</p>
                  <p className="text-xs text-red-400">⚠ {b.problem}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Overall score */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-3">Overall Score</p>
          <div className="text-8xl font-bold text-red-500 mb-3">{DEMO_RESULT.overall_score}</div>
          <Badge variant="destructive" className="mb-6 text-sm px-3 py-1">Needs major work</Badge>
          <Card className="max-w-xl mx-auto">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm leading-relaxed">{DEMO_RESULT.summary}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Section breakdown */}
        <div className="flex flex-col gap-6 mb-16">
          {DEMO_RESULT.sections.map((section, i) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-sm">{section.name}</h2>
                    <span className={`font-bold text-xl ${scoreTextColor(section.score)}`}>
                      {section.score}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${scoreBarColor(section.score)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${section.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{section.feedback}</p>

                  {/* Before */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 text-xs uppercase tracking-wider font-medium mb-2">❌ Original bullet</p>
                    <p className="text-white/70 text-sm italic leading-relaxed">"{section.bad_example}"</p>
                  </div>

                  {/* After */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-400 text-xs uppercase tracking-wider font-medium mb-2">✅ Rewritten bullet</p>
                    <p className="text-green-100 text-sm leading-relaxed">"{section.good_example}"</p>
                    <p className="text-green-400/60 text-xs mt-2 font-mono">{section.formula_breakdown}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-3 text-white">Now roast yours</h2>
          <p className="text-muted-foreground mb-8">Free for the first 3 CVs. No account needed.</p>
          <ShimmerButton onClick={() => router.push("/upload")}>
            Roast My CV Free →
          </ShimmerButton>
        </motion.div>
      </div>
    </main>
  );
}
