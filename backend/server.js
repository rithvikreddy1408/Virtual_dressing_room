require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────

// Allow cross-origin requests (useful when opening frontend directly from file system)
app.use(cors());

// Parse JSON request bodies (limit raised for base64 image payloads from webcam)
app.use(express.json({ limit: '10mb' }));

// ─── API Routes ───────────────────────────────────────────────────────────────

app.use('/api', apiRouter);

// ─── Serve Frontend ───────────────────────────────────────────────────────────

// Serve the frontend/ folder at the root URL
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// For any non-API route, serve index.html (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ─── Global Error Handler ─────────────────────────────────────────────────────

// Must be registered AFTER all routes
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
    console.log(`\n✅ Smart Dressing Room server running`);
    console.log(`   → http://localhost:${PORT}\n`);
});
