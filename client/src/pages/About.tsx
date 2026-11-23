import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, Shield, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-20 pb-24">
      {/* Editorial Hero */}
      <section className="relative bg-brand-bg-subtle py-20 border-b border-brand-border/40">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-pink">
            Women's Luxury Bags • Accra, Ghana
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-gray-900 leading-tight">
            The G&A Collection Story
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Crafting beautiful leather bags designed to empower modern women with confidence, grace, and everyday elegance.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-brand-charcoal leading-relaxed">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
              Our Heritage & Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Where Parisian Precision Meets West African Vibrance
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              G&A Collection was born from a singular passion: creating handbags that celebrate modern feminine elegance. Founded in Accra, Ghana, our collection unites durable leather craftsmanship with the warmth, vitality, and refined taste of contemporary women.
            </p>
            <p className="text-sm text-brand-muted leading-relaxed">
              Every curve, twist-lock, and hand-painted edge is executed with surgical precision. We source exclusively from certified European and African tanneries committed to ethical tanning practices and flawless grain uniformity.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-brand-border/40">
              <div>
                <p className="font-serif text-3xl font-bold text-brand-charcoal">34+</p>
                <p className="text-xs text-brand-muted">Hours to craft each luxury silhouette</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-brand-charcoal">100%</p>
                <p className="text-xs text-brand-muted">Full-grain leather with 24K gold accents</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan leathercraft"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white py-16 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              The Aura Standards
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-charcoal">
              Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-brand-bg/50 border border-brand-border/60 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-soft/40 flex items-center justify-center text-brand-accent">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">Sculptural Femininity</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Balancing structured architectural lines with delicate blush tones and sensual textures to complement both power dressing and gala evenings.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-brand-bg/50 border border-brand-border/60 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-soft/40 flex items-center justify-center text-brand-accent">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">Uncompromising Quality</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Hand-rubbed lacquer edges, heavy jewelry-grade gold hardware, and supple microfiber suede interiors designed to endure for decades.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-brand-bg/50 border border-brand-border/60 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-soft/40 flex items-center justify-center text-brand-accent">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-charcoal">Seamless Experience</h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Frictionless guest purchasing, instant Paystack USSD on Ghanaian networks, and door-to-door courier service with signature delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-brand-charcoal">
          Begin Your Aura Journey
        </h2>
        <p className="text-sm text-brand-muted max-w-lg mx-auto">
          Explore our hallmark collection and find the handbag that tells your story.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-charcoal hover:bg-brand-accent text-white font-semibold text-xs tracking-wider uppercase transition shadow-lg"
        >
          <span>Explore Boutique</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
