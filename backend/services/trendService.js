const {
    TRENDING_ITEMS,
    TREND_CHART_DATA,
    CATEGORY_PIE_DATA,
    SEASONAL_BAR_DATA,
    TRENDING_HASHTAGS,
    STYLE_OF_WEEK,
} = require('../utils/constants');

/**
 * Return all trend data as a single object.
 * The frontend uses this to render the Trends page.
 * @returns {object}
 */
function getTrendData() {
    return {
        trendingItems: TRENDING_ITEMS,
        chartData: TREND_CHART_DATA,
        pieData: CATEGORY_PIE_DATA,
        barData: SEASONAL_BAR_DATA,
        hashtags: TRENDING_HASHTAGS,
        styleOfWeek: STYLE_OF_WEEK,
    };
}

module.exports = { getTrendData };
