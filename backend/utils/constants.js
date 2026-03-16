// ─── Garment Catalog ─────────────────────────────────────────────────────────
// gender: 'male' | 'female' | 'unisex'  — used to filter by detected gender
// color: CSS swatch color — no external image URLs needed

const GARMENTS = {
  shirts: [
    { id: 's1', name: 'Classic White Oxford',    price: 89,  color: '#f5f5f5', brand: 'Elegance Co',    sizes: ['XS','S','M','L','XL'],    gender: 'male',   tags: ['formal','smart-casual'] },
    { id: 's2', name: 'Navy Slim Fit Shirt',     price: 79,  color: '#1e3a5f', brand: 'UrbanEdge',      sizes: ['S','M','L','XL'],          gender: 'male',   tags: ['formal','business'] },
    { id: 's3', name: 'Floral Print Blouse',     price: 65,  color: '#e8d5c4', brand: 'Bloom',          sizes: ['XS','S','M','L'],          gender: 'female', tags: ['casual','floral'] },
    { id: 's4', name: 'Oversized Linen Shirt',   price: 95,  color: '#d4e8f0', brand: 'Coastal',        sizes: ['S','M','L','XL','XXL'],    gender: 'unisex', tags: ['casual','relaxed'] },
    { id: 's5', name: 'Black Turtleneck',        price: 72,  color: '#1a1a1a', brand: 'Noir Studio',    sizes: ['XS','S','M','L'],          gender: 'unisex', tags: ['casual','minimal'] },
    { id: 's6', name: 'Silk Satin Blouse',       price: 110, color: '#f4c6d4', brand: 'Luxe Line',      sizes: ['XS','S','M'],              gender: 'female', tags: ['party','elegant'] },
    { id: 's7', name: 'Graphic Streetwear Tee',  price: 55,  color: '#2d2d2d', brand: 'StreetCo',       sizes: ['S','M','L','XL','XXL'],    gender: 'male',   tags: ['casual','streetwear'] },
    { id: 's8', name: 'Boxy Crop Top',           price: 45,  color: '#f9a8d4', brand: 'Breezy',         sizes: ['XS','S','M'],              gender: 'female', tags: ['casual','trendy'] },
  ],
  jackets: [
    { id: 'j1', name: 'Leather Biker Jacket',    price: 299, color: '#2a1a0a', brand: 'Rebel Road',     sizes: ['S','M','L','XL'],          gender: 'male',   tags: ['streetwear','casual'] },
    { id: 'j2', name: 'Tailored Wool Blazer',    price: 245, color: '#2c3e50', brand: 'Prestige',       sizes: ['S','M','L','XL','XXL'],    gender: 'male',   tags: ['formal','business'] },
    { id: 'j3', name: 'Denim Jacket',            price: 135, color: '#4a90d9', brand: 'Denim Days',     sizes: ['XS','S','M','L','XL'],     gender: 'unisex', tags: ['casual','streetwear'] },
    { id: 'j4', name: 'Puffer Jacket',           price: 189, color: '#2d5a27', brand: 'AlpineWear',     sizes: ['S','M','L','XL'],          gender: 'unisex', tags: ['casual','winter'] },
    { id: 'j5', name: 'Belted Trench Coat',      price: 320, color: '#8B7355', brand: 'Heritage',       sizes: ['XS','S','M','L','XL'],     gender: 'female', tags: ['formal','elegant'] },
    { id: 'j6', name: 'Velvet Blazer',           price: 275, color: '#6B21A8', brand: 'Royal Stitch',   sizes: ['S','M','L'],               gender: 'unisex', tags: ['party','elegant'] },
    { id: 'j7', name: 'Bomber Jacket',           price: 165, color: '#556B2F', brand: 'AirForce',       sizes: ['S','M','L','XL'],          gender: 'male',   tags: ['casual','streetwear'] },
    { id: 'j8', name: 'Cropped Moto Jacket',     price: 210, color: '#4a1a0a', brand: 'EdgeWear',       sizes: ['XS','S','M'],              gender: 'female', tags: ['streetwear','edgy'] },
  ],
  dresses: [
    { id: 'd1', name: 'Floral Midi Dress',       price: 125, color: '#FF8FAB', brand: 'Garden Tale',    sizes: ['XS','S','M','L'],          gender: 'female', tags: ['casual','floral'] },
    { id: 'd2', name: 'LBD Cocktail Dress',      price: 195, color: '#1a1a1a', brand: 'Noir Luxe',      sizes: ['XS','S','M','L','XL'],     gender: 'female', tags: ['party','elegant'] },
    { id: 'd3', name: 'Bohemian Maxi Dress',     price: 145, color: '#DEB887', brand: 'Free Spirit',    sizes: ['XS','S','M','L','XL'],     gender: 'female', tags: ['casual','boho'] },
    { id: 'd4', name: 'Red Evening Gown',        price: 350, color: '#DC143C', brand: 'Glam Couture',   sizes: ['XS','S','M','L'],          gender: 'female', tags: ['formal','party'] },
    { id: 'd5', name: 'Wrap Midi Dress',         price: 89,  color: '#4A90A4', brand: 'WrapStyle',      sizes: ['XS','S','M','L','XL'],     gender: 'female', tags: ['casual','smart-casual'] },
    { id: 'd6', name: 'Mini Shirt Dress',        price: 99,  color: '#F5DEB3', brand: 'Casual Chic',    sizes: ['XS','S','M','L'],          gender: 'female', tags: ['casual','trendy'] },
  ],
  pants: [
    { id: 'p1', name: 'Slim Fit Dark Jeans',     price: 89,  color: '#1a237e', brand: 'Denim Lab',      sizes: ['XS','S','M','L','XL'],     gender: 'male',   tags: ['casual','smart-casual'] },
    { id: 'p2', name: 'Wide-Leg Trousers',       price: 115, color: '#708090', brand: 'Palazzo',        sizes: ['XS','S','M','L','XL'],     gender: 'female', tags: ['formal','trendy'] },
    { id: 'p3', name: 'Tailored Chinos',         price: 95,  color: '#D2B48C', brand: 'Office Edit',    sizes: ['S','M','L','XL','XXL'],    gender: 'male',   tags: ['formal','business'] },
    { id: 'p4', name: 'Faux Leather Leggings',   price: 135, color: '#2d1b0e', brand: 'Edge Style',     sizes: ['XS','S','M','L'],          gender: 'female', tags: ['casual','edgy'] },
    { id: 'p5', name: 'Barrel-Leg Jeans',        price: 99,  color: '#4a6fa5', brand: 'Breezy Denim',   sizes: ['XS','S','M','L','XL'],     gender: 'female', tags: ['casual','trendy'] },
    { id: 'p6', name: 'Classic Black Slacks',    price: 110, color: '#0d0d0d', brand: 'Boardroom',      sizes: ['S','M','L','XL','XXL'],    gender: 'male',   tags: ['formal','business'] },
    { id: 'p7', name: 'Cargo Utility Pants',     price: 85,  color: '#556B2F', brand: 'Street Utility', sizes: ['S','M','L','XL'],          gender: 'male',   tags: ['casual','streetwear'] },
    { id: 'p8', name: 'High-Waist Flare Jeans',  price: 110, color: '#2e4a8a', brand: 'Retro Lab',      sizes: ['XS','S','M','L'],          gender: 'female', tags: ['casual','retro'] },
  ],
};

