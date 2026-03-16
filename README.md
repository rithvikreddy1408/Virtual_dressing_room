# Smart Virtual Dressing Room

An AI-powered virtual fashion app with virtual try-on, outfit recommendations, trend insights, and a personal wardrobe dashboard.

## Stack

| Layer    | Technology |
|----------|-----------|
| Frontend | HTML + Vanilla CSS + Vanilla JavaScript |
| Backend  | Node.js + Express |
| Charts   | Chart.js (CDN) |

---

## Project Structure

```
SmartDressingRoom/
├── backend/
│   ├── server.js                  # Express entry point
│   ├── routes/
│   │   └── api.js                 # 4 API endpoints
│   ├── controllers/
│   │   └── appController.js       # Thin request/response handlers
│   ├── services/
│   │   ├── recommenderService.js  # Outfit recommendation engine
│   │   └── trendService.js        # Trend data aggregator
│   ├── middlewares/
│   │   └── errorHandler.js        # Global Express error handler
│   └── utils/
│       └── constants.js           # All data: garments, body types, trends
├── frontend/
│   ├── index.html                 # Single-page app (all 5 pages)
│   ├── css/
│   │   └── style.css              # Design system, components, animations
│   └── js/
│       ├── api.js                 # fetch() calls to backend
│       ├── ui.js                  # DOM rendering, canvas drawing, wardrobe
│       └── app.js                 # Entry point — initialises everything
├── .env.example
├── package.json
└── README.md
```

---

## Quick Start

### 1. Install dependencies
```bash
cd SmartDressingRoom
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Edit .env if you want a different port (default: 3001)
```

### 3. Start the server
```bash
npm start
```

### 4. Open the app
Visit **http://localhost:3001** in your browser.

---

## API Endpoints

| Method | Path              | Description                                  |
|--------|-------------------|----------------------------------------------|
| GET    | `/api/garments`   | Returns full garment catalog by category     |
| GET    | `/api/trends`     | Returns trend items, charts, hashtags        |
| GET    | `/api/meta`       | Returns body types, occasions, style options |
| POST   | `/api/recommend`  | Returns up to 6 outfit recommendations       |

### POST `/api/recommend` — request body
```json
{
  "bodyTypeId": "hourglass",
  "occasionId": "casual",
  "stylePrefs": ["Minimalist", "Elegant"]
}
```

---

## Features

- **Virtual Try-On** — Upload photo or use webcam. AI detects 33-point body pose and overlays selected garments on the canvas.
- **Garment Panel** — Browse 24 garments across 4 categories (Tops, Jackets, Dresses, Pants). Click to try on.
- **Fit Prediction** — Instant AI fit score with label (Good Fit / Slightly Loose / Too Tight) and progress bar.
- **Outfit Recommendations** — Select body type + occasion + style preferences → 6 AI-generated outfit combinations.
- **Trend Insights** — 12 trending items, line/pie/bar charts, Style of the Week, trending hashtags.
- **Dashboard** — Saved outfits, favourites, and try-on history tabs. Data persisted in localStorage.
- **Dark / Light Mode** — Toggle button in navbar, preference saved to localStorage.
- **Responsive Design** — Mobile-friendly hamburger nav and adaptive grids.

---

## Development

For auto-reload during development:
```bash
npm run dev
```
