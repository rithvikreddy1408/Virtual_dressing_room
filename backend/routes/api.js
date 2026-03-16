const express = require('express');
const router = express.Router();
const { getGarments, getTrends, getMeta, getRecommendations, generateTryOn, ollamaStatus } = require('../controllers/appController');

// Garment catalog
router.get('/garments', getGarments);

// Trend data (items, charts, hashtags, style of week)
router.get('/trends', getTrends);

// Body types, occasions, style preferences (for UI selectors)
router.get('/meta', getMeta);

// Outfit recommendations (requires body: { bodyTypeId, occasionId, stylePrefs })
router.post('/recommend', getRecommendations);

// AI Try-On image generation via Ollama Flux
// Body: { garmentName, garmentType, garmentColor, garmentBrand, imageBase64? }
router.post('/generate-tryon', generateTryOn);

// Ollama connectivity check — returns { running, models[] }
router.get('/ollama-status', ollamaStatus);

module.exports = router;