// ─── Body Types ───────────────────────────────────────────────────────────────

const BODY_TYPES = [
  { id: 'hourglass', name: 'Hourglass',          description: 'Balanced bust and hips, defined waist',     emoji: '⌛', styles: ['wrap dresses','high-waist pants','fitted blazers'] },
  { id: 'pear',      name: 'Pear',               description: 'Narrower shoulders, wider hips',            emoji: '🍐', styles: ['A-line skirts','wide shoulder tops','dark bottoms'] },
  { id: 'apple',     name: 'Apple',              description: 'Fuller midsection, slimmer legs',           emoji: '🍎', styles: ['empire waist dresses','V-necks','straight-leg pants'] },
  { id: 'rectangle', name: 'Rectangle',          description: 'Similar bust, waist, and hip measurements', emoji: '▭', styles: ['peplum tops','ruffled blouses','belt-cinched dresses'] },
  { id: 'inverted',  name: 'Inverted Triangle',  description: 'Broader shoulders, narrower hips',          emoji: '🔻', styles: ['wide-leg pants','A-line skirts','flared bottoms'] },
];

// ─── Occasions ────────────────────────────────────────────────────────────────

const OCCASIONS = [
  { id: 'casual', name: 'Casual',    icon: '☀️', description: 'Everyday relaxed style' },
  { id: 'formal', name: 'Formal',    icon: '👔', description: 'Business and professional settings' },
  { id: 'party',  name: 'Party',     icon: '🎉', description: 'Celebrations and events' },
  { id: 'sports', name: 'Sports',    icon: '🏃', description: 'Active and athletic wear' },
  { id: 'date',   name: 'Date Night',icon: '💕', description: 'Romantic and special occasions' },
  { id: 'beach',  name: 'Beach',     icon: '🏖️', description: 'Resort and outdoor leisure' },
];

// ─── Style Preferences ────────────────────────────────────────────────────────

const STYLES = ['Minimalist','Bohemian','Streetwear','Elegant','Sporty','Romantic','Classic','Avant-Garde'];

