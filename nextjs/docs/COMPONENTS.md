# Catalogo componenti

Ogni componente è un file singolo in `components/`. L'ordine riflette la sequenza nella pagina.

---

## Nav

**File**: `components/Nav.tsx`  
**Tipo**: Client Component  
**Dipendenze Motion**: `useScroll`, `useTransform`, `motion`

### Comportamento
- **Posizione**: `fixed top-0`, z-index 50
- **Scroll-driven**: background trasparente → bianco (opacity 0.95), backdrop-blur 0→8px, border-bottom visibile — la transizione avviene nei primi 40px di scroll
- **Logo**: `next/image` da `/public/pronia-primary-2026-02-10.png`, altezza 32px
- **CTA**: link anchor a `#registrati` con classe `.shimmer-btn` (effetto shimmer su hover via pseudo-element CSS)
- **Mobile**: logo + bottone CTA, nessun hamburger menu

---

## Hero

**File**: `components/Hero.tsx`  
**Tipo**: Client Component  
**Dipendenze Motion**: `motion` (variants, animate, whileHover)

### Struttura
1. **Background**: classe `.hero-mesh` — 3 radial-gradient sovrapposti (#0A1240, #1e3a8a, #2563EB) con animazione CSS `mesh-move` (12s, ease-in-out, infinite)
2. **Noise overlay**: SVG inline con `feTurbulence` a opacity 0.04
3. **Tag**: "AI · Healthtech · Italia" — pill con bordo semitrasparente, fade-in
4. **H1**: testo diviso word-by-word, animazione stagger 0.08s per parola (fade + translateY 24px). "sprecarlo." evidenziato in `#93C5FD`
5. **Subtitle**: fade-in con delay 0.7s
6. **CTA button**: bianco su navy, icona freccia SVG che si sposta +4px a destra su hover (`whileHover` variant propagation)

### Tipografia H1
- `font-size`: `clamp(36px, 6vw, 80px)`
- `letter-spacing`: -2px
- `line-height`: 1.05
- `font-feature-settings`: ligature + numeri proporzionali

---

## StatsBar

**File**: `components/StatsBar.tsx`  
**Tipo**: Client Component  
**Dipendenze Motion**: `useInView`, `useMotionValue`, `animate`, `motion`

### Dati

| Stat | Label | Fonte |
|------|-------|-------|
| 52% | dei medici italiani soffre di burnout | Eurispes-Enpam, 2024 |
| +43gg | attesa media per una visita specialistica privata | Ministero della Salute, 2023 |
| 1 su 3 | medici valuta di ridurre l'attività o lasciare la professione | Eurispes-Enpam, 2024 |

### Counter animato
- Componente interno `Counter`: usa `useMotionValue(0)` + `animate(count, target, { duration: 1.2, ease: "easeOut" })`
- L'animazione parte quando l'elemento entra nel viewport (`useInView`, `once: true`)
- Il DOM è aggiornato direttamente via `count.on("change")` per massima performance
- Font: **Geist Mono** per i numeri (`font-mono`)
- La stat "1 su 3" è renderizzata come testo statico (campo `custom: true`)

---

## Problema

**File**: `components/Problema.tsx`  
**Tipo**: Client Component  
**Dipendenze Motion**: `motion`, `useMotionValue`, `useSpring`, `useTransform`

### Sezione
- **Tag**: "Il problema"
- **H2**: "I medici non mancano di competenza. Mancano di tempo."
- **Subtitle**: testo descrittivo sul sovraccarico dei medici

### Cards (3)

| Icona | Titolo | Tema |
|-------|--------|------|
| ⏱ | Agende al limite | Liste d'attesa e tempo per visita |
| 🧠 | Carico cognitivo invisibile | Raccolta informazioni ripetitiva |
| 🔥 | Burnout strutturale | Sovraccarico amministrativo |

### Animazioni
- **Entrata**: `whileInView` fade + translateY(30px), stagger 0.12s tra cards
- **Magnetic hover**: hook `useMagnetic()` — `useMotionValue` per posizione mouse normalizzata, `useSpring(useTransform(...))` per rotateX/rotateY ±4deg, perspective 800px. Il tilt ritorna a 0 su `mouseLeave` grazie allo spring

---

## Promessa

**File**: `components/Promessa.tsx`  
**Tipo**: Client Component  
**Dipendenze Motion**: `motion`, `useMotionValue`, `useSpring`, `useTransform`

### Sezione
- **Tag**: "Cosa cambia"
- **H2**: "Più visite. Meno frizione. Più tempo per ciò che conta."
- **Background**: `bg-sky` (#EFF6FF)

### Cards (3)

| Icona | Titolo | Tema |
|-------|--------|------|
| 📋 | Focus sulla clinica | Tempo dedicato al paziente |
| 📈 | Più pazienti, stessa giornata | Riduzione liste d'attesa |
| 🧘 | Benessere professionale | Sostenibilità nel lungo periodo |

### Animazioni
- Stagger + magnetic hover identici a Problema
- **Glassmorphism su hover**: `hover:border-white/40 hover:backdrop-blur-sm hover:shadow-[0_8px_24px...]`
- Card con icona centrata in box 60×60px con sfondo `bg-sky`

---

## Impatto

**File**: `components/Impatto.tsx`  
**Tipo**: Client Component  
**Dipendenze Motion**: `useInView`, `useMotionValue`, `animate`, `motion`

### Sezione
- **Background**: `bg-navy` + dot grid SVG decorativo a opacity 0.06
- **Tag**: "L'impatto atteso"
- **H2**: "Numeri che parlano di tempo restituito."
- **Nota disclaimer**: "Proiezioni basate su analisi del flusso di lavoro clinico. Dati in fase di validazione."

### Cards (3)

| Valore | Label |
|--------|-------|
| −2h | ore di burocrazia risparmiate per medico al giorno |
| +40% | aumento stimato della capienza giornaliera |
| 3× | più tempo qualitativo con ogni paziente |

### Counter animato
- Stesso pattern di `StatsBar`: componente `Counter` con `useMotionValue` + `animate`
- Font: **Geist Mono** per i numeri, colore `#93C5FD`
- Cards con sfondo `bg-white/[0.06]` e bordo `border-white/[0.08]`

---

## CtaSection

**File**: `components/CtaSection.tsx`  
**Tipo**: Client Component  
**Dipendenze Motion**: `motion`  
**Dipendenze React**: `useState`, `useRef`

### Form
- **Anchor ID**: `#registrati` (target del CTA nav e hero)
- **Endpoint**: Google Apps Script (POST no-cors)
- **Payload**: `{ email, timestamp (ISO), source: "landing_teaser" }`
- **Validazione**: regex email client-side
- **Stati**: `idle` → `loading` → `success` | `error`

### Animazione entrata
- `initial`: opacity 0, scale 0.96
- `whileInView`: opacity 1, scale 1
- Duration 0.5s, ease-out

### Messaggi
- **Successo**: "✓ Registrazione avvenuta. Ti aggiorneremo presto." (verde)
- **Errore validazione**: "Inserisci un indirizzo email valido." (rosso)
- **Errore rete**: "Qualcosa è andato storto. Riprova tra poco." (rosso)
- **Privacy**: "Nessuna profilazione. Nessuna cessione a terzi. Solo aggiornamenti su Pronia."

### Input
- Classe `.input-glow`: `box-shadow` blu su focus
- `whileFocus` Motion per animazione `borderColor`
- Supporta invio con Enter (`onKeyDown`)

---

## Footer

**File**: `components/Footer.tsx`  
**Tipo**: Server Component  
**Dipendenze**: nessuna

### Contenuto
- "**Pronia** — Restituiamo il tempo ai medici."
- "© 2025 Pronia. Tutti i diritti riservati."
- Background navy, testo bianco/45%
