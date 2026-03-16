const {
    GARMENTS,
    OUTFIT_COMBINATIONS,
} = require('../utils/constants');

// Flatten all garments into a lookup map by ID
const allGarments = {};
[
    ...GARMENTS.shirts,
    ...GARMENTS.jackets,
    ...GARMENTS.dresses,
    ...GARMENTS.pants,
].forEach((g) => {
    allGarments[g.id] = g;
});

/**
 * Build an outfit result object from a combination definition.
 * @param {object} combo - One entry from OUTFIT_COMBINATIONS
 * @param {number} index - Position in the result list
 * @param {string} occasionId
 * @param {string[]} stylePrefs
 * @returns {object} OutfitResult
 */
function buildOutfitResult(combo, index, occasionId, stylePrefs) {
    const items = [];

    if (combo.jacket) {
        const g = allGarments[combo.jacket];
        if (g) items.push({ type: 'Jacket', name: g.name, price: g.price, image: g.image, color: g.color, brand: g.brand });
    }
    if (combo.dress) {
        const g = allGarments[combo.dress];
        if (g) items.push({ type: 'Dress', name: g.name, price: g.price, image: g.image, color: g.color, brand: g.brand });
    }
    if (combo.top) {
        const g = allGarments[combo.top];
        if (g) items.push({ type: 'Top', name: g.name, price: g.price, image: g.image, color: g.color, brand: g.brand });
    }
    if (combo.bottom) {
        const g = allGarments[combo.bottom];
        if (g) items.push({ type: 'Bottom', name: g.name, price: g.price, image: g.image, color: g.color, brand: g.brand });
    }

    const tags = [
        `#${combo.style.replace(' ', '')}`,
        `#${occasionId || 'Fashion'}`,
        stylePrefs[0] ? `#${stylePrefs[0]}` : '#Trending',
    ];

    return {
        id: `outfit-${index}`,
        style: combo.style,
        fitScore: combo.fitScore,
        items,
        tags,
    };
}

/**
 * Recommend up to 6 outfit combinations based on user preferences.
 * @param {string} bodyTypeId - e.g. 'hourglass'
 * @param {string} occasionId - e.g. 'casual'
 * @param {string[]} stylePrefs - e.g. ['Minimalist']
 * @returns {object[]} Array of outfit results
 */
function recommendOutfits(bodyTypeId, occasionId, stylePrefs) {
    // Keep combos that match either the body type or the occasion (or both)
    const filtered = OUTFIT_COMBINATIONS.filter((combo) => {
        const bodyMatch = !bodyTypeId || combo.bodyTypes.includes(bodyTypeId);
        const occasionMatch = !occasionId || combo.occasion === occasionId;
        return bodyMatch || occasionMatch;
    });

    // Sort by fitScore descending and take top 6
    const top6 = filtered
        .sort((a, b) => b.fitScore - a.fitScore)
        .slice(0, 6);

    return top6.map((combo, i) => buildOutfitResult(combo, i, occasionId, stylePrefs));
}

module.exports = { recommendOutfits };
