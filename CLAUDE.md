# UX Maturity Assessment App

## Wat is dit?
Een webtool voor het beoordelen van UX maturity van proposities op drie pijlers:
- **Partnerschap** — samenwerking en rol van UX
- **Research & Inzichten** — inzet van onderzoek en data
- **Design System** — gebruik en adoptie van het design system

## Stack
- React 18 + Vite
- CSS Modules (geen Tailwind, geen UI-library)
- localStorage voor sessie-opslag
- Geen backend — volledig client-side

## Projectstructuur
```
src/
  data/model.js          # Alle data: PILLARS, LEVELS, scoring helpers
  hooks/useSessions.js   # localStorage persistence hook
  components/
    UI.jsx / UI.module.css         # Herbruikbare primitieven (Btn, Card, ProgressBar)
    HomeView.jsx                   # Startscherm met sessie-overzicht
    IntroView.jsx                  # Propositienaam invoeren
    PillarView.jsx                 # Scoringsvragen per pijler
    NotesView.jsx                  # Kwalitatieve notities
    RadarChart.jsx                 # Pure SVG radar chart
    ScorecardView.jsx              # Eindresultaat + scorecard
  App.jsx / App.module.css         # Routing en state
  main.jsx
  index.css                        # CSS custom properties + reset
```

## Scoringslogica
- Elke vraag scoort 1–5 (index 0–4 in de options array)
- Pillar score = gemiddelde van de antwoorden op die pijler
- Overall score = gemiddelde van de drie pijler scores
- **Balansregel**: overall score kan maximaal 1 punt hoger zijn dan de laagst scorende pijler
- Levels: Ad hoc (1–1.9), Projectmatig (2–2.9), Gestructureerd (3–3.9), Geïntegreerd (4–4.4), Experience gedreven (4.5–5)

## Ontwikkelafspraken
- Taal van de UI: Nederlands
- Geen externe UI-libraries toevoegen zonder expliciete vraag
- CSS Modules gebruiken, geen inline styles behalve voor dynamische kleuren
- Alle maturity-data zit in `src/data/model.js` — pas alleen daar aan als het model verandert
- `deriveSessionMeta()` altijd aanroepen vóór opslaan zodat scores meegeslagen worden

## Lokaal draaien
```bash
npm install
npm run dev
```

## Bouwen voor productie
```bash
npm run build
npm run preview
```

## Deployen
Vercel: `vercel` (na `npm install -g vercel`)
GitHub Pages: zie README.md
