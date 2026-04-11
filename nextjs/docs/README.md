# Pronia Landing Page

Landing page teaser per **Pronia** — piattaforma AI per restituire tempo ai medici.

Progetto Next.js 15 (App Router) con animazioni Framer-style, deployabile su Vercel.

---

## Quick start

```bash
# Installa dipendenze
npm install

# Dev server (Turbopack)
npm run dev          # → http://localhost:3000

# Build di produzione
npm run build

# Avvia build locale
npm start
```

## Stack tecnologico

| Layer | Tecnologia | Versione |
|-------|-----------|----------|
| Framework | Next.js (App Router) | 15 |
| UI | React | 19 |
| Linguaggio | TypeScript | 5.7+ |
| Stile | Tailwind CSS (CSS-first) | 4 |
| Animazioni | Motion (ex Framer Motion) | 11 |
| Font | Geist Sans + Geist Mono | 1.3 |
| Utility UI | clsx, tailwind-merge, cva | — |
| Deploy | Vercel | — |

## Script npm

| Comando | Descrizione |
|---------|------------|
| `npm run dev` | Dev server con Turbopack su porta 3000 |
| `npm run build` | Build ottimizzata di produzione |
| `npm start` | Serve la build di produzione |
| `npm run lint` | Linting Next.js |

## Documentazione

| File | Contenuto |
|------|----------|
| [`docs/ARCHITECTURE.md`](./ARCHITECTURE.md) | Struttura progetto, rendering strategy, data flow |
| [`docs/COMPONENTS.md`](./COMPONENTS.md) | Catalogo completo dei componenti |
| [`docs/DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md) | Colori, tipografia, animazioni, CSS utilities |
| [`docs/DEPLOYMENT.md`](./DEPLOYMENT.md) | Guida deploy Vercel e configurazione |
