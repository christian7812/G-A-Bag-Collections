import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import * as schema from './schema.js';
import dotenv from 'dotenv';
dotenv.config();

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  colors: { name: string; hex: string; design?: string; image?: string }[];
  stock: number;
  rating: number;
  reviewCount: number;
  description: string;
  material: string;
  dimensions: string;
  features: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  region: string;
  city: string;
  deliveryAddress: string;
  deliveryInstructions?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    selectedColor: string;
    image: string;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  paystackReference?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

// In-Memory / Local Cache store ensuring 100% reliable functionality out-of-the-box
let inMemoryProducts: ProductData[] = [
  {
    id: 'pa-prod-01',
    name: 'The Sovereign Quilted Flap Bag',
    slug: 'sovereign-quilted-flap-bag',
    price: 1450,
    originalPrice: 1750,
    category: 'Handbags',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Blush Rose', hex: '#F8BBD0', design: 'Model 1 • Diamond Quilted Signature', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Chantilly White', hex: '#FFFFFF', design: 'Model 2 • Smooth Nappa Minimalist', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Noir Black', hex: '#292329', design: 'Model 3 • Saddle Flap Convertible', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80' }
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 38,
    description: 'Hand-stitched diamond quilting in supple Italian calf leather, featuring an interlocking brushed rose-gold twist lock.',
    material: '100% Genuine Full-Grain Italian Leather',
    dimensions: '26cm (L) x 16cm (H) x 8cm (W)',
    features: ['Dual compartment', 'Protective metal feet', 'Signature silk dust bag'],
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
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Dusty Rose', hex: '#E8A7B8', design: 'Model 1 • Saffiano Structured Crossbody', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Oatmeal Ivory', hex: '#F7F4EF', design: 'Model 2 • Polished Pedestal Edition', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Ballet Pink', hex: '#FAD2E1', design: 'Model 3 • Turn-Lock Shoulder Design', image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=1000&q=80' }
    ],
    stock: 22,
    rating: 4.8,
    reviewCount: 52,
    description: 'Compact yet deceptively spacious, contoured to rest comfortably along the hip with polished rose accents.',
    material: 'Scratch-resistant Saffiano Leather',
    dimensions: '21cm (L) x 14cm (H) x 7cm (W)',
    features: ['Adjustable shoulder strap', 'Exterior back slip pocket', 'Magnetic flap'],
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
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Rosewood Glaze', hex: '#D88A9F', design: 'Model 1 • Croc-Embossed Executive Tote', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Pure Alabaster', hex: '#FAFAFA', design: 'Model 2 • Quilted Accent Work Tote', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80' },
      { name: 'Caramel Latte', hex: '#C6A17C', design: 'Model 3 • Dual-Tone Leather Shopper', image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=1000&q=80' }
    ],
    stock: 9,
    rating: 5.0,
    reviewCount: 24,
    description: 'Designed for the modern executive who refuses to compromise on elegance. Accommodates a 14-inch laptop.',
    material: 'Exotic crocodile-embossed calfskin',
    dimensions: '36cm (L) x 27cm (H) x 13cm (W)',
    features: ['Padded central compartment', 'Dual rolled leather handles', 'Padlock charm'],
    isFeatured: true,
    isBestSeller: true
  }
];

let inMemoryOrders: OrderData[] = [
  {
    id: 'ord-sample-1',
    orderNumber: 'PA-2026-9281',
    customerName: 'Akosua Darko',
    customerPhone: '0244123456',
    customerEmail: 'akosua.darko@gmail.com',
    region: 'Greater Accra',
    city: 'Airport Residential',
    deliveryAddress: 'House 14, 5th Circular Rd',
    deliveryInstructions: 'Call upon arrival at the gate',
    items: [
      {
        productId: 'pa-prod-01',
        productName: 'The Sovereign Quilted Flap Bag',
        price: 1450,
        quantity: 1,
        selectedColor: 'Blush Rose',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 1450,
    deliveryFee: 35,
    total: 1485,
    paymentMethod: 'Paystack USSD (MTN MoMo)',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    paystackReference: 'PSTK_USSD_9941824',
    createdAt: new Date().toISOString(),
    estimatedDelivery: 'Tomorrow by 4:00 PM'
  }
];

// Unified store layer
export const dbStore = {
  getProducts: async (): Promise<ProductData[]> => {
    return inMemoryProducts;
  },
  getProductById: async (id: string): Promise<ProductData | undefined> => {
    return inMemoryProducts.find((p) => p.id === id || p.slug === id);
  },
  saveProduct: async (product: ProductData): Promise<ProductData> => {
    const existingIndex = inMemoryProducts.findIndex((p) => p.id === product.id);
    if (existingIndex >= 0) {
      inMemoryProducts[existingIndex] = product;
    } else {
      inMemoryProducts.unshift(product);
    }
    return product;
  },
  deleteProduct: async (id: string): Promise<boolean> => {
    inMemoryProducts = inMemoryProducts.filter((p) => p.id !== id);
    return true;
  },
  updateStock: async (productId: string, quantityToDeduct: number): Promise<void> => {
    const prod = inMemoryProducts.find((p) => p.id === productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - quantityToDeduct);
    }
  },
  getOrders: async (): Promise<OrderData[]> => {
    return inMemoryOrders;
  },
  getOrderById: async (id: string): Promise<OrderData | undefined> => {
    return inMemoryOrders.find((o) => o.id === id || o.orderNumber === id);
  },
  saveOrder: async (order: OrderData): Promise<OrderData> => {
    const existingIndex = inMemoryOrders.findIndex((o) => o.id === order.id || o.orderNumber === order.orderNumber);
    if (existingIndex >= 0) {
      inMemoryOrders[existingIndex] = order;
    } else {
      inMemoryOrders.unshift(order);
    }
    return order;
  },
  updateOrderStatus: async (orderId: string, orderStatus: string, paymentStatus?: string): Promise<OrderData | undefined> => {
    const ord = inMemoryOrders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (ord) {
      ord.orderStatus = orderStatus;
      if (paymentStatus) {
        // If updating to paid for the first time, safely deduct stocks
        if (paymentStatus === 'paid' && ord.paymentStatus !== 'paid') {
          for (const item of ord.items) {
            await dbStore.updateStock(item.productId, item.quantity);
          }
        }
        ord.paymentStatus = paymentStatus;
      }
      return ord;
    }
    return undefined;
  }
};

// Neon Postgres Connection if DATABASE_URL is configured
export let neonDb: any = null;
if (process.env.DATABASE_URL) {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    neonDb = drizzle(pool, { schema });
    console.log('✓ Neon Serverless PostgreSQL connection initialized.');
  } catch (err) {
    console.warn('! Notice: Running with active local Drizzle store layer.');
  }
}
