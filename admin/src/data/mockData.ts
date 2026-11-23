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
    image: 'https://images.unsplash.com/photo-1566150902887-9679ec15dcb5?auto=format&fit=crop&w=800&q=80',
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
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Rose', hex: '#F8BBD0' },
      { name: 'Chantilly White', hex: '#FFFFFF' },
      { name: 'Noir Black', hex: '#292329' }
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
      'Includes signature Pink Aura silk dust bag'
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
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#E8A7B8' },
      { name: 'Oatmeal Ivory', hex: '#F7F4EF' },
      { name: 'Ballet Pink', hex: '#FAD2E1' }
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
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Rosewood Glaze', hex: '#D88A9F' },
      { name: 'Pure Alabaster', hex: '#FAFAFA' },
      { name: 'Caramel Latte', hex: '#C6A17C' }
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
      'Custom gold padlock charm with Pink Aura monogram'
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
      { name: 'Soft Peach Pink', hex: '#FDC5B7' },
      { name: 'Cream Silk', hex: '#FDFBF7' }
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
      'Supple interior that expands seamlessly'
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: 'pa-prod-05',
    name: 'Lumière Crystal Gala Envelope Clutch',
    slug: 'lumiere-crystal-gala-clutch',
    price: 1320,
    category: 'Clutches',
    images: [
      'https://images.unsplash.com/photo-1566150902887-9679ec15dcb5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Rose Sparkle', hex: '#FAD2E1' },
      { name: 'Silver Starlight', hex: '#ECEFF1' }
    ],
    stock: 6,
    rating: 4.9,
    reviewCount: 31,
    description: 'An evening showstopper handcrafted with precision-cut Austrian pavé crystals along the envelope flap. Emits an ethereal luminescence under gala lights and candlelight.',
    material: 'Lustrous satin exterior encrusted with premium crystal pavé',
    dimensions: '24cm (L) x 13cm (H) x 5cm (W)',
    features: [
      'Jewelled brooch clasp',
      'Discreet drop-in serpentine chain strap',
      'Holds iPhone 16 Pro Max, lipstick, cardholder, and keys'
    ],
    isFeatured: true
  },
  {
    id: 'pa-prod-06',
    name: 'Monarque Exotic Kelly Top-Handle',
    slug: 'monarque-exotic-kelly-bag',
    price: 2650,
    originalPrice: 3200,
    category: 'Luxury Bags',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Fuchsia Royale', hex: '#E91E63' },
      { name: 'Pale Blush', hex: '#FCE4EC' },
      { name: 'Midnight Plum', hex: '#4A154B' }
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
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Petal Nude', hex: '#F3C6D0' },
      { name: 'Vanilla Cream', hex: '#FFFDD0' }
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
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Weave', hex: '#F6C3D5' },
      { name: 'Warm Biscuit', hex: '#E0C5A8' }
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
    id: 'pa-prod-09',
    name: 'Elysian Minaudière Box Clutch',
    slug: 'elysian-minaudiere-box-clutch',
    price: 1100,
    category: 'Clutches',
    images: [
      'https://images.unsplash.com/photo-1566150902887-9679ec15dcb5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Rose Gold Mirror', hex: '#B76E79' },
      { name: 'Pearl Shell', hex: '#F0EAD6' }
    ],
    stock: 8,
    rating: 4.8,
    reviewCount: 18,
    description: 'A rigid sculptural hard-shell clutch with Mother-of-Pearl resin marbling and polished 18K rose gold-plated perimeter framing. A jewelry piece in handbag form.',
    material: 'Hand-cast iridescent resin with metallic frame',
    dimensions: '19cm (L) x 11cm (H) x 5cm (W)',
    features: [
      'Push-clasp globe closure',
      'Velvet-flocked inner lining',
      'Concealable fine jewelry chain'
    ],
    isNewArrival: true
  },
  {
    id: 'pa-prod-10',
    name: 'Versailles Micro Kelly Crossbody',
    slug: 'versailles-micro-kelly-crossbody',
    price: 950,
    originalPrice: 1200,
    category: 'Crossbody Bags',
    images: [
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sweet Cherry Blossom', hex: '#FFB7C5' },
      { name: 'Bright Rose', hex: '#E91E63' },
      { name: 'Pearl White', hex: '#FFFFFF' }
    ],
    stock: 18,
    rating: 4.7,
    reviewCount: 39,
    description: 'Chic micro proportions with maximum statement power. Holds your key essentials with impeccable Parisian polish.',
    material: 'Epsom grain calfskin',
    dimensions: '18cm (L) x 13cm (H) x 6cm (W)',
    features: [
      'Turn-lock clasp',
      'Detachable cross-body strap',
      'Structured top handle'
    ],
    isBestSeller: true
  },
  {
    id: 'pa-prod-11',
    name: 'Astrid Pleated Bucket Handbag',
    slug: 'astrid-pleated-bucket-bag',
    price: 1280,
    category: 'Handbags',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Rose Champagne', hex: '#F7D6D0' },
      { name: 'Warm Cream', hex: '#FFF8EE' }
    ],
    stock: 15,
    rating: 4.9,
    reviewCount: 21,
    description: 'Fluted origami pleats create an alluring columnar silhouette with a drawstring leather cord and faceted metallic tassels.',
    material: 'Nappa leather with permanent accordion heat pleating',
    dimensions: '22cm (Diameter) x 25cm (H)',
    features: [
      'Cinch drawstring closure with weighted tassel finials',
      'Solid round base with brass studs',
      'Internal zip pocket'
    ]
  },
  {
    id: 'pa-prod-12',
    name: 'Imperia Heritage Doctor Bag',
    slug: 'imperia-heritage-doctor-bag',
    price: 2450,
    category: 'Luxury Bags',
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush & Tan Duo', hex: '#E4A4B4' },
      { name: 'All White Pearl', hex: '#F8F9FA' }
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
    comment: 'I purchased the Monarque Kelly for my sister’s wedding in Kumasi. Everyone could not stop asking where I got it! The USSD payment was so effortless on my MTN phone. Pink Aura has won me for life.',
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
