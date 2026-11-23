import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Refine, Authenticated } from '@refinedev/core';
import { authProvider } from './refine/authProvider';
import { dataProvider } from './refine/dataProvider';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProductProvider } from './context/ProductContext';
import { AdminLayout } from './pages/AdminLayout';
import { AdminOverview } from './pages/AdminOverview';
import { AdminProducts } from './pages/AdminProducts';
import { AdminOrders } from './pages/AdminOrders';
import { AdminCustomers } from './pages/AdminCustomers';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminLogin } from './pages/AdminLogin';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { Package, ShoppingBag, Users, BarChart3, LayoutDashboard } from 'lucide-react';

export function App() {
  return (
    <Refine
      authProvider={authProvider}
      dataProvider={dataProvider}
      resources={[
        {
          name: 'overview',
          list: '/',
          meta: { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        },
        {
          name: 'products',
          list: '/products',
          create: '/products/new',
          edit: '/products/:id/edit',
          meta: { label: 'Products & Bags', icon: <Package className="w-5 h-5" /> },
        },
        {
          name: 'orders',
          list: '/orders',
          show: '/orders/:id',
          meta: { label: 'Orders & Payments', icon: <ShoppingBag className="w-5 h-5" /> },
        },
        {
          name: 'customers',
          list: '/customers',
          meta: { label: 'Customer Directory', icon: <Users className="w-5 h-5" /> },
        },
        {
          name: 'analytics',
          list: '/analytics',
          meta: { label: 'Revenue Analytics', icon: <BarChart3 className="w-5 h-5" /> },
        },
      ]}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: false,
      }}
    >
      <AdminAuthProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<AdminLogin />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminOverview />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="analytics" element={<AdminAnalytics />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </AdminAuthProvider>
    </Refine>
  );
}

export default App;
