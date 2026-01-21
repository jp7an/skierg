# SkiErg Startgruppskalkylator

En kalkylator för att beräkna startgrupp (Vasaloppet) baserat på 5000m SkiErg-tid, vikt och skidvana.

## Funktioner

- Beräkna effekt (W) från 5000m tid med Concept2-formeln: `W = 2.80 / (t/500)^3`
- Beräkna W/kg (watt per kilogram)
- Beräkna tempo per 500m
- Bestäm startgrupp (Elit, 1-9) baserat på:
  - W/kg-värde
  - Skidvana (liten, okej, stor)

## Skidvana (Skierfarenhet)

Kalkylatorn tillåter tre nivåer av skidvana:
- **Liten**: Lägre tröskelvärden - kräver högre W/kg för samma startgrupp
- **Okej** (standard): Medel tröskelvärden
- **Stor**: Högre tröskelvärden - kvalificerar för högre startgrupp med lägre W/kg

### Startgrupp Tröskelvärden (W/kg)

| Startgrupp | Liten | Okej | Stor |
|-----------|-------|------|------|
| Elit      | 3.12  | 3.64 | 4.45 |
| 1         | 2.66  | 3.12 | 3.81 |
| 2         | 2.39  | 2.82 | 3.45 |
| 3         | 2.12  | 2.51 | 3.08 |
| 4         | 1.94  | 2.31 | 2.84 |
| 5         | 1.82  | 2.17 | 2.67 |
| 6         | 1.73  | 2.07 | 2.54 |
| 7         | 1.65  | 1.98 | 2.44 |
| 8         | 1.57  | 1.89 | 2.33 |
| 9         | 1.50  | 1.81 | 2.24 |

## Användning

1. Ange din vikt i kilogram
2. Ange din 5000m tid i format MM:SS (t.ex. 19:30)
3. Välj din skidvana (liten/okej/stor)
4. Klicka på "Beräkna"

Kalkylatorn visar:
- Effekt (W)
- W/kg
- Tempo per 500m
- Startgrupp

## Utveckling

```bash
# Installera dependencies
npm install

# Kör utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Kör tester
npm test

# Lint
npm run lint
```

## Teknik

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Jest för tester

## Licens

MIT
