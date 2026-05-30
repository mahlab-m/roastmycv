"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const USAGE_KEY = "roastmycv_usage";
const FREE_LIMIT = 3;

function getUsageCount(email: string): number {
  const raw = localStorage.getItem(USAGE_KEY);
  if (!raw) return 0;
  const usage: Record<string, number> = JSON.parse(raw);
  return usage[email] ?? 0;
}

function incrementUsage(email: string) {
  const raw = localStorage.getItem(USAGE_KEY);
  const usage: Record<string, number> = raw ? JSON.parse(raw) : {};
  usage[email] = (usage[email] ?? 0) + 1;
  localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
}

export default function UploadPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [cvText, setCvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [roastsUsed, setRoastsUsed] = useState(0);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEmail(val);
    if (val.includes("@")) {
      setRoastsUsed(getUsageCount(val));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !cvText.trim()) return;

    const count = getUsageCount(email);
    if (count >= FREE_LIMIT) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, cvText }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      sessionStorage.setItem("roast_result", JSON.stringify(data));
      incrementUsage(email);
      router.push("/results");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const roastsRemaining = Math.max(0, FREE_LIMIT - roastsUsed);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">Upload your CV</h1>
        <p className="text-white/60 mb-8">
          We&apos;ll give it the honest review it deserves.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email address
              </label>
              {email.includes("@") && (
                <span
                  className={`text-xs ${roastsRemaining === 0 ? "text-red-400" : "text-white/40"}`}
                >
                  {roastsRemaining} free roast{roastsRemaining !== 1 ? "s" : ""}{" "}
                  remaining
                </span>
              )}
            </div>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="cv" className="block text-sm font-medium mb-2">
              Paste your CV
            </label>
            <textarea
              id="cv"
              required
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              placeholder="Paste the full text of your CV here..."
              rows={16}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors resize-none font-mono text-sm"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            {loading ? "Analysing..." : "Roast It"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
          <div className="bg-[#111] border border-white/10 rounded-xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-3">Free limit reached</h2>
            <p className="text-white/60 mb-6">
              You have used your 3 free roasts. Upgrade for $5/month for
              unlimited roasts.
            </p>
            <div className="flex flex-col gap-3">
              <button
                disabled
                className="bg-red-500/40 cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg"
              >
                Roast It (Limit reached)
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/40 hover:text-white text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
