"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const stats = [
  { value: "1,200+", label: "CVs roasted" },
  { value: "4.8★", label: "Average rating" },
  { value: "3 min", label: "Time to results" },
];

const testimonials = [
  {
    quote: "I've had 3 interviews in a week since updating my CV with the rewrites. The feedback was brutal but exactly right.",
    name: "Aisha K.",
    role: "Product Manager, Dubai",
  },
  {
    quote: "My old CV scored 38. After applying the fixes it jumped to 74. Got a call from BCG the following week.",
    name: "James T.",
    role: "Strategy Analyst, London",
  },
  {
    quote: "No fluff, no 'great job'. Just the truth. Exactly what I needed before applying to Google.",
    name: "Sara M.",
    role: "Operations Lead, Amsterdam",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-40 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-500/8 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Free to start · No credit card
        </motion.div>

        <AnimatedText
          text="Your CV is costing you interviews."
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 max-w-4xl leading-tight"
        />

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="text-xl md:text-2xl text-red-400 font-semibold mb-6"
        >
          Find out why.
        </motion.p>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={5}
          className="text-lg text-muted-foreground max-w-lg mb-10"
        >
          AI that reads your CV like a BCG consultant and tells you exactly what's wrong — with rewrites you can use immediately.
        </motion.p>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="flex flex-col items-center gap-3">
          <ShimmerButton onClick={() => router.push("/upload")}>
            Roast My CV Free →
          </ShimmerButton>
          <p className="text-muted-foreground/60 text-sm">3 free roasts · takes 2 minutes</p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="border-y border-border">
        <div className="max-w-3xl mx-auto px-6 py-8 grid grid-cols-3 gap-4">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
              <p className="text-muted-foreground text-sm mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground">Brutally honest feedback in under 3 minutes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Paste or upload your CV", desc: "Paste your CV text or upload a PDF. No account needed to start.", icon: "📋" },
              { step: "02", title: "AI analyses every bullet", desc: "Claude reads your CV against the same framework used at BCG and top startups.", icon: "🧠" },
              { step: "03", title: "Get brutal feedback + rewrites", desc: "Specific critiques and ready-to-use rewrites — not vague tips like 'be more specific'.", icon: "🔥" },
            ].map(({ step, title, desc, icon }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card border border-border rounded-2xl p-6 relative"
              >
                <span className="text-red-500/30 font-bold text-5xl absolute top-4 right-5 select-none">{step}</span>
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="border-t border-border bg-card/30 px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What you get</h2>
            <p className="text-muted-foreground">Not another generic checklist.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Section scores", desc: "Every section of your CV scored 0–100. See exactly where you're losing recruiters.", icon: "📊" },
              { title: "Specific rewrites", desc: "Not 'improve your bullets'. Exact replacement text you can copy straight in.", icon: "✏️" },
              { title: "Honest verdict", desc: "The truth about whether your CV is hurting or helping your applications.", icon: "💬" },
            ].map(({ title, desc, icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What people are saying</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
              >
                <p className="text-red-400 text-xl">"</p>
                <p className="text-sm text-foreground/80 leading-relaxed flex-1">{quote}</p>
                <div>
                  <p className="font-semibold text-sm">{name}</p>
                  <p className="text-muted-foreground text-xs">{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for the truth?</h2>
          <p className="text-muted-foreground mb-8 text-lg">Your CV is costing you interviews. Find out why — free.</p>
          <ShimmerButton onClick={() => router.push("/upload")}>
            Roast My CV Free →
          </ShimmerButton>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-muted-foreground text-sm">
        <p>RoastMyCV — Honest feedback that gets you hired</p>
      </footer>
    </main>
  );
}
