# SkiErg Kalkylatorer

En svensk, minimalistisk Next.js-app för Concept2 SkiErg-relaterade beräkningar.

## Funktioner

- **Watt ↔ Tempo/500m**: Konvertera mellan watt och tempo/500m med Concept2-formeln
- **Tid för sträcka**: Beräkna tid för en given sträcka från watt eller tempo/500m
- **Sträcka för tid**: Beräkna sträcka för en given tid från watt eller tempo/500m
- **Krävd kraft**: Beräkna krävd watt/tempo för en specifik sträcka och tid
- **Startled-kalkylator**: Beräkna startgrupp baserat på vikt och 5000m tid

## Formler

Concept2-formel: `Watt = 2.80 / (tempo/500m)³` där tempo är i sekunder per 500m.

Startgrupper baseras på W/kg-trösklar:
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
