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
