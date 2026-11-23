import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  AlertCircle, 
  Image, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { Product, Category } from '../types';
import { CATEGORIES } from '../data/mockData';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Handbags');
  const [price, setPrice] = useState<number>(1200);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(10);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('100% Genuine Italian Calf Leather');
  const [dimensions, setDimensions] = useState('26cm x 16cm x 8cm');
  const [colorsText, setColorsText] = useState('Blush Pink:#F8BBD0, Pure White:#FFFFFF, Noir Black:#292329');

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setName('');
    setCategory('Handbags');
    setPrice(1200);
    setOriginalPrice(undefined);
    setStock(12);
    setImageUrl('https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80');
    setDescription('Handcrafted luxury women’s handbag with brushed rose-gold hardware and protective microfiber suede lining.');
    setMaterial('100% Genuine Italian Calf Leather');
    setDimensions('26cm x 16cm x 8cm');
    setColorsText('Blush Pink:#F8BBD0, Pure White:#FFFFFF');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setIsEditing(true);
    setCurrentEditId(p.id);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setStock(p.stock);
    setImageUrl(p.images[0] || '');
    setDescription(p.description);
    setMaterial(p.material);
    setDimensions(p.dimensions);
    setColorsText(p.colors.map((c) => `${c.name}:${c.hex}`).join(', '));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Parse colors
    const colors = colorsText.split(',').map((part) => {
      const [colName, hex] = part.split(':').map((s) => s.trim());
      return {
        name: colName || 'Standard',
        hex: hex && hex.startsWith('#') ? hex : '#F8BBD0',
      };
    });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (isEditing && currentEditId) {
      await updateProduct(currentEditId, {
        name,
        slug,
        category,
        price,
        originalPrice: originalPrice || undefined,
        stock,
        images: [imageUrl],
        description,
        material,
        dimensions,
        colors,
      });
    } else {
      await addProduct({
        name,
        slug,
        category,
        price,
        originalPrice: originalPrice || undefined,
        stock,
        images: [imageUrl],
        colors,
        rating: 5.0,
        reviewCount: 1,
        description,
        material,
        dimensions,
        features: ['Signature monogram hardware', 'Complimentary dust bag'],
        isNewArrival: true,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (window.confirm(`Are you sure you want to remove "${prodName}" from the boutique?`)) {
      await deleteProduct(id);
    }
  };

  // Filter products
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-brand-border/60 shadow-soft">
        <div>
          <h2 className="font-serif text-2xl font-bold text-brand-charcoal">
            Product Management
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            Add new silhouettes, adjust prices in GH₵, manage inventory stock, and curate categories.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-full bg-brand-charcoal hover:bg-brand-accent text-white text-xs font-semibold tracking-wider uppercase transition shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Handbag</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border/60 shadow-soft flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-border bg-brand-bg/40 text-xs text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-brand-muted whitespace-nowrap">Category:</span>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-brand-bg border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-charcoal focus:outline-none focus:border-brand-accent cursor-pointer"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-brand-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-bg/50 text-brand-muted uppercase tracking-wider text-[10px] border-b border-brand-border/40">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price (GH₵)</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6">Colours</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 text-brand-charcoal">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-brand-bg/30 transition">
                  {/* Thumbnail & Title */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-14 object-cover rounded-xl border border-brand-border/60 shrink-0"
                      />
                      <div>
                        <p className="font-serif font-bold text-sm text-brand-charcoal line-clamp-1">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-brand-muted line-clamp-1">{prod.material}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full bg-brand-bg text-brand-charcoal border border-brand-border text-[11px] font-semibold">
                      {prod.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 font-serif font-bold text-sm">
                    GH₵ {prod.price.toLocaleString()}
                    {prod.originalPrice && (
                      <span className="block text-[10px] text-brand-muted line-through font-normal">
                        GH₵ {prod.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      prod.stock > 5
                        ? 'bg-emerald-100 text-emerald-800'
                        : prod.stock > 0
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {prod.stock} units
                    </span>
                  </td>

                  {/* Colours */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      {prod.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-gray-300"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(prod)}
                        className="p-2 rounded-lg bg-brand-bg hover:bg-brand-soft/40 text-brand-charcoal transition"
                        title="Edit product"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden animate-fade-in my-8">
            <div className="p-6 bg-brand-charcoal text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold">
                  {isEditing ? 'Edit Handbag Details' : 'Add New Handbag Silhouette'}
                </h3>
                <p className="text-xs text-white/70">
                  Update customer-facing details, price, and inventory in real time.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Handbag Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. The Royale Quilted Satchel"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                {/* Price */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Price (GH₵)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                {/* Original Price */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Original Price (GH₵ for discount badge)</label>
                  <input
                    type="number"
                    min={0}
                    value={originalPrice || ''}
                    onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                {/* Image URL (with Cloudinary / CDN support) */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Product Photography URL</label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or Cloudinary URL"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                {/* Material & Dimensions */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Material</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Dimensions</label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                {/* Colours text */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">
                    Colour Swatches (Format: Name:HexCode, ...)
                  </label>
                  <input
                    type="text"
                    value={colorsText}
                    onChange={(e) => setColorsText(e.target.value)}
                    placeholder="Blush Rose:#F8BBD0, Noir:#292329"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-brand-charcoal">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-brand-bg/40 text-xs sm:text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent transition resize-none"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-brand-border text-xs font-semibold text-brand-muted hover:text-brand-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-brand-charcoal hover:bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider transition shadow-md"
                >
                  {isEditing ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
