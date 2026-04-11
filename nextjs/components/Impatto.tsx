"use client";

import { useRef, useEffect } from "react";
import { useInView, useMotionValue, animate, motion } from "motion/react";

/* ── Animated counter ── */
function Counter({
  target,
  duration = 1.2,
}: {
  target: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, target, duration]);

  useEffect(() => {
    return count.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v).toString();
      }
    });
  }, [count]);

  return <span ref={ref}>0</span>;
}

/* ── Data ── */
const cards = [
  {
    prefix: "−",
    target: 2,
    suffix: "h",
    label: "ore di burocrazia risparmiate per medico al giorno",
  },
  {
    prefix: "+",
    target: 40,
    suffix: "%",
    label: "aumento stimato della capienza giornaliera",
  },
  {
    prefix: "",
    target: 3,
    suffix: "×",
    label: "più tempo qualitativo con ogni paziente",
  },
];

export default function Impatto() {
  return (
    <section className="relative py-24 px-6 bg-navy text-white overflow-hidden">
      {/* Dot grid decorative background */}
      <div className="dot-grid absolute inset-0 opacity-[0.06] pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[2px] uppercase text-blue-light mb-4">
            L&apos;impatto atteso
          </div>
          <div className="w-12 h-1 bg-blue rounded-sm mb-7" />
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight text-white mb-4">
            Numeri che parlano di tempo restituito.
          </h2>
          <p className="text-lg text-white/65 leading-relaxed max-w-[620px] mb-14">
            Stiamo progettando ogni funzionalità per avere un impatto misurabile
            sulla giornata del medico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-white/[0.06] rounded-2xl p-10 text-center border border-white/[0.08]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="font-mono text-[clamp(34px,4vw,52px)] font-bold text-[#93C5FD] leading-none mb-2.5">
                {card.prefix}
                <Counter target={card.target} />
                {card.suffix}
              </div>
              <p className="text-[15px] text-white/65 leading-snug">
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-xs text-white/35 text-center">
          Proiezioni basate su analisi del flusso di lavoro clinico. Dati in
          fase di validazione.
        </p>
      </div>
    </section>
  );
}
