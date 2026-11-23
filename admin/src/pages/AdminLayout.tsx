import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart3, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useProducts } from '../context/ProductContext';

export const AdminLayout: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const { orders } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending' || o.paymentStatus === 'pending').length;

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', path: '/admin/products', icon: ShoppingBag },
    { name: 'Orders Management', path: '/admin/orders', icon: Package, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { name: 'Customer Directory', path: '/admin/customers', icon: Users },
    { name: 'Sales Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FDF9FB] flex flex-col lg:flex-row text-brand-charcoal">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-brand-charcoal text-white p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-serif font-bold text-lg tracking-wider">PINK AURA</span>
          <span className="text-[10px] bg-brand-soft/20 text-brand-soft px-2 py-0.5 rounded-full font-mono">ADMIN</span>
        </div>
        <Link to="/" target="_blank" className="text-xs text-white/80 hover:text-white flex items-center gap-1">
          <span>Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-brand-charcoal text-white flex flex-col justify-between transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-8">
          {/* Brand Logo in Admin */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="G&A Collection"
              className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-sm"
            />
            <div>
              <h2 className="font-serif text-base font-bold tracking-wider">G&A COLLECTION</h2>
              <p className="text-[10px] tracking-widest text-brand-soft uppercase font-semibold">Store Console</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-brand-soft text-brand-charcoal font-bold shadow-md'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-brand-charcoal' : 'text-brand-soft'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-accent text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer profile & actions */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-soft/30 flex items-center justify-center font-bold text-xs text-brand-soft">
              PA
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{admin?.name || 'Administrator'}</p>
              <p className="text-[10px] text-white/50 truncate">{admin?.email || 'admin@pinkaura.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to="/"
              target="_blank"
              className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Store</span>
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium flex items-center justify-center gap-1 transition"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar for desktop */}
        <header className="hidden lg:flex items-center justify-between px-8 py-5 bg-white border-b border-brand-border/60">
          <div>
            <h1 className="font-serif text-xl font-bold text-brand-charcoal">
              Pink Aura Executive Dashboard
            </h1>
            <p className="text-xs text-brand-muted">
              Full control over products, customer orders, Paystack USSD logs, and store telemetry.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-bg border border-brand-border text-xs text-brand-charcoal">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Paystack USSD Gateway: <strong className="text-emerald-700">Active</strong></span>
            </div>
            <Link
              to="/"
              target="_blank"
              className="px-4 py-2 rounded-full bg-brand-charcoal text-white hover:bg-brand-accent text-xs font-semibold tracking-wider uppercase transition flex items-center gap-1.5"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Routed Admin Subpage */}
        <div className="p-4 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
