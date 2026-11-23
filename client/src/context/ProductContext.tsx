import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, OrderStatus, PaymentStatus } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

interface ProductContextType {
  products: Product[];
  orders: Order[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<boolean>;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'orderStatus' | 'paymentStatus'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, orderStatus: OrderStatus, paymentStatus?: PaymentStatus) => Promise<Order>;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  modalProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'ga_collection_products_v20';
const ORDERS_STORAGE_KEY = 'ga_collection_orders_v4';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Clear any outdated cache versions on startup
  useEffect(() => {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('ga_collection_products_') || key.startsWith('pink_aura_')) && key !== PRODUCTS_STORAGE_KEY) {
          localStorage.removeItem(key);
        }
      }
    } catch {}
  }, []);

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const filtered = Array.isArray(parsed) 
          ? parsed.filter((p: Product) => 
              p.id !== 'pa-prod-05' && 
              p.id !== 'pa-prod-09' && 
              !p.images.some(img => !img || img.includes('1566150902887-9679ec15dcb5'))
            )
          : INITIAL_PRODUCTS;
        return filtered.length > 0 ? filtered : INITIAL_PRODUCTS;
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const openProductModal = (product: Product) => setModalProduct(product);
  const closeProductModal = () => setModalProduct(null);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Sample initial order for admin view
      return [
        {
          id: 'ord-sample-1',
          orderNumber: 'GA-2026-9281',
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
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          estimatedDelivery: 'Tomorrow by 4:00 PM'
        },
        {
          id: 'ord-sample-2',
          orderNumber: 'GA-2026-9282',
          customerName: 'Yaa Asantewaa Mensah',
          customerPhone: '0501987654',
          customerEmail: 'yaa.mensah@outlook.com',
          region: 'Ashanti',
          city: 'Kumasi Central',
          deliveryAddress: 'Plot 28, Ridge Residential Area',
          items: [
            {
              productId: 'pa-prod-06',
              productName: 'Monarque Exotic Kelly Top-Handle',
              price: 2650,
              quantity: 1,
              selectedColor: 'Fuchsia Royale',
              image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80'
            }
          ],
          subtotal: 2650,
          deliveryFee: 50,
          total: 2700,
          paymentMethod: 'Paystack USSD (Telecel Cash)',
          paymentStatus: 'paid',
          orderStatus: 'shipped',
          paystackReference: 'PSTK_USSD_8831902',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          estimatedDelivery: 'In transit'
        }
      ];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  // Optionally fetch from backend API if running
  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const cleanData = data.filter((p: Product) => 
              p.id !== 'pa-prod-05' && 
              p.id !== 'pa-prod-09' && 
              !p.images.some(img => !img || img.includes('1566150902887-9679ec15dcb5'))
            );
            if (cleanData.length >= INITIAL_PRODUCTS.length) {
              setProducts(cleanData);
            }
          }
        }
      } catch {
        // Fallback to local state is completely seamless
      }
    };
    fetchApiProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct: Product = {
      ...productData,
      id: `pa-prod-${Date.now()}`,
    };

    setProducts((prev) => [newProduct, ...prev]);

    // Async backend update
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
    } catch {
      // Local state already updated
    }

    return newProduct;
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
    let updatedProduct: Product | undefined;

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedProduct = { ...item, ...updates };
          return updatedProduct;
        }
        return item;
      })
    );

    try {
      await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch {
      // local state updated
    }

    if (!updatedProduct) throw new Error('Product not found');
    return updatedProduct;
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
    } catch {
      // local state updated
    }
    return true;
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug || p.id === slug);
  };

  const createOrder = async (
    orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'orderStatus' | 'paymentStatus'>
  ): Promise<Order> => {
    const orderNum = `GA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      orderStatus: 'pending',
      paymentStatus: 'pending',
      estimatedDelivery: 'Within 24–48 hours',
    };

    setOrders((prev) => [newOrder, ...prev]);

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch {
      // local state updated
    }

    return newOrder;
  };

  const updateOrderStatus = async (
    orderId: string,
    orderStatus: OrderStatus,
    paymentStatus?: PaymentStatus
  ): Promise<Order> => {
    let updatedOrder: Order | undefined;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId || ord.orderNumber === orderId) {
          updatedOrder = {
            ...ord,
            orderStatus,
            paymentStatus: paymentStatus || ord.paymentStatus,
          };

          // If payment became paid, automatically update product stocks safely
          if (paymentStatus === 'paid' && ord.paymentStatus !== 'paid') {
            ord.items.forEach((item) => {
              setProducts((prods) =>
                prods.map((prod) =>
                  prod.id === item.productId
                    ? { ...prod, stock: Math.max(0, prod.stock - item.quantity) }
                    : prod
                )
              );
            });
          }

          return updatedOrder;
        }
        return ord;
      })
    );

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus, paymentStatus })
      });
    } catch {
      // local state updated
    }

    if (!updatedOrder) throw new Error('Order not found');
    return updatedOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId);
  };

  const getOrderByNumber = (orderNumber: string) => {
    return orders.find((o) => o.orderNumber === orderNumber);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductBySlug,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByNumber,
        modalProduct,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
