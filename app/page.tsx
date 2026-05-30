import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
          Get your CV <span className="text-red-500">brutally roasted</span> by AI
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-xl mb-10">
          Honest feedback that actually helps you get hired
        </p>
        <Link
          href="/upload"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          Roast My CV Free
        </Link>
      </section>

      {/* How it works */}
      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Paste your CV",
                desc: "Copy and paste your CV text into our editor — no file uploads needed.",
              },
              {
                step: "2",
                title: "AI analyses it",
                desc: "Our AI reads every line and scores each section for impact and clarity.",
              },
              {
                step: "3",
                title: "Get brutal feedback + rewrites",
                desc: "Receive honest, specific critiques and ready-to-use rewrite suggestions.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-500 text-white font-bold text-xl flex items-center justify-center mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-white/10 px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why RoastMyCV?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Honest not nice",
                desc: "We tell you what recruiters actually think, not what makes you feel good.",
              },
              {
                title: "Specific rewrites",
                desc: "Not vague tips. Exact bullet points you can drop straight into your CV.",
              },
              {
                title: "Free to start",
                desc: "Get your first 3 roasts free. No credit card required.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="font-semibold text-red-400 mb-2">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-white/40 text-sm">
        <p>RoastMyCV — Honest feedback that gets you hired</p>
      </footer>
    </main>
  );
}
