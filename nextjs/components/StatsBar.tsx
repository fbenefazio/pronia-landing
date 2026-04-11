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

/* ── Stats data ── */
const stats = [
  {
    prefix: "",
    target: 52,
    suffix: "%",
    label: "dei medici italiani soffre di burnout",
    source: "Eurispes-Enpam, 2024",
  },
  {
    prefix: "+",
    target: 43,
    suffix: "gg",
    label: "attesa media per una visita specialistica privata",
    source: "Ministero della Salute, 2023",
  },
  {
    prefix: "",
    target: 0,
    suffix: "",
    label: "medici valuta di ridurre l'attività o lasciare la professione",
    source: "Eurispes-Enpam, 2024",
    custom: true,
  },
];

export default function StatsBar() {
  return (
    <div className="bg-sky border-b border-blue-light/30 px-6 py-10">
      <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="py-5 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div className="font-mono text-[clamp(30px,4vw,44px)] font-bold text-navy leading-none mb-2">
              {s.custom ? (
                <>
                  1 su <span className="text-blue">3</span>
                </>
              ) : (
                <>
                  {s.prefix}
                  <span className="text-blue">
                    <Counter target={s.target} />
                  </span>
                  {s.suffix}
                </>
              )}
            </div>
            <div className="text-sm text-gray-muted leading-snug">
              {s.label}
            </div>
            <div className="text-[11px] text-gray-400 mt-1">{s.source}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
