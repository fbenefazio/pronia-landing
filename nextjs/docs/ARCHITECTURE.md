# Architettura

## Struttura del progetto

```
nextjs/
├── app/
│   ├── layout.tsx          # Root layout — font Geist, metadata, viewport
│   ├── page.tsx            # Pagina unica — assembla le 8 sezioni
│   └── globals.css         # Tailwind v4 @theme, reset, keyframe, utility CSS
├── components/
│   ├── Nav.tsx             # Navbar fixed, scroll-driven blur
│   ├── Hero.tsx            # Hero full-screen con mesh gradient
│   ├── StatsBar.tsx        # Barra statistiche con counter animato
│   ├── Problema.tsx        # Sezione "Il problema" — 3 cards
│   ├── Promessa.tsx        # Sezione "Cosa cambia" — 3 cards
│   ├── Impatto.tsx         # Sezione "L'impatto atteso" — 3 cards navy
│   ├── CtaSection.tsx      # Form raccolta email
│   └── Footer.tsx          # Footer minimale
├── lib/
│   └── utils.ts            # Funzione cn() (clsx + tailwind-merge)
├── public/
│   └── pronia-primary-2026-02-10.png   # Logo Pronia
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs      # Plugin @tailwindcss/postcss
└── vercel.json
```

## Rendering strategy

| File | Tipo | Motivo |
|------|------|--------|
| `layout.tsx` | **Server Component** | Solo font e metadata, nessuna interattività |
| `page.tsx` | **Server Component** | Puro assemblaggio, importa i figli |
| `Footer.tsx` | **Server Component** | HTML statico, nessun hook |
| `Nav.tsx` | **Client Component** | `useScroll`, `useTransform` (Motion) |
| `Hero.tsx` | **Client Component** | Animazioni Motion (`variants`, `animate`) |
| `StatsBar.tsx` | **Client Component** | `useInView`, `useMotionValue`, `animate` |
| `Problema.tsx` | **Client Component** | `useMotionValue`, `useSpring` (magnetic hover) |
| `Promessa.tsx` | **Client Component** | `useMotionValue`, `useSpring` (magnetic hover) |
| `Impatto.tsx` | **Client Component** | `useInView`, `animate` (counter) |
| `CtaSection.tsx` | **Client Component** | `useState`, `fetch`, Motion |

**Principio**: `"use client"` solo dove strettamente necessario. `Footer` e i file `app/` restano Server Components.

## Data flow

La pagina è **completamente statica** (nessuna API route, nessun server-side fetching).

- Tutti i dati (copy, statistiche, contenuto cards) sono **hardcoded** nei componenti.
- L'unica chiamata di rete è il `POST no-cors` verso Google Apps Script nel `CtaSection`.

```
page.tsx (Server)
  └── Nav.tsx (Client)          ← useScroll
  └── Hero.tsx (Client)         ← Motion variants
  └── StatsBar.tsx (Client)     ← animate counter
  └── Problema.tsx (Client)     ← magnetic hover
  └── Promessa.tsx (Client)     ← magnetic hover + glassmorphism
  └── Impatto.tsx (Client)      ← animate counter
  └── CtaSection.tsx (Client)   ← form state + fetch
  └── Footer.tsx (Server)       ← HTML statico
```

## Tailwind CSS v4

Il progetto usa la configurazione **CSS-first** di Tailwind v4:

- **Nessun `tailwind.config.js`** — il tema è definito in `globals.css` con `@theme { ... }`
- **PostCSS plugin**: `@tailwindcss/postcss` in `postcss.config.mjs`
- **Import**: `@import "tailwindcss"` in cima a `globals.css`
- I custom token (`--color-navy`, `--color-blue`, ecc.) generano automaticamente utility class (`bg-navy`, `text-blue`, ecc.)

## Dipendenze chiave

| Pacchetto | Ruolo |
|-----------|-------|
| `motion` | Animazioni React (rebranding di Framer Motion). Import da `motion/react` |
| `geist` | Font Geist Sans e Mono, compatibili con `next/font` |
| `clsx` + `tailwind-merge` | Utility `cn()` per merge condizionale di classi Tailwind |
| `class-variance-authority` | Pattern per varianti componenti (predisposto per shadcn/ui) |
| `@radix-ui/react-slot` | Composizione componenti (predisposto per shadcn/ui) |