// ─── Outfit Combinations (rule-based engine input) ────────────────────────────

const OUTFIT_COMBINATIONS = [
  { top: 's2', bottom: 'p1', occasion: 'casual', bodyTypes: ['rectangle','pear'],              fitScore: 95, style: 'Casual Cool' },
  { top: 's1', bottom: 'p3', occasion: 'formal', bodyTypes: ['hourglass','rectangle','apple'], fitScore: 90, style: 'Business Chic' },
  { top: 's6', bottom: 'p2', occasion: 'party',  bodyTypes: ['hourglass','inverted'],          fitScore: 88, style: 'Party Glam' },
  { dress: 'd1', occasion: 'casual', bodyTypes: ['hourglass','pear'],       fitScore: 92, style: 'Floral Casual' },
  { dress: 'd2', occasion: 'party',  bodyTypes: ['rectangle','apple'],      fitScore: 94, style: 'Classic Evening' },
  { top: 's5', bottom: 'p4', occasion: 'date',   bodyTypes: ['hourglass','rectangle'],         fitScore: 91, style: 'Edgy Romance' },
  { jacket: 'j1', top: 's1', bottom: 'p1', occasion: 'casual', bodyTypes: ['rectangle'],      fitScore: 87, style: 'Rebel Classic' },
  { jacket: 'j2', top: 's1', bottom: 'p3', occasion: 'formal', bodyTypes: ['inverted','rectangle'], fitScore: 93, style: 'Power Suit' },
  { dress: 'd3', occasion: 'beach',  bodyTypes: ['pear','inverted'],        fitScore: 89, style: 'Boho Beach' },
  { dress: 'd4', occasion: 'party',  bodyTypes: ['hourglass'],              fitScore: 96, style: 'Red Carpet' },
  { top: 's3', bottom: 'p5', occasion: 'casual', bodyTypes: ['apple','pear'],                  fitScore: 85, style: 'Print Mix' },
  { jacket: 'j3', top: 's2', bottom: 'p1', occasion: 'casual', bodyTypes: ['hourglass','rectangle','inverted'], fitScore: 88, style: 'Denim Duo' },
];

// ─── Trend Data (2025 actual trending fashion) ───────────────────────────────
// Based on Spring/Summer 2025 runway trends and global fashion search data

const TRENDING_ITEMS = [
  { id: 1,  rank: 1,  name: 'Quiet Luxury Neutrals',  category: 'Aesthetic',  trend: '+58%', emoji: '🤍', desc: 'Understated elegance with beige, cream & taupe tones. Cashmere, silk, and impeccable tailoring.', tags: ['#QuietLuxury','#OldMoney'], hot: true },
  { id: 2,  rank: 2,  name: 'Barrel-Leg Jeans',       category: 'Denim',      trend: '+51%', emoji: '👖', desc: 'The relaxed, rounded silhouette replacing skinny jeans as 2025\'s dominant denim shape.', tags: ['#BarrelJeans','#DenimTrend'], hot: true },
  { id: 3,  rank: 3,  name: 'Chocolate Brown Palette',category: 'Color',      trend: '+47%', emoji: '🍫', desc: 'Rich chocolate brown is the breakout color of 2025 — from head-to-toe monochrome to key accents.', tags: ['#ChocolateBrown','#BrownAesthetic'], hot: true },
  { id: 4,  rank: 4,  name: 'Oversized Blazers',      category: 'Jackets',    trend: '+42%', emoji: '🧥', desc: 'Power dressing reimagined. Oversized structured blazers in neutral tones dominate office to street.', tags: ['#OversizedBlazer','#PowerDressing'], hot: true },
  { id: 5,  rank: 5,  name: 'Sheer & Mesh Layers',    category: 'Tops',       trend: '+38%', emoji: '✨', desc: 'Sheer fabrics layered over basics create a dreamy, editorial look straight from the SS25 runway.', tags: ['#SheerFashion','#LayeringTrend'], hot: false },
  { id: 6,  rank: 6,  name: 'Wide-Leg Trousers',      category: 'Bottoms',    trend: '+35%', emoji: '👗', desc: 'Wide-leg silhouettes continue their reign, now in linen, tailored wool, and bold prints.', tags: ['#WideLeg','#TailoredTrousers'], hot: false },
  { id: 7,  rank: 7,  name: 'Boho Maxi Revival',      category: 'Dresses',    trend: '+32%', emoji: '🌸', desc: 'Flowing maxi dresses with floral prints and tiered layers are back for 2025\'s festival season.', tags: ['#BohoStyle','#MaxiDress'], hot: false },
  { id: 8,  rank: 8,  name: 'Utility & Cargo Style',  category: 'Workwear',   trend: '+28%', emoji: '🪖', desc: 'Functional pockets, cargo details, and utilitarian silhouettes blend practicality with edge.', tags: ['#CargoStyle','#Utilitarian'], hot: false },
  { id: 9,  rank: 9,  name: 'Leather Trench Coats',   category: 'Outerwear',  trend: '+24%', emoji: '🖤', desc: 'Leather and faux-leather trenches are the season\'s statement outerwear — sleek and powerful.', tags: ['#LeatherTrench','#CoatSeason'], hot: false },
  { id: 10, rank: 10, name: 'Denim-on-Denim',         category: 'Denim',      trend: '+21%', emoji: '💙', desc: 'The Canadian tuxedo is officially high fashion. Mix tones for a well-curated double denim look.', tags: ['#DenimOnDenim','#DoubleDemin'], hot: false },
  { id: 11, rank: 11, name: 'Ballet Core',            category: 'Aesthetic',  trend: '+18%', emoji: '🩰', desc: 'Soft pinks, wrap skirts, satin ribbons, and tulle — ballet aesthetics leap from studio to street.', tags: ['#BalletCore','#SoftGirl'], hot: false },
  { id: 12, rank: 12, name: 'Knit Co-ord Sets',       category: 'Sets',       trend: '+14%', emoji: '🧶', desc: 'Matching knit tops and bottoms for a cozy, polished look. The smarter alternative to a tracksuit.', tags: ['#KnitCoord','#CoordSet'], hot: false },
];


