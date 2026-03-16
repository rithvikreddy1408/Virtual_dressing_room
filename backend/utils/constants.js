// ─── Garment Catalog ─────────────────────────────────────────────────────────

const GARMENTS = {
  shirts: [
    { id: 's1', name: 'Classic White Oxford',   price: 89,  image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#f5f5f5', brand: 'Elegance Co' },
    { id: 's2', name: 'Navy Slim Fit Shirt',    price: 79,  image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300&h=400&fit=crop', sizes: ['S','M','L','XL'], color: '#1e3a5f', brand: 'UrbanEdge' },
    { id: 's3', name: 'Floral Print Blouse',    price: 65,  image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=300&h=400&fit=crop', sizes: ['XS','S','M','L'], color: '#e8d5c4', brand: 'Bloom' },
    { id: 's4', name: 'Striped Linen Shirt',    price: 95,  image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=400&fit=crop', sizes: ['S','M','L','XL','XXL'], color: '#d4e8f0', brand: 'Coastal' },
    { id: 's5', name: 'Black Turtleneck',       price: 72,  image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop', sizes: ['XS','S','M','L'], color: '#1a1a1a', brand: 'Noir Studio' },
    { id: 's6', name: 'Silk Satin Top',         price: 110, image: 'https://images.unsplash.com/photo-1583388132789-93f842ec698c?w=300&h=400&fit=crop', sizes: ['XS','S','M'], color: '#f4c6d4', brand: 'Luxe Line' },
  ],
  jackets: [
    { id: 'j1', name: 'Leather Biker Jacket',  price: 299, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop', sizes: ['S','M','L','XL'], color: '#2a1a0a', brand: 'Rebel Road' },
    { id: 'j2', name: 'Wool Blazer',           price: 245, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', sizes: ['S','M','L','XL','XXL'], color: '#2c3e50', brand: 'Prestige' },
    { id: 'j3', name: 'Denim Jacket',          price: 135, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#4a90d9', brand: 'Denim Days' },
    { id: 'j4', name: 'Puffer Jacket',         price: 189, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=300&h=400&fit=crop', sizes: ['S','M','L','XL'], color: '#2d5a27', brand: 'AlpineWear' },
    { id: 'j5', name: 'Trench Coat',           price: 320, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#8B7355', brand: 'Heritage' },
    { id: 'j6', name: 'Velvet Blazer',         price: 275, image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=300&h=400&fit=crop', sizes: ['S','M','L'], color: '#6B21A8', brand: 'Royal Stitch' },
  ],
  dresses: [
    { id: 'd1', name: 'Floral Midi Dress',     price: 125, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop', sizes: ['XS','S','M','L'], color: '#FF8FAB', brand: 'Garden Tale' },
    { id: 'd2', name: 'LBD Cocktail Dress',    price: 195, image: 'https://images.unsplash.com/photo-1566479153369-bca2a1c6f0a0?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#1a1a1a', brand: 'Noir Luxe' },
    { id: 'd3', name: 'Bohemian Maxi Dress',   price: 145, image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#DEB887', brand: 'Free Spirit' },
    { id: 'd4', name: 'Red Evening Gown',      price: 350, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=400&fit=crop', sizes: ['XS','S','M','L'], color: '#DC143C', brand: 'Glam Couture' },
    { id: 'd5', name: 'Wrap Dress',            price: 89,  image: 'https://images.unsplash.com/photo-1583496661160-fb5218b5b0a6?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#4A90A4', brand: 'WrapStyle' },
    { id: 'd6', name: 'Mini Shirt Dress',      price: 99,  image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop', sizes: ['XS','S','M','L'], color: '#F5DEB3', brand: 'Casual Chic' },
  ],
  pants: [
    { id: 'p1', name: 'High-Waist Skinny Jeans', price: 89,  image: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#1a237e', brand: 'Denim Lab' },
    { id: 'p2', name: 'Wide-Leg Trousers',     price: 115, image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#708090', brand: 'Palazzo' },
    { id: 'p3', name: 'Tailored Chinos',       price: 95,  image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=300&h=400&fit=crop', sizes: ['S','M','L','XL','XXL'], color: '#D2B48C', brand: 'Office Edit' },
    { id: 'p4', name: 'Leather Leggings',      price: 135, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=400&fit=crop', sizes: ['XS','S','M','L'], color: '#2d1b0e', brand: 'Edge Style' },
    { id: 'p5', name: 'Printed Palazzo Pants', price: 79,  image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop', sizes: ['XS','S','M','L','XL'], color: '#FF6B6B', brand: 'Breezy' },
    { id: 'p6', name: 'Classic Black Slacks',  price: 110, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop', sizes: ['S','M','L','XL','XXL'], color: '#0d0d0d', brand: 'Boardroom' },
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

// ─── Trend Data ───────────────────────────────────────────────────────────────

const TRENDING_ITEMS = [
  { id: 1,  rank: 1,  name: 'Oversized Blazer',    category: 'Jackets',    trend: '+42%', image: 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=300&h=350&fit=crop', tags: ['#OversizedFashion','#PowerDressing'], hot: true },
  { id: 2,  rank: 2,  name: 'Wide-Leg Trousers',   category: 'Bottoms',    trend: '+38%', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=350&fit=crop', tags: ['#WideLeg','#Y2KVibes'], hot: true },
  { id: 3,  rank: 3,  name: 'Floral Midi Dress',   category: 'Dresses',    trend: '+35%', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=350&fit=crop', tags: ['#FloralFashion','#MidiMagic'], hot: true },
  { id: 4,  rank: 4,  name: 'Leather Trench Coat', category: 'Outerwear',  trend: '+28%', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=350&fit=crop', tags: ['#LeatherTrend','#CoatSeason'], hot: false },
  { id: 5,  rank: 5,  name: 'Cut-Out Tops',        category: 'Tops',       trend: '+24%', image: 'https://images.unsplash.com/photo-1583388132789-93f842ec698c?w=300&h=350&fit=crop', tags: ['#CutOut','#BodyCon'], hot: false },
  { id: 6,  rank: 6,  name: 'Cargo Pants',         category: 'Bottoms',    trend: '+22%', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=300&h=350&fit=crop', tags: ['#CargoStyle','#Utilitarian'], hot: false },
  { id: 7,  rank: 7,  name: 'Biker Shorts',        category: 'Activewear', trend: '+19%', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=300&h=350&fit=crop', tags: ['#Athleisure','#BikerShorts'], hot: false },
  { id: 8,  rank: 8,  name: 'Puff Sleeve Blouse',  category: 'Tops',       trend: '+17%', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=300&h=350&fit=crop', tags: ['#PuffSleeve','#VintageVibes'], hot: false },
  { id: 9,  rank: 9,  name: 'Mini Skirts',         category: 'Bottoms',    trend: '+15%', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=350&fit=crop', tags: ['#MiniSkirt','#Y2K'], hot: false },
  { id: 10, rank: 10, name: 'Silk Slip Dress',      category: 'Dresses',    trend: '+13%', image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=300&h=350&fit=crop', tags: ['#Satin','#SlipDress'], hot: false },
  { id: 11, rank: 11, name: 'Knit Co-ord Set',      category: 'Sets',       trend: '+11%', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=350&fit=crop', tags: ['#CoordSet','#KnitFashion'], hot: false },
  { id: 12, rank: 12, name: 'Barrel-Leg Jeans',     category: 'Denim',      trend: '+9%',  image: 'https://images.unsplash.com/photo-1542574271-7f3b92e6c821?w=300&h=350&fit=crop', tags: ['#BarrelJeans','#DenimTrend'], hot: false },
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
