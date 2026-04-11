"use client";

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
    icon: "📋",
    title: "Focus sulla clinica",
    text: "Ogni minuto della visita dedicato a ciò che conta davvero: il paziente davanti al medico, non la gestione delle informazioni.",
  },
  {
    icon: "📈",
    title: "Più pazienti, stessa giornata",
    text: "Visite più brevi e più efficaci si traducono in spazio per vedere più persone — riducendo le liste di attesa senza aumentare il carico sul medico.",
  },
  {
    icon: "🧘",
    title: "Benessere professionale",
    text: "Ridurre il carico operativo non è un lusso. È una condizione necessaria per esercitare bene la medicina nel lungo periodo.",
  },
];

/* ── Card component ── */
function PromessaCard({
  card,
  index,
}: {
  card: (typeof cards)[number];
  index: number;
}) {
  const { rotateX, rotateY, handleMouse, handleLeave } = useMagnetic();

  return (
    <motion.div
      className="bg-white rounded-2xl p-9 text-center shadow-[0_2px_12px_rgba(10,18,64,0.07)] transition-[backdrop-filter,border-color] duration-300 border border-transparent hover:border-white/40 hover:backdrop-blur-sm hover:shadow-[0_8px_24px_rgba(10,18,64,0.12)]"
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
      <div className="w-[60px] h-[60px] rounded-2xl bg-sky flex items-center justify-center mx-auto mb-5 text-[26px]">
        {card.icon}
      </div>
      <h3 className="text-xl font-bold mb-2.5">{card.title}</h3>
      <p className="text-sm text-gray-muted leading-relaxed">{card.text}</p>
    </motion.div>
  );
}

/* ── Section ── */
export default function Promessa() {
  return (
    <section className="py-24 px-6 bg-sky">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xs font-semibold tracking-[2px] uppercase text-blue mb-4">
            Cosa cambia
          </div>
          <div className="w-12 h-1 bg-blue rounded-sm mb-7" />
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight mb-4">
            Più visite. Meno frizione.
            <br />
            Più tempo per ciò che conta.
          </h2>
          <p className="text-lg text-gray-muted leading-relaxed max-w-[620px] mb-14">
            Stiamo costruendo uno strumento che restituisce tempo ai medici —
            senza stravolgere il modo in cui lavorano, senza complessità
            inutile.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {cards.map((card, i) => (
            <PromessaCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
