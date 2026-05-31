"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

type InputMode = "paste" | "upload";

const loadingMessages = [
  "Reading your CV...",
  "Judging every word...",
  "Comparing to top candidates...",
  "Preparing brutal feedback...",
  "Almost done...",
];

export default function UploadPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [cvText, setCvText] = useState("");
  const [fileName, setFileName] = useState("");
  const [inputMode, setInputMode] = useState<InputMode>("paste");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [roastsUsed, setRoastsUsed] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEmail(val);
    if (val.includes("@")) setRoastsUsed(getUsageCount(val));
  }

  async function processFile(file: File) {
    setFileName(file.name);
    setError("");
    if (file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/parse-pdf", { method: "POST", body: formData });
        const data = await res.json();
        if (data.text) setCvText(data.text);
        else setError("Could not extract text from PDF. Try pasting instead.");
      } catch {
        setError("Failed to read PDF. Try pasting instead.");
      }
    } else {
      const text = await file.text();
      setCvText(text);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  }

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !cvText.trim()) return;

    const count = getUsageCount(email);
    if (count >= FREE_LIMIT) { setShowModal(true); return; }

    setLoading(true);
    setError("");

    const interval = setInterval(() => {
      setLoadingMsg(prev => (prev + 1) % loadingMessages.length);
    }, 1800);

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
      clearInterval(interval);
      setLoading(false);
    }
  }

  const roastsRemaining = Math.max(0, FREE_LIMIT - roastsUsed);

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-3xl font-bold mb-2 text-white">Roast my CV</h1>
          <p className="text-white/70 mb-8">Honest feedback that actually helps you get hired.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex justify-between items-baseline mb-2">
              <label htmlFor="email" className="text-sm font-medium">Email address</label>
              {email.includes("@") && (
                <span className={`text-xs ${roastsRemaining === 0 ? "text-red-400" : "text-muted-foreground"}`}>
                  {roastsRemaining} free roast{roastsRemaining !== 1 ? "s" : ""} remaining
                </span>
              )}
            </div>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className="focus-visible:ring-red-500"
            />
          </motion.div>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex gap-2 bg-muted rounded-lg p-1"
          >
            {(["paste", "upload"] as InputMode[]).map(mode => (
              <button
                key={mode}
                type="button"
                onClick={() => setInputMode(mode)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  inputMode === mode
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === "paste" ? "Paste text" : "Upload PDF"}
              </button>
            ))}
          </motion.div>

          {/* Input area */}
          <AnimatePresence mode="wait">
            {inputMode === "paste" && (
              <motion.div key="paste" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <label htmlFor="cv" className="block text-sm font-medium mb-2">Paste your CV</label>
                <Textarea
                  id="cv"
                  required
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Paste the full text of your CV here..."
                  rows={16}
                  className="font-mono text-sm resize-none focus-visible:ring-red-500"
                />
              </motion.div>
            )}

            {inputMode === "upload" && (
              <motion.div key="upload" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <label className="block text-sm font-medium mb-2">Upload your CV (PDF)</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`w-full border-2 border-dashed rounded-lg px-4 py-16 text-center cursor-pointer transition-all ${
                    isDragging ? "border-red-500 bg-red-500/5" : "border-border hover:border-red-500/50 hover:bg-muted/50"
                  }`}
                >
                  {fileName ? (
                    <div>
                      <p className="text-2xl mb-2">📄</p>
                      <p className="font-medium">{fileName}</p>
                      {cvText && <p className="text-green-400 text-sm mt-1">✓ Text extracted successfully</p>}
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl mb-3">{isDragging ? "📂" : "📄"}</p>
                      <p className="text-muted-foreground mb-1">{isDragging ? "Drop it!" : "Drag & drop your PDF here"}</p>
                      <p className="text-muted-foreground/50 text-sm">or click to browse</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.txt" onChange={handleFileChange} className="hidden" />
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Button
              type="submit"
              disabled={loading || !cvText.trim()}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-white/10 disabled:text-white/40 text-white font-semibold py-6 text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {loadingMessages[loadingMsg]}
                </span>
              ) : "Roast It 🔥"}
            </Button>
          </motion.div>
        </form>
      </div>

      {/* Freemium modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center">
              <p className="text-4xl mb-4">🔥</p>
              <h2 className="text-2xl font-bold mb-3">Free limit reached</h2>
              <p className="text-muted-foreground mb-6">You have used your 3 free roasts. Upgrade for $5/month for unlimited roasts.</p>
              <div className="flex flex-col gap-3">
                <Button disabled className="bg-red-500/40 cursor-not-allowed text-white w-full py-6">
                  Upgrade — $5/month (coming soon)
                </Button>
                <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
