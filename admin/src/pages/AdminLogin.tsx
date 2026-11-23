import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error } = useAdminAuth();

  const [email, setEmail] = useState('admin@pinkaura.com');
  const [password, setPassword] = useState('pinkaura2026');
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleUseDemo = () => {
    setEmail('admin@pinkaura.com');
    setPassword('pinkaura2026');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-[#362734] to-[#1e171f] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-brand-border/40 overflow-hidden animate-fade-in">
        {/* Brand Header */}
        <div className="p-8 text-center bg-brand-bg/50 border-b border-brand-border/40 space-y-2">
          <img
            src="/logo.png"
            alt="G&A Collection"
            className="w-16 h-16 mx-auto rounded-2xl object-cover border border-brand-border/80 shadow-md"
          />
          <h1 className="font-serif text-2xl font-bold text-brand-charcoal uppercase tracking-widest">
            G&A Collection
          </h1>
          <p className="text-xs font-semibold text-brand-accent tracking-wider uppercase">
            Women’s Luxury Bags • Admin Portal
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-charcoal">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pinkaura.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-brand-charcoal">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-brand-charcoal hover:bg-brand-accent text-white font-semibold text-xs tracking-wider uppercase transition shadow-md flex items-center justify-center gap-2 group"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Quick Demo Fill */}
          <div className="p-4 rounded-2xl bg-brand-bg-subtle border border-brand-border/60 text-xs text-brand-charcoal space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[11px] uppercase tracking-wider text-brand-muted">
                Demo Administrator Credentials
              </span>
              <button
                type="button"
                onClick={handleUseDemo}
                className="text-[10px] text-brand-accent font-bold hover:underline"
              >
                Auto Fill
              </button>
            </div>
            <p className="text-[11px] text-brand-muted font-mono">
              Email: admin@pinkaura.com <br />
              Pass: pinkaura2026
            </p>
          </div>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-brand-muted hover:text-brand-charcoal transition">
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
