"use client";

import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const line1 = ["Il", "tempo", "di", "un", "medico"];
const line2 = ["vale", "troppo", "per"];
const highlightWord = "sprecarlo.";

export default function Hero() {
  return (
    <section className="hero-mesh relative min-h-screen flex items-center justify-center text-center px-6 pt-[120px] pb-20 overflow-hidden">
      {/* Noise overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <div className="relative z-10 max-w-[780px]">
        {/* Tag */}
        <motion.div
          className="inline-block bg-white/[0.12] text-white/85 text-[13px] font-medium tracking-[1.5px] uppercase px-4 py-1.5 rounded-full mb-8 border border-white/15"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI · Healthtech · Italia
        </motion.div>

        {/* H1 — word-by-word stagger */}
        <motion.h1
          className="text-[clamp(36px,6vw,80px)] font-bold leading-[1.05] text-white mb-6"
          style={{ letterSpacing: "-2px", fontFeatureSettings: '"liga" 1, "pnum" 1' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {line1.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {line2.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              variants={wordVariant}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            variants={wordVariant}
            className="inline-block text-[#93C5FD]"
          >
            {highlightWord}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-[clamp(17px,2.5vw,20px)] text-white/70 leading-relaxed max-w-[580px] mx-auto mb-11"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Il sistema sanitario chiede ai medici sempre di più. Meno tempo per i
          pazienti, più burocrazia, agende impossibili. Esiste un modo diverso
          di lavorare.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#registrati"
          className="inline-flex items-center gap-3 bg-white text-navy px-8 py-4 rounded-xl font-semibold text-base no-underline shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] transition-shadow"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.9 }}
          whileHover="hover"
        >
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-[18px] h-[18px] order-first"
            variants={{ hover: { x: 4 } }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
          Scopri quando siamo pronti
        </motion.a>
      </div>
    </section>
  );
}
