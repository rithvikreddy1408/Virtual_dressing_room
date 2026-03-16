const { GARMENTS, BODY_TYPES, OCCASIONS } = require('../utils/constants');
const { recommendOutfits } = require('../services/recommenderService');
const { getTrendData } = require('../services/trendService');
const { generateOutfitImage, isOllamaRunning, listAvailableModels } = require('../services/ollamaService');

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

/**
 * POST /api/generate-tryon
 * Body: { imageBase64?, garmentName, garmentType, garmentColor, garmentBrand }
 * Returns: { success, imageBase64, prompt } or { success: false, error, hint }
 */
async function generateTryOn(req, res) {
    const { garmentName, garmentType, garmentColor, garmentBrand } = req.body;

    // Basic validation
    if (!garmentName || !garmentType) {
        return res.status(400).json({
            success: false,
            error: 'garmentName and garmentType are required.',
        });
    }

    // Check Ollama is reachable before trying to generate
    const ollamaUp = await isOllamaRunning();
    if (!ollamaUp) {
        return res.status(503).json({
            success: false,
            error: 'Ollama is not running.',
            hint: 'Start Ollama with: ollama serve — then pull a Flux model: ollama pull hf.co/lllyasviel/flux1-schnell-bnb-nf4',
        });
    }

    try {
        const garment = {
            name: garmentName,
            type: garmentType,
            color: garmentColor || '#ffffff',
            brand: garmentBrand || 'Unknown Brand',
        };

        const imageBase64 = await generateOutfitImage(garment);

        return res.json({
            success: true,
            imageBase64,
            model: process.env.FLUX_MODEL || 'hf.co/lllyasviel/flux1-schnell-bnb-nf4',
        });
    } catch (err) {
        // If model not found, list available models for a helpful hint
        const models = await listAvailableModels();
        const hint = models.length > 0
            ? `Available models: ${models.join(', ')}. Set FLUX_MODEL env variable to one of these.`
            : 'No models found. Run: ollama pull hf.co/lllyasviel/flux1-schnell-bnb-nf4';

        return res.status(500).json({
            success: false,
            error: err.message,
            hint,
        });
    }
}

/**
 * GET /api/ollama-status
 * Returns whether Ollama is running and lists available models.
 */
async function ollamaStatus(req, res) {
    const running = await isOllamaRunning();
    const models = running ? await listAvailableModels() : [];
    res.json({ running, models });
}

module.exports = { getGarments, getTrends, getMeta, getRecommendations, generateTryOn, ollamaStatus };
