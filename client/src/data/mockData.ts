import { Category, CustomerReview, Product } from '../types';

export const CATEGORIES: { name: Category; description: string; image: string; itemCount: number }[] = [
  {
    name: 'Handbags',
    description: 'Iconic structured silhouettes crafted for everyday prestige.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    itemCount: 8
  },
  {
    name: 'Shoulder Bags',
    description: 'Effortless grace designed to drape softly from day to dusk.',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    itemCount: 6
  },
  {
    name: 'Tote Bags',
    description: 'Generous capacity meets refined artisanal tailoring.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    itemCount: 7
  },
  {
    name: 'Crossbody Bags',
    description: 'Hands-free versatility with polished gold-tone hardware.',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80',
    itemCount: 9
  },
  {
    name: 'Clutches',
    description: 'Gala-ready statement pieces designed to captivate.',
    image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=800&q=80',
    itemCount: 5
  },
  {
    name: 'Luxury Bags',
    description: 'Exclusive limited-run masterpieces in premier nappa and exotic grains.',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'pa-prod-01',
    name: 'The Sovereign Quilted Flap Bag',
    slug: 'sovereign-quilted-flap-bag',
    price: 1450,
    originalPrice: 1750,
    category: 'Handbags',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Blush Rose', 
        hex: '#D5C6B3', 
        design: 'Model 1 • Diamond Quilted Signature',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Chantilly White', 
        hex: '#FFFFFF', 
        design: 'Model 2 • Smooth Nappa Minimalist',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Noir Black', 
        hex: '#292329', 
        design: 'Model 3 • Saddle Flap Convertible',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 38,
    description: 'The Sovereign is our hallmark silhouette. Hand-stitched with diamond quilting in supple Italian calf leather, it features an interlocking brushed rose-gold twist lock and convertible sliding chain strap.',
    material: '100% Genuine Full-Grain Italian Leather with 24K gold-plated hardware',
    dimensions: '26cm (L) x 16cm (H) x 8cm (W)',
    features: [
      'Dual compartment with interior zip divider',
      'Microfiber suede protective lining',
      'Protective metal base feet',
      'Includes signature G&A Collection silk dust bag'
    ],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'pa-prod-02',
    name: 'Aura Petite Leather Crossbody',
    slug: 'aura-petite-leather-crossbody',
    price: 890,
    originalPrice: 1100,
    category: 'Crossbody Bags',
    images: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Dusty Rose', 
        hex: '#E8A7B8', 
        design: 'Model 1 • Saffiano Structured Crossbody',
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Oatmeal Ivory', 
        hex: '#F7F4EF', 
        design: 'Model 2 • Polished Pedestal Edition',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Ballet Pink', 
        hex: '#FAD2E1', 
        design: 'Model 3 • Turn-Lock Shoulder Design',
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 22,
    rating: 4.8,
    reviewCount: 52,
    description: 'Compact yet deceptively spacious, the Aura Petite is contoured to rest comfortably along the hip. Its minimalist structured frame makes it your essential daytime-to-cocktail companion.',
    material: 'Scratch-resistant Saffiano Leather with polished rose accents',
    dimensions: '21cm (L) x 14cm (H) x 7cm (W)',
    features: [
      'Adjustable and detachable leather shoulder strap (drop 52cm)',
      'Exterior back slip pocket for quick phone access',
      'Interior 3-card slots and secure zip pocket',
      'Magnetic flap closure'
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'pa-prod-03',
    name: 'Palais Structured Croc Tote',
    slug: 'palais-structured-croc-tote',
    price: 1850,
    category: 'Tote Bags',
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Rosewood Glaze', 
        hex: '#D88A9F', 
        design: 'Model 1 • Croc-Embossed Executive Tote',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Pure Alabaster', 
        hex: '#FAFAFA', 
        design: 'Model 2 • Quilted Accent Work Tote',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Caramel Latte', 
        hex: '#C6A17C', 
        design: 'Model 3 • Dual-Tone Leather Shopper',
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 9,
    rating: 5.0,
    reviewCount: 24,
    description: 'Designed for the modern executive who refuses to compromise on elegance. Accommodates a 14-inch laptop with room for cosmetic cases, documents, and tech accessories.',
    material: 'Exotic crocodile-embossed calfskin with water-resistant lacquer finish',
    dimensions: '36cm (L) x 27cm (H) x 13cm (W)',
    features: [
      'Padded central compartment fitting up to 14" MacBook Pro',
      'Dual rolled leather top handles (15cm drop)',
      'Removable webbed comfort strap',
      'Custom gold padlock charm with G&A Collection monogram'
    ],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'pa-prod-04',
    name: 'Belgravia Ruched Cloud Pouch',
    slug: 'belgravia-ruched-cloud-pouch',
    price: 980,
    originalPrice: 1250,
    category: 'Shoulder Bags',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Soft Peach Pink', 
        hex: '#FDC5B7', 
        design: 'Model 1 • Lambskin Ruched Cloud Design',
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Cream Silk', 
        hex: '#FDFBF7', 
        design: 'Model 2 • Gilded Link Shoulder Model',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Deep Rose', 
        hex: '#1A1A1A', 
        design: 'Model 3 • Turn-Lock Evening Pouch',
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 11,
    rating: 4.7,
    reviewCount: 19,
    description: 'Voluptuous gathers of butter-soft lambskin create a pillow-like silhouette. Can be tucked under the arm as a sculptural clutch or worn over the shoulder with its chunky gilded link chain.',
    material: 'Buttery Italian lambskin with high-density gathering',
    dimensions: '31cm (L) x 18cm (H) x 12cm (W)',
    features: [
      'Concealed magnetic snap closure',
      'Detachable oversized polished curb chain',
      'Interior card organizer pocket'
    ]
  },
    {
    id: 'pa-prod-06',
    name: 'Monarque Exotic Kelly Top-Handle',
    slug: 'monarque-exotic-kelly-bag',
    price: 2650,
    originalPrice: 3200,
    category: 'Luxury Bags',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Fuchsia Royale', 
        hex: '#E91E63', 
        design: 'Model 1 • Chevre Goatskin Kelly Model',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Pale Blush', 
        hex: '#FCE4EC', 
        design: 'Model 2 • Turn-Lock Arch Top-Handle',
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Midnight Plum', 
        hex: '#4A154B', 
        design: 'Model 3 • Croc-Embossed Monarque',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 4,
    rating: 5.0,
    reviewCount: 15,
    description: 'The pinnacle of luxury leathercraft. The Monarque takes 34 hours of hand assembly by master leather artisans. Features an archival trapezoidal profile, hand-wrapped silk twilly scarf, and custom engraved hardware.',
    material: 'Grade-A French Chevre goatskin with hand-painted raw edges',
    dimensions: '28cm (L) x 21cm (H) x 11cm (W)',
    features: [
      'Turncock sanglon strap closure with working key clochette',
      'Complimentary pure silk patterned scarf',
      'Numbered certificate of authenticity',
      'Reinforced arched top handle'
    ],
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'pa-prod-07',
    name: 'Camille Half-Moon Saddle Bag',
    slug: 'camille-half-moon-saddle-bag',
    price: 1150,
    category: 'Shoulder Bags',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Petal Nude', 
        hex: '#F3C6D0', 
        design: 'Model 1 • Stirrup Ring Curved Saddle',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Vanilla Cream', 
        hex: '#FFFDD0', 
        design: 'Model 2 • Smooth Box-Calf Minimalist',
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Rose Quartz', 
        hex: '#1A1A1A', 
        design: 'Model 3 • Quilted Flap Accent Saddle',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 16,
    rating: 4.8,
    reviewCount: 42,
    description: 'Curves inspired by classical French architecture. The Camille sits comfortably tucked under the arm or crossbody, finished with our signature equestrian-inspired golden stirrup ring.',
    material: 'Silky smooth box-calf leather',
    dimensions: '24cm (L) x 19cm (H) x 7cm (W)',
    features: [
      'Curved magnetic front flap',
      'Signature equestrian ring hardware',
      'Dual length strap adjustment'
    ],
    isNewArrival: true
  },
  {
    id: 'pa-prod-08',
    name: 'Serena Woven Leather Shopper',
    slug: 'serena-woven-leather-shopper',
    price: 1650,
    category: 'Tote Bags',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Blush Weave', 
        hex: '#F6C3D5', 
        design: 'Model 1 • Hand-Woven Nappa Basket',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Warm Biscuit', 
        hex: '#E0C5A8', 
        design: 'Model 2 • Flat Tubular Handle Shopper',
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Chantilly Ecru', 
        hex: '#FFFFFF', 
        design: 'Model 3 • Diamond Quilted Travel Tote',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 12,
    rating: 4.9,
    reviewCount: 27,
    description: 'Intricately woven ribbons of soft calf leather crafted without visible seams. A relaxed yet intensely luxurious silhouette suited for coastal getaways, weekend brunches, or travel.',
    material: 'Hand-woven strips of vegetable-tanned nappa leather',
    dimensions: '40cm (L) x 30cm (H) x 15cm (W)',
    features: [
      'Removable zippered canvas organizer pouch with leather trim',
      'Ultra-comfortable flattened tubular handles',
      'Reinforced bottom panel'
    ]
  },
    {
    id: 'pa-prod-12',
    name: 'Imperia Heritage Doctor Bag',
    slug: 'imperia-heritage-doctor-bag',
    price: 2450,
    category: 'Luxury Bags',
    images: [
      'https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { 
        name: 'Blush & Tan Duo', 
        hex: '#E4A4B4', 
        design: 'Model 1 • Hinged Brass Frame Croc',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'All White Pearl', 
        hex: '#F8F9FA', 
        design: 'Model 2 • Smooth Pebble Grain Doctor',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      },
      { 
        name: 'Antique Rose', 
        hex: '#2B2B2B', 
        design: 'Model 3 • Vintage Lock Heritage Silhouette',
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 5,
    rating: 5.0,
    reviewCount: 14,
    description: 'An ode to vintage travel trunks. Opens with a hinged brass frame to reveal full visibility of your belongings. Finished with antique rose-gold hardware and leather key tag.',
    material: 'Vachetta and pebble grain bridle leather',
    dimensions: '33cm (L) x 22cm (H) x 16cm (W)',
    features: [
      'Doctor-style hinged frame opening',
      'Dual key padlock with leather clochette',
      '5 metal base protective studs',
      'Interior zip compartment and document sleeves'
    ],
    isFeatured: true
  },
  {
    id: 'pa-prod-13',
    name: 'The Siena Minimalist Leather Tote',
    slug: 'siena-minimalist-leather-tote',
    price: 1350,
    originalPrice: 1600,
    category: 'Tote Bags',
    images: [
      'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Warm Cognac',
        hex: '#9E5B32',
        design: 'Model 1 • Seamless Grain Leather',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Bone Cream',
        hex: '#F5F2EB',
        design: 'Model 2 • Polished Nappa',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 18,
    rating: 4.9,
    reviewCount: 42,
    description: 'An architectural everyday tote with clean vertical lines, crafted from supple full-grain calfskin with spacious capacity.',
    material: '100% Full-grain calfskin leather with micro-suede interior',
    dimensions: '35cm (L) x 28cm (H) x 14cm (W)',
    features: [
      'Spacious main compartment with magnetic snap',
      'Dual slender shoulder straps with reinforced stitching',
      'Detachable interior zip wristlet pouch'
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'pa-prod-14',
    name: 'Celeste Trapeze Structured Satchel',
    slug: 'celeste-trapeze-structured-satchel',
    price: 1590,
    originalPrice: 1850,
    category: 'Handbags',
    images: [
      'https://images.unsplash.com/photo-1605733513597-a8f8341084e6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Midnight Onyx',
        hex: '#1C1C1E',
        design: 'Model 1 • Flared Trapeze Wings',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Sandstone Tan',
        hex: '#D2B48C',
        design: 'Model 2 • Smooth Saddle Leather',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 12,
    rating: 4.8,
    reviewCount: 29,
    description: 'Distinctive flared trapeze profile with rolled top handles and a detachable crossbody strap, finished with brushed golden hardware.',
    material: 'Smooth polished calfskin with structural reinforcement',
    dimensions: '29cm (L) x 21cm (H) x 11cm (W)',
    features: [
      'Zip-top closure with security lock tab',
      'Detachable and adjustable leather shoulder strap',
      'Internal organizer pockets'
    ],
    isBestSeller: true
  },
  {
    id: 'pa-prod-15',
    name: 'Aria Half-Moon Curved Shoulder Bag',
    slug: 'aria-half-moon-curved-shoulder-bag',
    price: 950,
    category: 'Shoulder Bags',
    images: [
      'https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Caramel Clay',
        hex: '#B87333',
        design: 'Model 1 • Ergonomic Crescent Shape',
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Chalk Beige',
        hex: '#ECE7DE',
        design: 'Model 2 • Minimalist Nappa Curve',
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 20,
    rating: 4.9,
    reviewCount: 36,
    description: 'Sculptural crescent shape that nestles comfortably under the arm. Ultra-lightweight yet holds daily essentials with ease.',
    material: 'Supple Italian calfskin with leather-lined strap',
    dimensions: '27cm (L) x 18cm (H) x 6cm (W)',
    features: [
      'Smooth gliding brass zip closure',
      'Fixed curved shoulder drop (26cm)',
      'Custom gold-stamped G&A emblem'
    ],
    isNewArrival: true
  },
  {
    id: 'pa-prod-16',
    name: 'Valerie Structured Box Crossbody',
    slug: 'valerie-structured-box-crossbody',
    price: 1150,
    originalPrice: 1350,
    category: 'Crossbody Bags',
    images: [
      'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Muted Taupe',
        hex: '#A0937D',
        design: 'Model 1 • Framed Box Silhouette',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Jet Black',
        hex: '#111111',
        design: 'Model 2 • Gold Turnlock Accent',
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 16,
    rating: 4.7,
    reviewCount: 22,
    description: 'A structured vanity-style box bag designed for evening cocktails or stylish city strolls. Features a high-gloss latch and velvet interior lining.',
    material: 'Box-calf leather with high scratch-resistant glaze',
    dimensions: '19cm (L) x 14cm (H) x 8.5cm (W)',
    features: [
      'Top handle plus detachable chain strap',
      'Mirror inside the lid',
      'Gold-toned clasp with engraved logo'
    ]
  },
  {
    id: 'pa-prod-17',
    name: 'Elysian Woven Leather Shoulder Bag',
    slug: 'elysian-woven-leather-shoulder-bag',
    price: 1780,
    category: 'Shoulder Bags',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Espresso Intreccio',
        hex: '#3E2723',
        design: 'Model 1 • Hand-Woven Leather Lattice',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Vanilla Bean',
        hex: '#FAF0E6',
        design: 'Model 2 • Smooth Weave Edition',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 8,
    rating: 5.0,
    reviewCount: 19,
    description: 'Masterfully hand-braided leather strips form an ultra-flexible slouchy shape with rich texture and effortless sophistication.',
    material: '100% Italian Nappa woven by artisanal leather smiths',
    dimensions: '32cm (L) x 24cm (H) x 10cm (W)',
    features: [
      'Concealed magnetic frame closure',
      'Seamless integrated shoulder strap',
      'Interior zip compartment and phone pocket'
    ],
    isFeatured: true
  },
  {
    id: 'pa-prod-18',
    name: 'Monaco Dual-Handle City Shopper',
    slug: 'monaco-dual-handle-city-shopper',
    price: 1280,
    category: 'Tote Bags',
    images: [
      'https://images.unsplash.com/photo-1590739225287-bd31519780c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Oatmeal & Tan',
        hex: '#D7C4B7',
        design: 'Model 1 • Contrast Trim Shopper',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Charcoal',
        hex: '#333333',
        design: 'Model 2 • Monochrome Urban Tote',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 25,
    rating: 4.8,
    reviewCount: 31,
    description: 'Versatile dual-handle design allowing handheld carrying or effortless shoulder wear. Perfect for office, travel, or relaxed weekends.',
    material: 'Durable pebbled leather with water-repellent finish',
    dimensions: '38cm (L) x 30cm (H) x 15cm (W)',
    features: [
      'Dual grab handles and long shoulder straps',
      'Padded laptop divider fits 15-inch device',
      'Flat reinforced base with metal studs'
    ]
  },
  {
    id: 'pa-prod-19',
    name: 'Capri Gold-Clasp Envelope Clutch',
    slug: 'capri-gold-clasp-envelope-clutch',
    price: 820,
    originalPrice: 950,
    category: 'Clutches',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Metallic Gold Dust',
        hex: '#D4AF37',
        design: 'Model 1 • Shimmer Envelope Flap',
        image: 'https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Pure Onyx',
        hex: '#111111',
        design: 'Model 2 • Classic Evening Clutch',
        image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 27,
    description: 'Sleek triangular envelope flap with an ornate brushed brass bar clasp. Accompanied by a whisper-thin jewelry chain strap.',
    material: 'Fine grain lambskin with gold foil edge gilding',
    dimensions: '24cm (L) x 13cm (H) x 4cm (W)',
    features: [
      'Removable jewelry-grade serpentine chain strap',
      '6 internal card slots and slip pocket',
      'Magnetic snap closure under gold bar'
    ]
  },
  {
    id: 'pa-prod-20',
    name: 'Vendôme Grand Nappa Shopper',
    slug: 'vendome-grand-nappa-shopper',
    price: 2150,
    category: 'Luxury Bags',
    images: [
      'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      {
        name: 'Chestnut Burgundy',
        hex: '#4A0E17',
        design: 'Model 1 • Polished Saddle Finish',
        image: 'https://images.unsplash.com/photo-1614179689702-355944cd0918?auto=format&fit=crop&w=1000&q=80'
      },
      {
        name: 'Deep Espresso',
        hex: '#2B1B17',
        design: 'Model 2 • Antiqued Brass Hardware',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80'
      }
    ],
    stock: 7,
    rating: 5.0,
    reviewCount: 18,
    description: 'An heirloom-quality luxury shopper produced in limited editions. Ultra-supple glove-tanned nappa with hand-burnished edge staining.',
    material: 'Hand-dyed full grain Italian Nappa leather',
    dimensions: '40cm (L) x 32cm (H) x 16cm (W)',
    features: [
      'Hand-braided rolled leather handles',
      'Solid brass padlock with serial numbering',
      'Luxurious suede lining with zippered compartments'
    ],
    isFeatured: true,
    isBestSeller: true
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    name: 'Nana Ama Osei',
    rating: 5,
    comment: 'The quality of the Sovereign Quilted Flap Bag exceeded my highest expectations! The leather is buttery soft and the rose-gold lock is truly breathtaking. Arrived in Accra within 24 hours of ordering.',
    productName: 'The Sovereign Quilted Flap Bag',
    verified: true,
    date: '12 Nov 2026',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-02',
    name: 'Serwaa Mensah',
    rating: 5,
    comment: 'I purchased the Monarque Kelly for my sister’s wedding in Kumasi. Everyone could not stop asking where I got it! The USSD payment was so effortless on my MTN phone. G&A Collection has won me for life.',
    productName: 'Monarque Exotic Kelly Top-Handle',
    verified: true,
    date: '04 Nov 2026',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-03',
    name: 'Chloe Dupont',
    rating: 5,
    comment: 'Exquisite craftsmanship on par with high-end Parisian ateliers. The packaging came with a silk dust bag and personalized note. Outstanding attention to detail!',
    productName: 'Belgravia Ruched Cloud Pouch',
    verified: true,
    date: '28 Oct 2026',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-04',
    name: 'Abena Boateng',
    rating: 5,
    comment: 'The Aura Petite crossbody fits everything: my phone, keys, lipstick, and card case. The soft pink tone complements all my outfits. Five stars!',
    productName: 'Aura Petite Leather Crossbody',
    verified: true,
    date: '19 Oct 2026',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  }
];

export const GHANA_REGIONS = [
  { name: 'Greater Accra', fee: 35, cities: ['Accra Central', 'East Legon', 'Cantonments', 'Airport Residential', 'Osu', 'Spintex', 'Tema', 'Madina', 'Dansoman', 'Achimota'] },
  { name: 'Ashanti', fee: 50, cities: ['Kumasi Central', 'Asokwa', 'Nhyiaeso', 'Bantama', 'Kwadaso', 'Obuasi', 'Ejisu'] },
  { name: 'Central', fee: 55, cities: ['Cape Coast', 'Elmina', 'Kasoa', 'Winneba', 'Mfantseman'] },
  { name: 'Western', fee: 60, cities: ['Takoradi', 'Sekondi', 'Tarkwa', 'Axim'] },
  { name: 'Eastern', fee: 50, cities: ['Koforidua', 'Aburi', 'Akosombo', 'Nkawkaw'] },
  { name: 'Volta', fee: 65, cities: ['Ho', 'Hohoe', 'Aflao', 'Keta'] },
  { name: 'Northern', fee: 75, cities: ['Tamale', 'Yendi', 'Savelugu'] },
  { name: 'Bono', fee: 65, cities: ['Sunyani', 'Berekum', 'Techiman'] }
];
