/**
 * api.js — All fetch calls to the backend.
 * Every function returns the parsed data or throws an error.
 */

const BASE_URL = 'http://localhost:3001';

/**
 * Fetch the full garment catalog grouped by category.
 * @returns {Promise<object>} { shirts, jackets, dresses, pants }
 */
async function fetchGarments() {
    const res = await fetch(`${BASE_URL}/api/garments`);
    if (!res.ok) throw new Error('Failed to load garments');
    const json = await res.json();
    return json.data;
}

/**
 * Fetch all data for the Trends page.
 * @returns {Promise<object>} { trendingItems, chartData, pieData, barData, hashtags, styleOfWeek }
 */
async function fetchTrends() {
    const res = await fetch(`${BASE_URL}/api/trends`);
    if (!res.ok) throw new Error('Failed to load trend data');
    const json = await res.json();
    return json.data;
}

/**
 * Fetch body types, occasions, and style preferences for UI selectors.
 * @returns {Promise<object>} { bodyTypes, occasions, styles }
 */
async function fetchMeta() {
    const res = await fetch(`${BASE_URL}/api/meta`);
    if (!res.ok) throw new Error('Failed to load metadata');
    const json = await res.json();
    return json.data;
}

/**
 * Request outfit recommendations from the AI engine.
 * @param {string} bodyTypeId - e.g. 'hourglass'
 * @param {string} occasionId - e.g. 'casual'
 * @param {string[]} stylePrefs - e.g. ['Minimalist']
 * @returns {Promise<object[]>} Array of outfit results
 */
async function fetchRecommendations(bodyTypeId, occasionId, stylePrefs) {
    const res = await fetch(`${BASE_URL}/api/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bodyTypeId, occasionId, stylePrefs }),
    });
    if (!res.ok) throw new Error('Failed to get recommendations');
    const json = await res.json();
    return json.data;
}

/**
 * Generate an AI try-on image via Ollama Flux.
 * Sends garment details to the backend which calls the local Ollama server.
 *
 * @param {string} capturedImageBase64 - Base64 JPEG of the webcam/upload snapshot (no data-URL prefix)
 * @param {object} garment - { name, type, color, brand }
 * @returns {Promise<{imageBase64: string, model: string}>}
 */
async function generateTryOnWithFlux(capturedImageBase64, garment) {
    const res = await fetch(`${BASE_URL}/api/generate-tryon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageBase64: capturedImageBase64 || '',
            garmentName: garment.name,
            garmentType: garment.type,
            garmentColor: garment.color || '#c9a96e',
            garmentBrand: garment.brand || 'Unknown',
        }),
    });
    const json = await res.json();
    if (!json.success) {
        const err = new Error(json.error || 'Image generation failed');
        err.hint = json.hint || '';
        throw err;
    }
    return { imageBase64: json.imageBase64, model: json.model };
}

/**
 * Check whether the Ollama server is accessible.
 * @returns {Promise<{running: boolean, models: string[]}>}
 */
async function ollamaStatus() {
    try {
        const res = await fetch(`${BASE_URL}/api/ollama-status`, { signal: AbortSignal.timeout(4000) });
        if (!res.ok) return { running: false, models: [] };
        return await res.json();
    } catch {
        return { running: false, models: [] };
    }
}

