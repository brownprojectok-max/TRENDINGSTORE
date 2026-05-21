// data.jsx — mock catalog data for Trending Store wholesale

const CATEGORIES = [
  { id: 'smartphones', label: 'Smartphones', count: 1284, icon: 'phone' },
  { id: 'informatica', label: 'Informática',  count: 942,  icon: 'laptop' },
  { id: 'games',       label: 'Games',        count: 318,  icon: 'gamepad' },
  { id: 'audio',       label: 'Audio',        count: 467,  icon: 'headphones' },
  { id: 'wearables',   label: 'Wearables',    count: 219,  icon: 'watch' },
  { id: 'accesorios',  label: 'Accesorios',   count: 1856, icon: 'plug' },
  { id: 'redes',       label: 'Redes',        count: 184,  icon: 'router' },
  { id: 'outlet',      label: 'Outlet',       count: 612,  icon: 'tag' },
];

const BRANDS = [
  'Apple', 'Samsung', 'Xiaomi', 'Asus', 'Lenovo', 'Dell', 'HP', 'Sony',
  'JBL', 'Logitech', 'Acer', 'Motorola', 'Huawei', 'Bose', 'Razer', 'MSI',
];

// FX rates — base USD
const FX = { USD: 1, BRL: 5.49, PYG: 7280 };
const CURRENCY_META = {
  USD: { symbol: 'U$', decimals: 2, group: ',', dec: '.', flag: '🇺🇸' },
  BRL: { symbol: 'R$', decimals: 2, group: '.', dec: ',', flag: '🇧🇷' },
  PYG: { symbol: '₲',  decimals: 0, group: '.', dec: ',', flag: '🇵🇾' },
};

function fmtPrice(usd, ccy) {
  const m = CURRENCY_META[ccy];
  const v = usd * FX[ccy];
  const fixed = v.toFixed(m.decimals);
  const [intPart, decPart] = fixed.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, m.group);
  return m.symbol + ' ' + (m.decimals ? grouped + m.dec + decPart : grouped);
}

const PRODUCTS = [
  { id:'p01', sku:'TRS-SM-14P256', cat:'smartphones', brand:'Apple',    title:'iPhone 15 Pro 256GB', subtitle:'Titanium · A17 Pro · 6.1"',     usd: 1149, was: 1289, badge:'NEW',     stock: 42, tone:'#1d2238' },
  { id:'p02', sku:'TRS-SM-S24U',   cat:'smartphones', brand:'Samsung',  title:'Galaxy S24 Ultra 512GB',subtitle:'Snapdragon 8 Gen 3 · 200MP',   usd: 1049, was: 1199, badge:'HOT',     stock: 28, tone:'#2a1d38' },
  { id:'p03', sku:'TRS-SM-14XPRO', cat:'smartphones', brand:'Xiaomi',   title:'Xiaomi 14T Pro 1TB',   subtitle:'Dimensity 9300+ · Leica',       usd:  649, was:  799, badge:'OUTLET',  stock: 14, tone:'#38231d' },
  { id:'p04', sku:'TRS-NB-ROG16',  cat:'informatica', brand:'Asus',     title:'ROG Zephyrus G16',     subtitle:'i9-14900HX · RTX 4080 · 32GB',   usd: 2399, was: 2599, badge:null,      stock: 9,  tone:'#1d3338' },
  { id:'p05', sku:'TRS-NB-MBAM3',  cat:'informatica', brand:'Apple',    title:'MacBook Air 15" M3',   subtitle:'16GB · 512GB · Midnight',        usd: 1499, was: null, badge:'NEW',     stock: 31, tone:'#1d2c38' },
  { id:'p06', sku:'TRS-NB-XPS13',  cat:'informatica', brand:'Dell',     title:'XPS 13 Plus',          subtitle:'Core Ultra 7 · 32GB · 1TB',      usd: 1349, was: 1499, badge:'CAJA',    stock: 6,  tone:'#382f1d' },
  { id:'p07', sku:'TRS-GM-PS5SL',  cat:'games',       brand:'Sony',     title:'PlayStation 5 Slim',   subtitle:'Disc · 1TB · DualSense',         usd:  499, was:  549, badge:null,      stock: 53, tone:'#1d2238' },
  { id:'p08', sku:'TRS-AD-QC45',   cat:'audio',       brand:'Bose',     title:'QuietComfort Ultra',   subtitle:'Spatial Audio · 24h',            usd:  349, was:  429, badge:'-19%',    stock: 22, tone:'#231d38' },
  { id:'p09', sku:'TRS-WR-AW9-45', cat:'wearables',   brand:'Apple',    title:'Apple Watch S9 45mm',  subtitle:'GPS · Aluminium · Midnight',     usd:  389, was: null, badge:null,      stock: 38, tone:'#1d2238' },
  { id:'p10', sku:'TRS-GM-RZ-DV3', cat:'games',       brand:'Razer',    title:'DeathAdder V3 Pro',    subtitle:'30K DPI · 90h · Wireless',       usd:  139, was:  159, badge:null,      stock: 64, tone:'#1d3825' },
  { id:'p11', sku:'TRS-NB-LGY9',   cat:'informatica', brand:'Lenovo',   title:'Legion 9 Pro',         subtitle:'i9 · RTX 4090 · 64GB',           usd: 3299, was: 3599, badge:'TOP',     stock: 4,  tone:'#38231d' },
  { id:'p12', sku:'TRS-AD-SXM5',   cat:'audio',       brand:'Sony',     title:'WH-1000XM5',           subtitle:'Industry-leading ANC',           usd:  329, was:  399, badge:'OUTLET',  stock: 19, tone:'#2c1d38' },
];

Object.assign(window, { CATEGORIES, BRANDS, FX, CURRENCY_META, fmtPrice, PRODUCTS });
