# SkiErg Kalkylatorer

En svensk, minimalistisk Next.js-app för Concept2 SkiErg-relaterade beräkningar.

## Funktioner

- **Watt ↔ tid/500m**: Konvertera mellan watt och tid/500m med Concept2-formeln
- **Beräkna tid**: Beräkna tid för en given sträcka från watt eller tid/500m
- **Beräkna sträcka**: Beräkna sträcka för en given tid från watt eller tid/500m
- **Beräkna krävd effekt (watt)**: Beräkna krävd watt/tid för en specifik sträcka och tid
- **Beräkna startled**: Beräkna startgrupp baserat på vikt, 5000m tid och skidvana (liten/okej/stor)

## Formler

Concept2-formel: `Watt = 2.80 × (500 / tid)³` där tid är i sekunder per 500m.

Startgrupper baseras på W/kg-trösklar med tre erfarenhetsnivåer:

### Skidvana: Liten
- Elit: ≥ 3.12 W/kg
- 1: ≥ 2.66 W/kg
- 2: ≥ 2.39 W/kg
- 3: ≥ 2.12 W/kg
- 4: ≥ 1.94 W/kg
- 5: ≥ 1.82 W/kg
- 6: ≥ 1.73 W/kg
- 7: ≥ 1.65 W/kg
- 8: ≥ 1.57 W/kg
- 9: ≥ 1.50 W/kg

### Skidvana: Okej (standard)
- Elit: ≥ 3.64 W/kg
- 1: ≥ 3.12 W/kg
- 2: ≥ 2.82 W/kg
- 3: ≥ 2.51 W/kg
- 4: ≥ 2.31 W/kg
- 5: ≥ 2.17 W/kg
- 6: ≥ 2.07 W/kg
- 7: ≥ 1.98 W/kg
- 8: ≥ 1.89 W/kg
- 9: ≥ 1.81 W/kg

### Skidvana: Stor
- Elit: ≥ 4.45 W/kg
- 1: ≥ 3.81 W/kg
- 2: ≥ 3.45 W/kg
- 3: ≥ 3.08 W/kg
- 4: ≥ 2.84 W/kg
- 5: ≥ 2.67 W/kg
- 6: ≥ 2.54 W/kg
- 7: ≥ 2.44 W/kg
- 8: ≥ 2.33 W/kg
- 9: ≥ 2.24 W/kg

**OBS:** SkiErg-kapacitet kan variera mellan personer i förhållande till startled. Se [källa](https://erikwickstrom.se/2016/12/30/snittwatt-per-kg-kroppsvikt-pa-5000-m-skierg-vs-vasaloppsplacering/) för mer information.

## Utveckling

### Förutsättningar

- Node.js 18.17 eller senare
- npm eller yarn

### Installation

```bash
npm install
```

### Lokal utveckling

Starta utvecklingsservern:

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

### Bygga för produktion

```bash
npm run build
```

### Starta produktionsserver lokalt

```bash
npm run start
```

### Linting

```bash
npm run lint
```

## Deployment till Vercel

### Snabb deployment

1. Pusha din kod till GitHub
2. Importera projektet i [Vercel](https://vercel.com)
3. Vercel detekterar automatiskt Next.js och konfigurerar bygginställningarna
4. Klicka på "Deploy"

### Via Vercel CLI

Installera Vercel CLI:

```bash
npm i -g vercel
```

Deploy:

```bash
vercel
```

För produktionsdeployment:

```bash
vercel --prod
```

### Miljövariabler

Inga miljövariabler krävs för denna app.

## Teknisk stack

- **Framework**: Next.js 16 (App Router)
- **Språk**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Projektstruktur

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Huvudsida
│   └── globals.css        # Globala styles
├── components/            # React-komponenter
│   ├── Card.tsx
│   ├── WattTempoConverter.tsx
│   ├── TimeForDistanceCalculator.tsx
│   ├── DistanceForTimeCalculator.tsx
│   ├── RequiredEffortCalculator.tsx
│   └── StartledCalculator.tsx
├── lib/                   # Utility-funktioner
│   ├── timeUtils.ts       # Tidshantering
│   ├── skiergCalculations.ts  # SkiErg-beräkningar
│   └── startGroupUtils.ts # Startgrupplogik
├── public/                # Statiska filer
├── next.config.js         # Next.js-konfiguration
├── tailwind.config.ts     # Tailwind-konfiguration
└── tsconfig.json          # TypeScript-konfiguration
```

## Licens

ISC
