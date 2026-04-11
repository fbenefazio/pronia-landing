"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwajo_W1EXpV1lt_rufS4ZpMYNwT2WujnHpLS4zy9bfmdQZlS5Z0eBrwKiisCE_3eR8Gw/exec";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Inserisci un indirizzo email valido.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          timestamp: new Date().toISOString(),
          source: "landing_teaser",
        }),
      });
      setStatus("success");
      setMessage("✓ Registrazione avvenuta. Ti aggiorneremo presto.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Qualcosa è andato storto. Riprova tra poco.");
    }
  }

  return (
    <section id="registrati" className="py-24 px-6 bg-light text-center">
      <motion.div
        className="max-w-[560px] mx-auto bg-white rounded-[20px] p-14 shadow-[0_4px_24px_rgba(10,18,64,0.08)] border border-gray-200"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-[clamp(24px,3.5vw,36px)] font-bold tracking-tight mb-3">
          Stiamo costruendo qualcosa.
        </h2>
        <p className="text-base text-gray-muted leading-relaxed mb-8">
          Vuoi sapere quando siamo pronti? Lascia la tua email: ti aggiorneremo
          sui progressi, senza spam.
        </p>

        <div className="flex gap-2.5 flex-wrap">
          <motion.input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="la tua email professionale"
            className="input-glow flex-1 min-w-[200px] px-[18px] py-3.5 border-[1.5px] border-gray-200 rounded-[10px] text-[15px] text-navy outline-none transition-all duration-200"
            whileFocus={{ borderColor: "#2563EB" }}
          />
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className="bg-navy text-white px-7 py-3.5 border-none rounded-[10px] text-[15px] font-semibold cursor-pointer whitespace-nowrap transition-colors hover:bg-navy-light disabled:bg-gray-400 disabled:cursor-default"
          >
            {status === "loading" ? "Invio in corso..." : "Resta informato"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-sm min-h-[20px] ${
              status === "success"
                ? "text-emerald-600"
                : status === "error"
                ? "text-red-600"
                : "text-gray-muted"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-3.5">
          Nessuna profilazione. Nessuna cessione a terzi. Solo aggiornamenti su
          Pronia.
        </p>
      </motion.div>
    </section>
  );
}
