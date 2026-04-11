# Design System

## Palette colori

Definiti sia come token Tailwind v4 (`@theme`) sia come CSS custom properties (`:root`).

| Token | Hex | Uso principale |
|-------|-----|----------------|
| `--color-navy` / `--navy` | `#0A1240` | Testo primario, sfondo hero/footer/impatto, bottoni |
| `--color-navy-light` / `--navy-light` | `#1a2460` | Hover bottoni navy |
| `--color-blue` / `--blue` | `#2563EB` | Accent, divider, tag sezione, focus input |
| `--color-blue-light` / `--blue-light` | `#3B82F6` | Accent secondario, bordi |
| `--color-sky` / `--sky` | `#EFF6FF` | Background sezioni chiare (StatsBar, Promessa) |
| `--color-gray-muted` / `--gray` | `#6B7280` | Testo secondario, label |
| `--color-light` | `#F9FAFB` | Background card Problema, sezione CTA |
| — | `#93C5FD` | Highlight hero ("sprecarlo."), numeri Impatto |

### Classi Tailwind generate

Grazie alla sintassi `@theme`, Tailwind v4 genera automaticamente:
- `bg-navy`, `text-navy`, `border-navy`
- `bg-blue`, `text-blue`, `border-blue`
- `bg-sky`, `text-sky`
- `bg-light`, `text-light`
- `text-gray-muted`
- ecc.

---

## Tipografia

### Font family

| Variabile | Font | Uso |
|-----------|------|-----|
| `--font-sans` (→ `font-sans`) | Geist Sans | Body, titoli, testo generale |
| `--font-mono` (→ `font-mono`) | Geist Mono | Numeri statistiche (StatsBar, Impatto) |

Caricamento tramite pacchetto `geist` in `layout.tsx`:
```tsx
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// → className={`${GeistSans.variable} ${GeistMono.variable}`}
```

### Scale tipografica

| Elemento | Size | Weight | Extra |
|----------|------|--------|-------|
| Hero H1 | `clamp(36px, 6vw, 80px)` | 700 | `letter-spacing: -2px`, `line-height: 1.05` |
| Section H2 | `clamp(28px, 4vw, 44px)` | 700 | `tracking-tight` |
| CTA H2 | `clamp(24px, 3.5vw, 36px)` | 700 | `tracking-tight` |
| Stat numero | `clamp(30px, 4vw, 44px)` | 700 | `font-mono` |
| Impatto numero | `clamp(34px, 4vw, 52px)` | 700 | `font-mono`, colore `#93C5FD` |
| Body | 15–18px | 400 | `leading-relaxed` |
| Tag sezione | 12px | 600 | `tracking-[2px]`, uppercase |
| Source | 11px | 400 | `text-gray-400` |

### Font features

```css
font-feature-settings: "liga" 1, "pnum" 1;
```
- **liga**: ligature tipografiche
- **pnum**: numeri proporzionali (non tabulari)

---

## Animazioni

Tutte le animazioni usano la libreria **Motion** (`motion/react`).

### Catalogo animazioni

| Nome | Componente | Tipo | Dettaglio |
|------|-----------|------|-----------|
| Word stagger | Hero H1 | `variants` + `staggerChildren` | 0.08s per parola, fade + translateY(24px) |
| Fade up | Hero tag, subtitle, CTA | `initial`/`animate` | opacity 0→1, y 16–20→0 |
| Arrow hover | Hero CTA | `whileHover` variant | freccia SVG +4px asse X, spring (stiffness 400) |
| Counter | StatsBar, Impatto | `useMotionValue` + `animate` | 0→target in 1.2s ease-out, trigger `useInView` |
| Card stagger | Problema, Promessa, Impatto | `whileInView` | fade + translateY(30px), delay `i * 0.12s` |
| Magnetic hover | Problema, Promessa | `useMotionValue` + `useSpring` | rotateX/Y ±4deg, perspective 800px |
| Scroll blur | Nav | `useScroll` + `useTransform` | bg opacity, blur, border nei primi 40px |
| Scale in | CtaSection | `whileInView` | scale 0.96→1 + fade, 0.5s ease-out |
| Focus glow | CtaSection input | CSS `.input-glow` + Motion `whileFocus` | box-shadow blu, borderColor animato |

### Hook `useMagnetic()`

Implementato localmente in `Problema.tsx` e `Promessa.tsx`:

```
mouseMove → normalizza posizione (0–1) → offset da centro (-0.5 / +0.5)
  → useTransform → mappa a rotateX/Y ±4deg
    → useSpring (stiffness 300, damping 30) → applica a style
mouseLeave → reset a 0 (spring anima il ritorno)
```

---

## Effetti CSS

Definiti in `globals.css`.

### Mesh gradient (`.hero-mesh`)

3 radial-gradient sovrapposti con `background-size: 200% 200%` e keyframe `mesh-move`:
- Durata: 12s
- Easing: ease-in-out
- Loop: infinite
- Colori: `#0A1240` (base), `#1e3a8a`, `#2563EB`

### Noise overlay

SVG inline nel componente Hero:
```xml
<filter id="noise">
  <feTurbulence type="fractalNoise" baseFrequency="0.65"
                numOctaves="3" stitchTiles="stitch" />
</filter>
```
Opacity: 0.04, pointer-events: none.

### Shimmer button (`.shimmer-btn`)

Pseudo-element `::after` con gradient lineare trasparente→bianco→trasparente:
- Transform: `translateX(-100%)` (stato base)
- Su hover: keyframe `shimmer` 0.8s — scorre da -100% a +100%

### Dot grid (`.dot-grid`)

Usato nella sezione Impatto:
```css
background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
background-size: 24px 24px;
```
Opacity del container: 0.06.

### Input glow (`.input-glow`)

Su `:focus`:
```css
border-color: var(--blue);
box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
```

---

## Responsive

Approccio **mobile-first** con breakpoint Tailwind:

| Breakpoint | Uso |
|------------|-----|
| Default (< 640px) | Grid 1 colonna, form stack verticale |
| `sm` (≥ 640px) | Stats e Impatto grid 3 colonne |
| `md` (≥ 768px) | Problema grid 3 colonne, nav padding maggiore |
| `lg` (≥ 1024px) | Promessa grid 3 colonne |

### Adattamenti mobile
- Stagger animazioni: invariato (già leggero)
- Magnetic hover: attivo solo su dispositivi con `hover: hover` (mouse)
- Nav mobile: logo + bottone CTA, nessun menu hamburger
