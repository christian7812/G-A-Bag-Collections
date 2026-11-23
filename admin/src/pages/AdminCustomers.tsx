import React, { useState } from 'react';
import { Search, Users, Phone, MapPin, DollarSign, ShoppingBag } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export const AdminCustomers: React.FC = () => {
  const { orders } = useProducts();
  const [search, setSearch] = useState('');

  // Group unique customers by phone number
  const customerMap = new Map<string, {
    name: string;
    phone: string;
    email?: string;
    region: string;
    city: string;
    address: string;
    orderCount: number;
    totalSpent: number;
    latestOrderDate: string;
  }>();

  orders.forEach((ord) => {
    const key = ord.customerPhone;
    const existing = customerMap.get(key);
    if (existing) {
      existing.orderCount += 1;
      if (ord.paymentStatus === 'paid') {
        existing.totalSpent += ord.total;
      }
    } else {
      customerMap.set(key, {
        name: ord.customerName,
        phone: ord.customerPhone,
        email: ord.customerEmail,
        region: ord.region,
        city: ord.city,
        address: ord.deliveryAddress,
        orderCount: 1,
        totalSpent: ord.paymentStatus === 'paid' ? ord.total : 0,
        latestOrderDate: ord.createdAt,
      });
    }
  });

  const customers = Array.from(customerMap.values());

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-brand-border/60 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
            Customer Directory
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            Profiles generated dynamically from guest checkout purchases and Paystack transaction records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-bg border border-brand-border text-brand-charcoal">
            Total Unique Clients: <strong>{customers.length}</strong>
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border/60 shadow-soft">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, mobile phone, or city..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-border bg-brand-bg/40 text-xs text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-brand-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-bg/50 text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border/40">
              <tr>
                <th className="py-3.5 px-6">Customer Name</th>
                <th className="py-3.5 px-6">Contact Phone & Email</th>
                <th className="py-3.5 px-6">Delivery Address</th>
                <th className="py-3.5 px-6">Total Orders</th>
                <th className="py-3.5 px-6">Lifetime Spend (GH₵)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 text-brand-charcoal">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-brand-muted text-xs">
                    No customers match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((client, idx) => (
                  <tr key={idx} className="hover:bg-brand-bg/30 transition">
                    <td className="py-4 px-6 font-bold text-sm">
                      {client.name}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-brand-charcoal flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-brand-accent" />
                        <span>{client.phone}</span>
                      </p>
                      {client.email && (
                        <p className="text-[11px] text-brand-muted">{client.email}</p>
                      )}
                    </td>
                    <td className="py-4 px-6 text-brand-muted">
                      <p className="font-medium text-brand-charcoal">{client.address}</p>
                      <p className="text-[11px]">{client.city}, {client.region}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-brand-bg border border-brand-border font-bold">
                        {client.orderCount} order{client.orderCount > 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-serif font-bold text-sm text-brand-accent">
                      GH₵ {client.totalSpent.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
