# Deployment

## Vercel (raccomandato)

### Primo deploy

1. Pusha il progetto su un repo GitHub/GitLab/Bitbucket
2. Vai su [vercel.com/new](https://vercel.com/new) e importa il repository
3. Configura:
   - **Root Directory**: `nextjs` (se il repo contiene anche la cartella padre)
   - **Framework Preset**: Next.js (auto-detect)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
4. Clicca **Deploy**

### Deploy successivi

Ogni push su `main` triggera un deploy automatico. Le branch creano preview deploy.

### Configurazione

Il file `vercel.json` nella root del progetto Next.js:

```json
{
  "framework": "nextjs"
}
```

Questo file è opzionale — Vercel rileva automaticamente Next.js. È incluso per chiarezza.

---

## Variabili d'ambiente

Il progetto attualmente **non richiede variabili d'ambiente**. L'URL del Google Apps Script è hardcoded in `CtaSection.tsx`.

Se in futuro si volesse esternalizzare:

```env
# .env.local
NEXT_PUBLIC_SCRIPT_URL=https://script.google.com/macros/s/...
```

E nel componente:
```tsx
const SCRIPT_URL = process.env.NEXT_PUBLIC_SCRIPT_URL!;
```

> **Nota**: il prefisso `NEXT_PUBLIC_` è necessario per esporre la variabile al client bundle.

---

## Build output

La pagina viene pre-renderizzata come **contenuto statico** (Static Generation).

```
Route (app)              Size     First Load JS
┌ ○ /                    ~55 kB   ~158 kB
└ ○ /_not-found          ~1 kB    ~103 kB
```

Non ci sono API route, ISR o SSR. La pagina è servita come HTML statico + JS client per le animazioni.

---

## Dominio personalizzato

1. In Vercel → **Settings → Domains**
2. Aggiungi il dominio (es. `pronia.it`)
3. Configura i record DNS come indicato da Vercel:
   - **A record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com`
4. SSL automatico via Let's Encrypt

---

## Performance

### Ottimizzazioni già incluse

- **Static Generation**: la pagina è pre-renderizzata a build time
- **next/image**: ottimizzazione automatica del logo (WebP, lazy loading, dimensioni esplicite)
- **Geist font**: caricato via `next/font` con `font-display: swap` e subset automatico
- **Turbopack**: dev server veloce con `next dev --turbopack`
- **Tree shaking**: solo i componenti Motion usati sono nel bundle

### Lighthouse atteso

| Metrica | Target |
|---------|--------|
| Performance | 95+ |
| Accessibility | 90+ |
| Best Practices | 100 |
| SEO | 100 |

---

## Troubleshooting

### Warning "multiple lockfiles"

Se il build mostra un warning su lockfile multipli, è perché il repo padre ha un suo `package-lock.json`. Soluzioni:

- Impostare `outputFileTracingRoot` in `next.config.ts`
- Oppure spostare il progetto Next.js alla root del repo

### Google Apps Script CORS

Il form usa `mode: "no-cors"`. Questo significa che:
- La response è **opaque** (non leggibile dal client)
- Il `POST` viene comunque eseguito
- Errori di rete vengono catturati dal `catch`, ma errori lato script no

Per un feedback affidabile, sarebbe necessario configurare CORS headers nello script Google.
