export type Category = 
  | 'Handbags'
  | 'Shoulder Bags'
  | 'Tote Bags'
  | 'Crossbody Bags'
  | 'Clutches'
  | 'Luxury Bags';

export interface ProductColor {
  name: string;
  hex: string;
  design?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number; // In GH₵
  originalPrice?: number;
  category: Category;
  images: string[];
  colors: ProductColor[];
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

export interface CartItem {
  id: string; // product id + color
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export type OrderStatus = 'pending' | 'processing' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  selectedColor: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  region: string;
  city: string;
  deliveryAddress: string;
  deliveryInstructions?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paystackReference?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  productName: string;
  verified: boolean;
  date: string;
  avatar?: string;
}
