"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

/* ── Magnetic hover hook ── */
function useMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return { rotateX, rotateY, handleMouse, handleLeave };
}

/* ── Data ── */
const cards = [
  {
    icon: "⏱",
    title: "Agende al limite",
    text: "Le liste di attesa crescono non solo per mancanza di medici, ma perché ogni visita richiede più tempo del necessario. Un circolo che si autoalimenta.",
  },
  {
    icon: "🧠",
    title: "Carico cognitivo invisibile",
    text: "Raccogliere, ricordare, riordinare informazioni a ogni visita consuma energie preziose che dovrebbero andare alla diagnosi e alla relazione con il paziente.",
  },
  {
    icon: "🔥",
    title: "Burnout strutturale",
    text: "Non è una questione di carattere. È il risultato di anni di sovraccarico amministrativo su professionisti che hanno scelto la medicina per curare, non per scrivere.",
  },
];

/* ── Card component ── */
function ProblemaCard({
  card,
  index,
}: {
  card: (typeof cards)[number];
  index: number;
}) {
  const { rotateX, rotateY, handleMouse, handleLeave } = useMagnetic();

  return (
    <motion.div
      className="bg-light rounded-2xl p-8 border-l-4 border-blue"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div className="text-[28px] mb-4">{card.icon}</div>
      <h3 className="text-lg font-semibold mb-2.5">{card.title}</h3>
      <p className="text-[15px] text-gray-muted leading-relaxed">{card.text}</p>
    </motion.div>
  );
}

/* ── Section ── */
export default function Problema() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[2px] uppercase text-blue mb-4">
            Il problema
          </div>
          <div className="w-12 h-1 bg-blue rounded-sm mb-7" />
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight mb-4">
            I medici non mancano di competenza.
            <br />
            Mancano di tempo.
          </h2>
          <p className="text-lg text-gray-muted leading-relaxed max-w-[620px] mb-14">
            Ogni giornata è compressa tra adempimenti, raccolta di informazioni
            ripetitive e processi che non aggiungono valore clinico. Il
            risultato: meno pazienti, più stress, cure meno efficaci.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <ProblemaCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
