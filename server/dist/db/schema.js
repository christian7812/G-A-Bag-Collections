import { pgTable, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
// Products Table (Neon PostgreSQL Schema)
export const products = pgTable('products', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    price: integer('price').notNull(), // in Ghana Cedis (GH₵)
    originalPrice: integer('original_price'),
    category: text('category').notNull(),
    images: text('images').array().notNull(), // PostgreSQL array or JSON
    colors: jsonb('colors').notNull(), // [{ name, hex }]
    stock: integer('stock').notNull().default(0),
    rating: text('rating').default('5.0'),
    reviewCount: integer('review_count').default(0),
    description: text('description').notNull(),
    material: text('material').notNull(),
    dimensions: text('dimensions').notNull(),
    features: text('features').array(),
    isNewArrival: boolean('is_new_arrival').default(false),
    isBestSeller: boolean('is_best_seller').default(false),
    isFeatured: boolean('is_featured').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
// Orders Table
export const orders = pgTable('orders', {
    id: text('id').primaryKey(),
    orderNumber: text('order_number').notNull().unique(),
    customerName: text('customer_name').notNull(),
    customerPhone: text('customer_phone').notNull(),
    customerEmail: text('customer_email'),
    region: text('region').notNull(),
    city: text('city').notNull(),
    deliveryAddress: text('delivery_address').notNull(),
    deliveryInstructions: text('delivery_instructions'),
    items: jsonb('items').notNull(), // [{ productId, productName, price, quantity, selectedColor, image }]
    subtotal: integer('subtotal').notNull(),
    deliveryFee: integer('delivery_fee').notNull(),
    total: integer('total').notNull(),
    paymentMethod: text('payment_method').notNull().default('Paystack USSD'),
    paymentStatus: text('payment_status').notNull().default('pending'), // 'pending' | 'paid' | 'failed'
    orderStatus: text('order_status').notNull().default('pending'), // 'pending' | 'processing' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
    paystackReference: text('paystack_reference'),
    estimatedDelivery: text('estimated_delivery'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
// Admin Users Table
export const admins = pgTable('admins', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: text('role').notNull().default('super_admin'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
