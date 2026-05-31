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

function scoreLabel(score: number) {
  if (score < 30) return "Needs major work";
  if (score < 50) return "Below average";
  if (score < 70) return "Getting there";
  if (score < 85) return "Pretty good";
  return "Strong";
}

function AnimatedScoreBar({ score }: { score: number }) {
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${scoreBarColor(score)}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${score}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

export default function ResultsPage() {
  const [result, setResult] = useState<RoastResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("roast_result");
    if (raw) setResult(JSON.parse(raw));
  }, []);

  if (!result) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <p className="text-white/40 mb-4">No roast data found.</p>
        <Link href="/upload" className="text-red-500 hover:text-red-400 font-medium transition-colors">
          Go roast your CV →
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Overall score */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Overall Score</p>
          <div className={`text-9xl font-bold mb-3 ${scoreTextColor(result.overall_score)}`}>
            <NumberTicker value={result.overall_score} />
          </div>
          <p className={`text-sm font-medium mb-6 ${scoreTextColor(result.overall_score)}`}>
            {scoreLabel(result.overall_score)}
          </p>
          <div className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-white/70 text-sm leading-relaxed">{result.summary}</p>
          </div>
        </motion.div>

        {/* Section breakdown */}
        <div className="flex flex-col gap-6">
          {result.sections.map((section, i) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border border-white/10 hover:border-white/20 rounded-xl p-6 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">{section.name}</h2>
                <span className={`font-bold text-xl ${scoreTextColor(section.score)}`}>
                  {section.score}
                </span>
              </div>

              {/* Animated score bar */}
              <AnimatedScoreBar score={section.score} />

              {/* Feedback */}
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {section.feedback}
              </p>

              {/* Rewrite */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-400 text-xs uppercase tracking-wider font-medium mb-2">
                  ✏️ Suggested rewrite
                </p>
                <p className="text-green-100 text-sm leading-relaxed">{section.rewrite}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/upload"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors"
          >
            Roast Another CV
          </Link>
          <button
            onClick={() => {
              const text = `I got ${result.overall_score}/100 on RoastMyCV 🔥 Get your CV brutally roasted by AI → roastmycv-ashen.vercel.app`;
              navigator.clipboard.writeText(text);
              alert("Copied to clipboard! Share it 🔥");
            }}
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-lg text-center transition-colors"
          >
            Share my score 🔥
          </button>
        </motion.div>
      </div>
    </main>
  );
}
