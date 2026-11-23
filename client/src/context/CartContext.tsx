import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductColor } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: ProductColor, openDrawer?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  getItemInCart: (productId: string) => CartItem | undefined;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  promoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  finalTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ga_collection_cart_v1';
const PROMO_STORAGE_KEY = 'ga_collection_promo_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (promoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, promoCode);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist promo', e);
    }
  }, [promoCode]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: ProductColor, openDrawer = true) => {
    const color = selectedColor || product.colors[0] || { name: 'Standard', hex: '#BE123C' };
    const cartItemId = `${product.id}-${color.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, quantity, selectedColor: color }];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const getItemInCart = (productId: string) => {
    return cart.find((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: string) => {
    const matching = cart.filter((item) => item.product.id === productId);
    return matching.reduce((sum, item) => sum + item.quantity, 0);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const maxStock = item.product.stock || 99;
          return { ...item, quantity: Math.min(maxStock, quantity) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Calculate promo discount
  let discountAmount = 0;
  if (promoCode) {
    const cleanCode = promoCode.toUpperCase().trim();
    if (cleanCode === 'GA50') {
      discountAmount = Math.min(50, subtotal);
    } else if (cleanCode === 'WELCOME10') {
      discountAmount = Math.round(subtotal * 0.1);
    } else if (cleanCode === 'ELEGANCE') {
      discountAmount = subtotal >= 1000 ? 100 : 0;
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const applyPromoCode = (code: string) => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'GA50') {
      setPromoCode('GA50');
      return { success: true, message: 'GH₵ 50 discount voucher applied successfully!' };
    }
    if (cleanCode === 'WELCOME10') {
      setPromoCode('WELCOME10');
      return { success: true, message: '10% Welcome discount applied successfully!' };
    }
    if (cleanCode === 'ELEGANCE') {
      if (subtotal < 1000) {
        return { success: false, message: 'Promo code ELEGANCE requires a minimum order of GH₵ 1,000.' };
      }
      setPromoCode('ELEGANCE');
      return { success: true, message: 'GH₵ 100 VIP discount applied successfully!' };
    }
    return { success: false, message: 'Invalid promo code. Try GA50 or WELCOME10.' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        getItemInCart,
        totalItems,
        subtotal,
        discountAmount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        finalTotal,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
