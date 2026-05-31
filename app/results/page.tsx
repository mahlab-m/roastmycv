"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NumberTicker } from "@/components/ui/number-ticker";

interface Section {
  name: string;
  score: number;
  feedback: string;
  rewrite: string;
}

interface RoastResult {
  overall_score: number;
  summary: string;
  sections: Section[];
}

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

export default function ResultsPage() {
  const [result, setResult] = useState<RoastResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("roast_result");
    if (raw) {
      setResult(JSON.parse(raw));
    }
  }, []);

  if (!result) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/40 mb-4">No roast data found.</p>
        <Link
          href="/upload"
          className="text-red-500 hover:text-red-400 font-medium transition-colors"
        >
          Go roast your CV →
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Overall score */}
        <div className="text-center mb-12">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">
            Overall Score
          </p>
          <div
            className={`text-8xl font-bold mb-6 ${scoreTextColor(result.overall_score)}`}
          >
            <NumberTicker value={result.overall_score} />
          </div>
          <p className="text-white/70 text-lg leading-relaxed">
            {result.summary}
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-8">
          {result.sections.map((section) => (
            <div
              key={section.name}
              className="border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-lg">{section.name}</h2>
                <span
                  className={`font-bold text-xl ${scoreTextColor(section.score)}`}
                >
                  {section.score}
                </span>
              </div>

              {/* Score bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full mb-4">
                <div
                  className={`h-full rounded-full ${scoreBarColor(section.score)}`}
                  style={{ width: `${section.score}%` }}
                />
              </div>

              {/* Feedback */}
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {section.feedback}
              </p>

              {/* Rewrite */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 text-xs uppercase tracking-wider font-medium mb-2">
                  Suggested rewrite
                </p>
                <p className="text-green-100 text-sm leading-relaxed">
                  {section.rewrite}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/upload"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-block"
          >
            Roast Another CV
          </Link>
        </div>
      </div>
    </main>
  );
}
