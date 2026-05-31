"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useRouter } from "next/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-36 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/60 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Brutally honest. Actually helpful.
        </motion.div>

        <AnimatedText
          text="Get your CV brutally roasted by AI"
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight"
        />

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="text-lg md:text-xl text-white/50 max-w-xl mb-10"
        >
          Honest feedback that actually helps you get hired. No fluff, no false praise — just the truth your CV needs.
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}>
          <ShimmerButton onClick={() => router.push("/upload")}>
            Roast My CV Free →
          </ShimmerButton>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
          className="mt-4 text-white/30 text-sm"
        >
          3 free roasts · No credit card required
        </motion.p>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-16"
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Paste or upload your CV", desc: "Paste your CV text or upload a PDF. Takes 30 seconds." },
              { step: "2", title: "AI analyses every line", desc: "Claude reads your CV like a senior recruiter and scores each section." },
              { step: "3", title: "Get brutal feedback + rewrites", desc: "Specific critiques and ready-to-use rewrites — not vague tips." },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xl flex items-center justify-center mb-5">
                  {step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-center mb-12"
          >
            Why RoastMyCV?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Honest not nice", desc: "We tell you what recruiters actually think, not what makes you feel good.", icon: "🔥" },
              { title: "Specific rewrites", desc: "Not vague tips. Exact bullet points you can drop straight into your CV.", icon: "✏️" },
              { title: "Free to start", desc: "Get your first 3 roasts free. No credit card required.", icon: "🎯" },
            ].map(({ title, desc, icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white/5 border border-white/10 hover:border-red-500/30 rounded-xl p-6 transition-colors"
              >
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t border-white/10 px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center bg-red-500/5 border border-red-500/20 rounded-2xl p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for the truth?</h2>
          <p className="text-white/50 mb-8">Your CV is costing you interviews. Find out why.</p>
          <ShimmerButton onClick={() => router.push("/upload")}>
            Roast My CV Free →
          </ShimmerButton>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-white/30 text-sm">
        <p>RoastMyCV — Honest feedback that gets you hired</p>
      </footer>
    </main>
  );
}
