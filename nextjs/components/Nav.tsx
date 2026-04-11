"use client";

import { useScroll, useTransform, motion } from "motion/react";
import Image from "next/image";

export default function Nav() {
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 40],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 40],
    ["blur(0px)", "blur(8px)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 40],
    ["rgba(229,231,235,0)", "rgba(229,231,235,1)"]
  );

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 px-6 md:px-10 py-4 flex items-center justify-between"
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        borderBottom: useTransform(
          borderColor,
          (c) => `1px solid ${c}`
        ),
      }}
    >
      <Image
        src="/pronia-primary-2026-02-10.png"
        alt="Pronia"
        width={120}
        height={32}
        className="h-8 w-auto"
        priority
      />
      <a
        href="#registrati"
        className="shimmer-btn bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-medium no-underline"
      >
        Resta informato
      </a>
    </motion.nav>
  );
}