const TREND_CHART_DATA = [
  { month: 'Sep', oversized: 30, boho: 45, streetwear: 55, elegant: 60 },
  { month: 'Oct', oversized: 42, boho: 40, streetwear: 65, elegant: 55 },
  { month: 'Nov', oversized: 55, boho: 38, streetwear: 58, elegant: 70 },
  { month: 'Dec', oversized: 60, boho: 35, streetwear: 48, elegant: 88 },
  { month: 'Jan', oversized: 72, boho: 42, streetwear: 60, elegant: 75 },
  { month: 'Feb', oversized: 85, boho: 58, streetwear: 72, elegant: 68 },
  { month: 'Mar', oversized: 90, boho: 75, streetwear: 80, elegant: 72 },
];

const CATEGORY_PIE_DATA = [
  { name: 'Casual',     value: 35, color: '#c9a96e' },
  { name: 'Formal',     value: 22, color: '#b07d6b' },
  { name: 'Party',      value: 18, color: '#d4956a' },
  { name: 'Streetwear', value: 15, color: '#8a9e8c' },
  { name: 'Sports',     value: 10, color: '#7aab8a' },
];

const SEASONAL_BAR_DATA = [
  { season: 'Spring', dresses: 88, tops: 72, jackets: 40, pants: 55 },
  { season: 'Summer', dresses: 95, tops: 88, jackets: 22, pants: 45 },
  { season: 'Autumn', dresses: 60, tops: 65, jackets: 85, pants: 78 },
  { season: 'Winter', dresses: 30, tops: 50, jackets: 95, pants: 88 },
];

const TRENDING_HASHTAGS = [
  '#CoreAesthetic','#QuietLuxury','#OldMoney','#CoastalGrandmother','#DarkAcademia',
  '#Y2KRevival','#CottageCore','#GoblinMode','#CleanGirl','#BarbiePink',
  '#MermaidCore','#Streetwear2025','#SilkMafia','#PowerDressing','#NeutralsOnly',
];

const STYLE_OF_WEEK = {
  title: 'Quiet Luxury Minimalism',
  description: "The art of looking expensive without screaming it. Think neutral tones, impeccable tailoring, and quality fabrics. This season's power move is letting your silhouette do the talking.",
  image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=500&h=600&fit=crop',
  tips: [
    'Invest in neutral monochromatic palettes',
    'Focus on cut and fit over logos',
    'Cashmere and silk are your best friends',
    'Less jewelry, more impact',
  ],
};

const NAV_LINKS = [
  { label: 'Home',            href: '#home' },
  { label: 'Try-On',         href: '#try-on' },
  { label: 'Recommendations', href: '#recommendations' },
  { label: 'Trends',          href: '#trends' },
  { label: 'Dashboard',       href: '#dashboard' },
];

module.exports = {
  GARMENTS,
  BODY_TYPES,
  OCCASIONS,
  STYLES,
  OUTFIT_COMBINATIONS,
  TRENDING_ITEMS,
  TREND_CHART_DATA,
  CATEGORY_PIE_DATA,
  SEASONAL_BAR_DATA,
  TRENDING_HASHTAGS,
  STYLE_OF_WEEK,
  NAV_LINKS,
};
