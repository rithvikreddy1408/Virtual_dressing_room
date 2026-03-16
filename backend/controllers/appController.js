const { GARMENTS, BODY_TYPES, OCCASIONS } = require('../utils/constants');
const { recommendOutfits } = require('../services/recommenderService');
const { getTrendData } = require('../services/trendService');

/**
 * GET /api/garments
 * Returns the full garment catalog grouped by category.
 */
function getGarments(req, res) {
    res.json({ success: true, data: GARMENTS });
}

/**
 * GET /api/trends
 * Returns all trend data: trending items, chart arrays, hashtags, style of week.
 */
function getTrends(req, res) {
    const data = getTrendData();
    res.json({ success: true, data });
}

/**
 * GET /api/meta
 * Returns body types, occasions, and style preferences for UI dropdowns.
 */
function getMeta(req, res) {
    const { STYLES } = require('../utils/constants');
    res.json({ success: true, data: { bodyTypes: BODY_TYPES, occasions: OCCASIONS, styles: STYLES } });
}

/**
 * POST /api/recommend
 * Body: { bodyTypeId, occasionId, stylePrefs }
 * Returns up to 6 curated outfit combinations.
 */
function getRecommendations(req, res) {
    const { bodyTypeId = '', occasionId = '', stylePrefs = [] } = req.body;

    // Input validation
    if (!Array.isArray(stylePrefs)) {
        return res.status(400).json({ success: false, error: 'stylePrefs must be an array' });
    }

    const outfits = recommendOutfits(bodyTypeId, occasionId, stylePrefs);
    res.json({ success: true, data: outfits, count: outfits.length });
}

module.exports = { getGarments, getTrends, getMeta, getRecommendations };
