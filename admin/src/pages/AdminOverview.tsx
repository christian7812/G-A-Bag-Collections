import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Package, 
  ArrowRight, 
  TrendingUp,
  Plus
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';

export const AdminOverview: React.FC = () => {
  const { products, orders } = useProducts();

  // Metrics calculation
  const totalSales = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === 'pending' || o.paymentStatus === 'pending').length;
  const completedOrders = orders.filter((o) => o.orderStatus === 'delivered' || (o.paymentStatus === 'paid' && o.orderStatus === 'shipped')).length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const recentOrders = [...orders].reverse().slice(0, 5);

  const stats = [
    {
      title: 'Total Revenue',
      value: `GH₵ ${totalSales.toLocaleString()}`,
      subtitle: 'Verified Paystack payments',
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      subtitle: `${completedOrders} completed`,
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      subtitle: 'Awaiting fulfillment/approval',
      icon: Clock,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Total Products',
      value: totalProducts,
      subtitle: `${lowStockProducts.length} low stock alerts`,
      icon: Package,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border/60 shadow-soft">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
            Overview Telemetry
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            Real-time performance metrics for Pink Aura Ghana.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2.5 rounded-full bg-brand-charcoal hover:bg-brand-accent text-white text-xs font-semibold tracking-wider uppercase transition shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 rounded-full bg-brand-bg hover:bg-brand-soft/40 border border-brand-border text-brand-charcoal text-xs font-semibold tracking-wider uppercase transition"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`p-6 rounded-3xl border shadow-soft bg-white flex flex-col justify-between space-y-4`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-2xl border ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-brand-charcoal">
                  {stat.value}
                </p>
                <p className="text-xs text-brand-muted mt-1">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Low Stock Alerts (if any) */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-amber-900 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Low-Stock Inventory Warnings ({lowStockProducts.length} items)</span>
            </div>
            <Link to="/admin/products" className="text-xs font-bold text-amber-800 hover:underline">
              Replenish Inventory →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-brand-charcoal truncate max-w-[180px]">{p.name}</span>
                <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{p.stock} units left</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-brand-border/60 shadow-soft overflow-hidden">
        <div className="p-6 border-b border-brand-border/60 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-charcoal">Recent Customer Orders</h3>
            <p className="text-xs text-brand-muted">Latest purchases through guest checkout</p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-brand-accent hover:text-brand-accent-dark flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-bg/50 text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border/40">
              <tr>
                <th className="py-3 px-6">Order</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Destination</th>
                <th className="py-3 px-6">Total (GH₵)</th>
                <th className="py-3 px-6">Payment</th>
                <th className="py-3 px-6">Order Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 text-brand-charcoal font-medium">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-brand-bg/30 transition">
                  <td className="py-4 px-6 font-mono font-bold text-brand-charcoal">{ord.orderNumber}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold">{ord.customerName}</p>
                    <p className="text-[11px] text-brand-muted">{ord.customerPhone}</p>
                  </td>
                  <td className="py-4 px-6 text-brand-muted">
                    {ord.city}, {ord.region}
                  </td>
                  <td className="py-4 px-6 font-serif font-bold text-brand-charcoal">
                    GH₵ {ord.total.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      ord.paymentStatus === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.paymentStatus === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="capitalize text-xs font-semibold text-brand-charcoal bg-brand-bg px-2.5 py-1 rounded-full border border-brand-border/60">
                      {ord.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
