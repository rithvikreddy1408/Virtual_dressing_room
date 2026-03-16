const express = require('express');
const router = express.Router();
const { getGarments, getTrends, getMeta, getRecommendations } = require('../controllers/appController');

// Garment catalog
router.get('/garments', getGarments);

// Trend data (items, charts, hashtags, style of week)
router.get('/trends', getTrends);

// Body types, occasions, style preferences (for UI selectors)
router.get('/meta', getMeta);

// Outfit recommendations (requires body: { bodyTypeId, occasionId, stylePrefs })
router.post('/recommend', getRecommendations);

module.exports = router;
