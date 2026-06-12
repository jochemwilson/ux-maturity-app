# UX Maturity Assessment

Webtool voor het beoordelen van de UX maturity van proposities op drie pijlers: Partnerschap, Research & Inzichten en Design System.

## Lokaal starten

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Zetten op GitHub

```bash
git init
git add .
git commit -m "first commit"
```

Ga naar [github.com/new](https://github.com/new), maak een repository aan en voer uit:

```bash
git remote add origin https://github.com/JOUW_NAAM/ux-maturity-app.git
git branch -M main
git push -u origin main
```

## Deployen via Vercel (aanbevolen)

```bash
npm install -g vercel
vercel
```

Vercel detecteert Vite automatisch. Na de eerste deploy krijg je een live URL.
Elke `git push` naar `main` deployt automatisch als je Vercel aan GitHub koppelt.

## Deployen via GitHub Pages

```bash
npm install --save-dev gh-pages
```

Voeg toe aan `vite.config.js`:
```js
export default defineConfig({
  base: '/ux-maturity-app/',   // naam van je GitHub repo
  plugins: [react()],
})
```

Voeg toe aan `package.json` scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Daarna: `npm run deploy`

## Structuur

```
src/
  data/model.js        Maturity model data + scoring helpers
  hooks/useSessions.js localStorage persistence
  components/          UI-componenten per scherm
  App.jsx              Routing + globale state
```

## Stack

- React 18 + Vite
- CSS Modules
- localStorage (geen backend nodig)
