import { DataProvider } from '@refinedev/core';
import { INITIAL_PRODUCTS } from '../data/mockData';

const PRODUCTS_KEY = 'ga_admin_products_v1';
const ORDERS_KEY = 'ga_admin_orders_v1';

const SAMPLE_ORDERS = [
  {
    id: 'ord-sample-1',
    orderNumber: 'PA-2026-9281',
    customerName: 'Akosua Darko',
    customerPhone: '0244123456',
    customerEmail: 'akosua.darko@gmail.com',
    deliveryRegion: 'Greater Accra',
    deliveryCity: 'Airport Residential',
    deliveryAddress: 'House 14, 5th Circular Rd',
    total: 1450,
    orderStatus: 'paid',
    paymentStatus: 'paid',
    createdAt: new Date().toISOString(),
    items: [
      {
        id: 'item-1',
        productName: 'The Sovereign Quilted Flap Bag',
        price: 1450,
        quantity: 1,
      },
    ],
  },
  {
    id: 'ord-sample-2',
    orderNumber: 'PA-2026-8842',
    customerName: 'Esi Mansa',
    customerPhone: '0501234567',
    customerEmail: 'esi.mansa@outlook.com',
    deliveryRegion: 'Ashanti',
    deliveryCity: 'Kumasi Central',
    deliveryAddress: 'Plot 22, Ahodwo Hill',
    total: 1850,
    orderStatus: 'processing',
    paymentStatus: 'paid',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 'item-2',
        productName: 'Palais Structured Croc Tote',
        price: 1850,
        quantity: 1,
      },
    ],
  },
];

// Seed local store if empty
const getLocalProducts = () => {
  const raw = localStorage.getItem(PRODUCTS_KEY);
  if (!raw) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_PRODUCTS;
  }
};

const getLocalOrders = () => {
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(SAMPLE_ORDERS));
    return SAMPLE_ORDERS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SAMPLE_ORDERS;
  }
};

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters }) => {
    try {
      // Attempt backend API first
      const res = await fetch(`http://localhost:5000/api/${resource}`);
      if (res.ok) {
        const data = await res.json();
        return {
          data,
          total: data.length,
        };
      }
    } catch {
      // Fallback to seeded client state
    }

    if (resource === 'products') {
      const data = getLocalProducts();
      return { data, total: data.length };
    }

    if (resource === 'orders') {
      const data = getLocalOrders();
      return { data, total: data.length };
    }

    if (resource === 'customers') {
      const orders = getLocalOrders();
      const map = new Map();
      orders.forEach((o: any) => {
        if (!map.has(o.customerPhone)) {
          map.set(o.customerPhone, {
            id: o.customerPhone,
            name: o.customerName,
            phone: o.customerPhone,
            email: o.customerEmail || 'N/A',
            region: o.deliveryRegion,
            city: o.deliveryCity,
            ordersCount: 1,
            totalSpent: o.total,
          });
        } else {
          const c = map.get(o.customerPhone);
          c.ordersCount += 1;
          c.totalSpent += o.total;
        }
      });
      const data = Array.from(map.values());
      return { data, total: data.length };
    }

    return { data: [], total: 0 };
  },

  getOne: async ({ resource, id }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${resource}/${id}`);
      if (res.ok) {
        const data = await res.json();
        return { data };
      }
    } catch {
      // fallback
    }

    const items = resource === 'products' ? getLocalProducts() : getLocalOrders();
    const item = items.find((i: any) => String(i.id) === String(id) || i.slug === String(id));
    return { data: item || null };
  },

  create: async ({ resource, variables }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${resource}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });
      if (res.ok) {
        const data = await res.json();
        return { data };
      }
    } catch {
      // fallback
    }

    const items = resource === 'products' ? getLocalProducts() : getLocalOrders();
    const newItem = {
      ...(variables as any),
      id: (variables as any).id || `item-${Date.now()}`,
    };
    const updated = [newItem, ...items];
    localStorage.setItem(resource === 'products' ? PRODUCTS_KEY : ORDERS_KEY, JSON.stringify(updated));
    return { data: newItem };
  },

  update: async ({ resource, id, variables }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${resource}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });
      if (res.ok) {
        const data = await res.json();
        return { data };
      }
    } catch {
      // fallback
    }

    const items = resource === 'products' ? getLocalProducts() : getLocalOrders();
    const updated = items.map((i: any) => (String(i.id) === String(id) ? { ...i, ...(variables as any) } : i));
    localStorage.setItem(resource === 'products' ? PRODUCTS_KEY : ORDERS_KEY, JSON.stringify(updated));
    const current = updated.find((i: any) => String(i.id) === String(id));
    return { data: current };
  },

  deleteOne: async ({ resource, id }) => {
    try {
      await fetch(`http://localhost:5000/api/${resource}/${id}`, {
        method: 'DELETE',
      });
    } catch {
      // fallback
    }

    const items = resource === 'products' ? getLocalProducts() : getLocalOrders();
    const updated = items.filter((i: any) => String(i.id) !== String(id));
    localStorage.setItem(resource === 'products' ? PRODUCTS_KEY : ORDERS_KEY, JSON.stringify(updated));
    return { data: { id } as any };
  },

  getApiUrl: () => 'http://localhost:5000/api',
};
