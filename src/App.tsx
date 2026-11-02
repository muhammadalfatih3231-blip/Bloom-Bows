/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Truck,
  ShieldCheck,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Search,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  Send,
  Phone,
  ArrowRight,
  Gift,
  CheckCircle2,
  SlidersHorizontal,
  Star,
  PackageCheck
} from 'lucide-react';

import { FLOWER_PRODUCTS } from './data/products';
import { FlowerProduct, CartItem, ProductVariantSize, GreetingCardData } from './types/flower';

import sizeStandardImg from './assets/images/size_standard_bouquet_1793456300745.jpg';
import sizeDeluxeImg from './assets/images/size_deluxe_bouquet_1793456301033.jpg';
import sizeRoyaleImg from './assets/images/size_grande_royale_1793456300860.jpg';

const SIZE_ILLUSTRATIONS: Record<string, { image: string; tag: string; stems: string; highlight?: string; subtitle: string }> = {
  classic: {
    image: sizeStandardImg,
    tag: 'Standar',
    stems: '10–12 Tangkai',
    subtitle: 'Proporsional & Anggun'
  },
  deluxe: {
    image: sizeDeluxeImg,
    tag: 'Deluxe',
    stems: '20–25 Tangkai',
    highlight: 'Paling Diminati',
    subtitle: 'Rangkaian Padat & Rimbun'
  },
  royale: {
    image: sizeRoyaleImg,
    tag: 'Grand Royale',
    stems: '40–50 Tangkai',
    highlight: 'Eksklusif',
    subtitle: 'Ekstra Megah & Mewah'
  }
};

export default function App() {
  // Navigation & Category Filters
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'populer' | 'termurah' | 'termahal'>('populer');
  
  // Cart & Customizer State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(null);
  
  // Modal Customizer State
  const [modalSize, setModalSize] = useState<ProductVariantSize | null>(null);
  const [modalRibbon, setModalRibbon] = useState<string>('Rose Velvet');
  const [modalAddVase, setModalAddVase] = useState<boolean>(false);
  const [modalCard, setModalCard] = useState<GreetingCardData>({
    recipient: '',
    sender: '',
    occasion: 'Ulang Tahun & Romantis',
    message: ''
  });

  // Home Checkout Form State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [promoFeedback, setPromoFeedback] = useState<string>('');
  
  // Customer & Delivery Address Form
  const [customerName, setCustomerName] = useState<string>('Raya Aritonang');
  const [customerPhone, setCustomerPhone] = useState<string>('081234567890');
  const [recipientName, setRecipientName] = useState<string>('Clara Salsabila');
  const [recipientPhone, setRecipientPhone] = useState<string>('081987654321');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan');
  const [deliveryDate, setDeliveryDate] = useState<string>('2026-10-27');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>('Instant Same-Day (2-3 Jam Tiba)');
  const [deliveryNotes, setDeliveryNotes] = useState<string>('Tolong titipkan di resepsionis lobi, jangan hubungi penerima karena kejutan.');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bca' | 'mandiri' | 'cod'>('qris');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  // Filtered Products (Exactly 20 flower products)
  const filteredProducts = useMemo(() => {
    return FLOWER_PRODUCTS.filter(product => {
      const matchCategory = activeCategory === 'all' || product.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        product.name.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.tags.some(t => t.toLowerCase().includes(q)) ||
        product.flowersIncluded.some(f => f.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'termurah') return a.price - b.price;
      if (sortBy === 'termahal') return b.price - a.price;
      return b.rating - a.rating;
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Open Product Customization Modal
  const handleOpenProduct = (product: FlowerProduct) => {
    setSelectedProduct(product);
    setModalSize(product.sizes[0] || null);
    setModalRibbon(product.ribbonColors[0] || 'Rose Velvet');
    setModalAddVase(false);
    setModalCard({
      recipient: '',
      sender: '',
      occasion: 'Ulang Tahun & Romantis',
      message: ''
    });
  };

  // Add customized flower product to Cart
  const handleAddToCart = () => {
    if (!selectedProduct || !modalSize) return;

    const supportsVase = selectedProduct.category === 'buket' && !selectedProduct.name.toLowerCase().includes('vase');
    const isVaseAdded = supportsVase && modalAddVase;
    const vasePrice = isVaseAdded ? 75000 : 0;
    const unitPrice = Math.round(selectedProduct.price * modalSize.priceMultiplier) + vasePrice;
    const cartItemId = `${selectedProduct.id}-${modalSize.id}-${modalRibbon}-${isVaseAdded ? 'vase' : 'novase'}`;

    setCartItems(prev => {
      const existing = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existing > -1) {
        const next = [...prev];
        next[existing].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          cartItemId,
          product: selectedProduct,
          quantity: 1,
          selectedSize: modalSize,
          selectedRibbon: modalRibbon,
          addVase: isVaseAdded,
          vasePrice,
          greetingCard: modalCard,
          unitPrice
        }
      ];
    });

    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, change: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Calculations
  const subtotalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  }, [cartItems]);

  const freeShippingThreshold = 350000;
  const shippingFee = subtotalPrice >= freeShippingThreshold || subtotalPrice === 0 ? 0 : 35000;
  const totalPrice = Math.max(0, subtotalPrice - discountAmount + (subtotalPrice > 0 ? shippingFee : 0));
  
  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Apply Coupon
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'BLOOM10' || code === 'BUNGASEGAR') {
      const disc = Math.round(subtotalPrice * 0.1);
      setDiscountAmount(disc);
      setPromoFeedback('Kupon aktif! Anda hemat 10% untuk pesanan bunga segar.');
    } else if (code === 'BLOOMBOWS') {
      setDiscountAmount(50000);
      setPromoFeedback('Kupon selamat datang Rp 50.000 berhasil diterapkan.');
    } else {
      setDiscountAmount(0);
      setPromoFeedback('Kode kupon tidak valid atau telah kedaluwarsa.');
    }
  };

  // Confirm Order
  const handleCompleteOrder = () => {
    const newId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(newId);
    setCheckoutStep(4);
  };

  // IDR Currency Formatter
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] flex flex-col font-sans selection:bg-[#ffe4e6] selection:text-[#881337]">
      
      {/* Top Banner Notice: Free Delivery & Freshness Guarantee */}
      <div className="bg-[#1c1917] text-stone-200 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-stone-100">Bloom&amp;Bows:</span>
            <span className="text-stone-300">Pesan bunga segar dari rumah · Bebas Ongkir minimum belanja Rp 350.000</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-stone-400 text-xs">
            <span>Garansi Segar 48 Jam</span>
            <span aria-hidden="true">·</span>
            <span>Same-Day Delivery 2-3 Jam</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">Layanan Buka Setiap Hari (08.00 - 21.00)</span>
          </div>
        </div>
      </div>

      {/* Main Header / Top Navigation (The 3-Zone Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="group flex flex-col cursor-pointer">
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-rose-900 transition-colors whitespace-nowrap">
                Bloom&amp;Bows
              </span>
              <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-600 -mt-0.5">
                Florist &amp; Home Delivery Atelier
              </span>
            </a>
          </div>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-stone-600">
            <a
              href="#katalog"
              className="hover:text-rose-900 transition-colors whitespace-nowrap"
            >
              Koleksi 20 Bunga
            </a>
            <a
              href="#pengiriman"
              className="hover:text-rose-900 transition-colors whitespace-nowrap"
            >
              Pesan Dari Rumah
            </a>
            <a
              href="#keunggulan"
              className="hover:text-rose-900 transition-colors whitespace-nowrap"
            >
              Garansi Kesegaran
            </a>
            <a
              href="#testimoni"
              className="hover:text-rose-900 transition-colors whitespace-nowrap"
            >
              Ulasan Pelanggan
            </a>
          </nav>

          {/* Zone 3: Shopping Cart & Direct WhatsApp Consultation */}
          <div className="flex items-center gap-3 shrink-0">
            {/* WhatsApp Direct Consult Button */}
            <a
              href="https://wa.me/6285880518624?text=Halo%20Bloom%26Bows%20Atelier,%20saya%20ingin%20konsultasi%20pemesanan%20bunga%20dari%20rumah."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
              title="Konsultasi Florist via WhatsApp (0858-8051-8624)"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Konsultasi WA</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-rose-900 hover:bg-rose-800 active:scale-98 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              title="Buka Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Keranjang</span>
              {totalItemsCount > 0 ? (
                <span className="bg-white text-rose-950 font-bold text-[11px] px-1.5 py-0.2 rounded-full min-w-5 text-center">
                  {totalItemsCount}
                </span>
              ) : (
                <span className="text-[11px] text-rose-200 hidden sm:inline">0</span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden bg-stone-900 text-white min-h-[380px] sm:min-h-[440px] flex items-center">
        <img
          src="/src/assets/images/hero_florist_atelier_1792996966261.jpg"
          alt="Bloom&Bows Flower Atelier"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/70 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-300 bg-rose-950/70 border border-rose-800/60 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Layanan Pemesanan Bunga dari Rumah · Bloom&amp;Bows</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Bunga Segar Berkualitas Mewah, Dikirim Langsung ke Pintu Rumah Anda
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Pilih dari 20 varian buket bunga segar, bloom box beludru mewah, rangkaian vas meja, hingga bunga papan &amp; standing flower. Lengkap dengan sistem keranjang belanja praktis, kustomisasi pita satin, kartu ucapan kaligrafi gratis, serta pengiriman same-day langsung ke rumah Anda.
            </p>

            {/* Quick Benefits Strip */}
            <div className="pt-2 flex flex-wrap gap-2.5 text-xs">
              <div className="px-3 py-1.5 bg-stone-800/80 backdrop-blur-xs border border-stone-700 rounded-lg flex items-center gap-1.5 text-stone-200">
                <Truck className="w-4 h-4 text-rose-400" />
                <span>Pengiriman Same-Day 2-3 Jam</span>
              </div>
              <div className="px-3 py-1.5 bg-stone-800/80 backdrop-blur-xs border border-stone-700 rounded-lg flex items-center gap-1.5 text-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garansi Kesegaran 48 Jam</span>
              </div>
              <div className="px-3 py-1.5 bg-stone-800/80 backdrop-blur-xs border border-stone-700 rounded-lg flex items-center gap-1.5 text-stone-200">
                <Gift className="w-4 h-4 text-amber-300" />
                <span>Gratis Kartu Ucapan Segel Lilin</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <a
                href="#katalog"
                className="px-6 py-3 bg-rose-800 hover:bg-rose-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lihat 20 Varian Bunga</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
              >
                Buka Keranjang ({totalItemsCount})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section id="katalog" className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 flex-1 space-y-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900 block">
              Katalog Lengkap Bloom&amp;Bows
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              20 Pilihan Varian Bunga Segar &amp; Hadiah Istimewa
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Setiap bunga dirangkai langsung oleh florist atelier dengan kemasan water-pack berpendingin.
            </p>
          </div>

          <div className="text-xs text-stone-500 font-medium shrink-0">
            Menampilkan: <strong className="text-stone-900">{filteredProducts.length}</strong> dari 20 produk
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Buttons */}
          <div className="flex items-center overflow-x-auto w-full lg:w-auto gap-1 bg-stone-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Semua (20)
            </button>
            <button
              onClick={() => setActiveCategory('buket')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'buket'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Buket Bunga (12)
            </button>
            <button
              onClick={() => setActiveCategory('box')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'box'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bloom Box (3)
            </button>
            <button
              onClick={() => setActiveCategory('papan')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'papan'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bunga Papan &amp; Standing (4)
            </button>
            <button
              onClick={() => setActiveCategory('meja')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'meja'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Vas Meja (1)
            </button>
          </div>

          {/* Search Input & Sort Selector */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Cari mawar, tulip, wisuda, duka..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-1 focus:ring-stone-400"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 cursor-pointer"
            >
              <option value="populer">Paling Populer</option>
              <option value="termurah">Harga: Rendah ke Tinggi</option>
              <option value="termahal">Harga: Tinggi ke Rendah</option>
            </select>
          </div>

        </div>

        {/* 20 Products Grid (Lead with imagery 65-75% height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Visual */}
              <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                  <span className="text-amber-500">★</span>
                  <span>{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400">({product.reviewCount})</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-2 text-[11px] font-medium text-stone-500">
                    <span className="text-rose-900 font-semibold">{product.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{product.flowersIncluded[0]}</span>
                  </div>

                  <h3 className="font-semibold text-stone-900 text-sm leading-snug group-hover:text-rose-950 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price Baseline & Customization Trigger */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="block font-bold text-base text-stone-900 tabular-nums">
                      {formatRupiah(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-stone-400 line-through tabular-nums">
                        {formatRupiah(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenProduct(product)}
                    className="px-3 py-2 text-xs font-semibold text-rose-900 bg-rose-50 hover:bg-rose-900 hover:text-white transition-all rounded-xl border border-rose-200 cursor-pointer flex items-center gap-1"
                  >
                    <span>Pilih Varian</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty Search Result Fallback */}
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
            <Sparkles className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="font-bold text-stone-800 text-base">Tidak ada varian bunga yang sesuai</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Silakan periksa kembali kata kunci Anda atau klik reset untuk melihat seluruh 20 koleksi bunga Bloom&amp;Bows.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-medium cursor-pointer"
            >
              Reset Filter &amp; Tampilkan Semua
            </button>
          </div>
        )}

      </section>

      {/* Trust & Home Ordering Guide Section */}
      <section id="pengiriman" className="bg-stone-100 border-y border-stone-200 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
              Pengiriman Dari Rumah Praktis
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              Cara Mudah Memesan Bunga Segar di Bloom&amp;Bows
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Dirancang untuk memberikan ketenangan pikiran saat mengirimkan hadiah ke orang tercinta tanpa harus keluar rumah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h3 className="font-semibold text-sm text-stone-900">Pilih 20 Koleksi Varian</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Pilih ukuran buket (Classic, Deluxe, Royale), warna pita satin eksklusif, dan opsi vas kaca kristal.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h3 className="font-semibold text-sm text-stone-900">Tulis Kartu Kaligrafi</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Tuliskan pesan tulus Anda secara gratis. Kartu dicetak elegan dengan amplop stempel segel lilin resmi.
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center font-bold text-sm">
                3
              </span>
              <h3 className="font-semibold text-sm text-stone-900">Tentukan Jadwal &amp; Alamat</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Pilih tanggal dan slot waktu pengantaran (Pagi, Siang, Sore, atau Instant Same-Day 2-3 jam tiba).
              </p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-2">
              <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center font-bold text-sm">
                4
              </span>
              <h3 className="font-semibold text-sm text-stone-900">Foto &amp; Pelacakan Kurir</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Kurir armada pendingin mengirimkan foto sebelum kirim dan bukti serah terima langsung via WhatsApp.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section Keunggulan & Garansi Kesegaran */}
      <section id="keunggulan" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-900 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900">Garansi Kesegaran 48 Jam</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Jika bunga layu dalam 48 jam pertama karena pengiriman, kami ganti 100% rangkaian baru tanpa biaya tambahan.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900">Packaging Water-Pack Khusus</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Ujung batang bunga dilengkapi reservoir nutrisi air dingin agar tetap mekar segar selama perjalanan cuaca tropis.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900">Armada Berpendingin Khusus</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Standing flowers dan buket meja diantar dengan mobil ber-AC, sementara buket tangan dilindungi box insulasi termal.
            </p>
          </div>
        </div>
      </section>

      {/* Testimoni Pelanggan */}
      <section id="testimoni" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-900">Ulasan Nyata Pelanggan</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">Dipercaya Ribuan Pelanggan Rumah</h2>
          <p className="text-xs text-stone-500">Ulasan autentik dari pelanggan yang memesan langsung untuk momen spesial mereka.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Testimoni 1: Allegra Vase */}
          <div className="p-5 bg-white rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500 text-xs">★★★★★</div>
                <span className="text-[10px] font-semibold text-rose-900 bg-rose-50 px-2 py-0.5 rounded-md">
                  Allegra Vase
                </span>
              </div>
              <p className="text-xs text-stone-600 italic leading-relaxed">
                "Pesan Allegra Vase untuk anniversary dari kantor ke rumah istri. Tiba tepat waktu dengan air segar di vas kaca, bunganya mekar sempurna dan kartu segel lilinnya sangat mewah!"
              </p>
            </div>
            <div className="text-xs font-bold text-stone-900 pt-2.5 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span>Dimas Prakoso</span>
                <span className="block text-[11px] text-stone-400 font-normal">Kebayoran Baru, Jakarta</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">✓ Terverifikasi</span>
            </div>
          </div>

          {/* Testimoni 2: Thumbelina Sunflower Sunshine */}
          <div className="p-5 bg-white rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500 text-xs">★★★★★</div>
                <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md">
                  Thumbelina Sunflower
                </span>
              </div>
              <p className="text-xs text-stone-600 italic leading-relaxed">
                "Buket Thumbelina Sunflower Sunshine warnanya luar biasa cerah! Pas banget untuk hadiah wisuda adik saya, bunganya segar tahan lebih dari seminggu di dalam ruangan."
              </p>
            </div>
            <div className="text-xs font-bold text-stone-900 pt-2.5 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span>Nadia Amanda</span>
                <span className="block text-[11px] text-stone-400 font-normal">BSD, Tangerang Selatan</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">✓ Terverifikasi</span>
            </div>
          </div>

          {/* Testimoni 3: Garden Blush Bloom Box */}
          <div className="p-5 bg-white rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500 text-xs">★★★★★</div>
                <span className="text-[10px] font-semibold text-rose-900 bg-rose-50 px-2 py-0.5 rounded-md">
                  Garden Blush Bloom Box
                </span>
              </div>
              <p className="text-xs text-stone-600 italic leading-relaxed">
                "Bloom box beludrunya super premium! Rangkaian bunga pink pastelnya tertata rapi, dan admin WhatsApp gerak cepat kirim foto hasil jadi sebelum kurir mengantar."
              </p>
            </div>
            <div className="text-xs font-bold text-stone-900 pt-2.5 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span>Clarissa Wijaya</span>
                <span className="block text-[11px] text-stone-400 font-normal">Menteng, Jakarta Pusat</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">✓ Terverifikasi</span>
            </div>
          </div>

          {/* Testimoni 4: Forever Begins Bunga Papan */}
          <div className="p-5 bg-white rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-sm transition-shadow">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500 text-xs">★★★★★</div>
                <span className="text-[10px] font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                  Forever Begins Papan
                </span>
              </div>
              <p className="text-xs text-stone-600 italic leading-relaxed">
                "Pesan Forever Begins Bunga Papan untuk grand opening rekan bisnis. Desainnya modern, tidak norak, bunganya melimpah dan foto serah terima tiba tepat waktu."
              </p>
            </div>
            <div className="text-xs font-bold text-stone-900 pt-2.5 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span>Budi Hartanto</span>
                <span className="block text-[11px] text-stone-400 font-normal">Pondok Indah, Jakarta</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">✓ Terverifikasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL 1: KUSTOMISASI VARIAN PRODUK & KARTU UCAPAN */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-semibold text-rose-900 uppercase tracking-wider">
                  Bloom&amp;Bows Atelier · {selectedProduct.categoryLabel}
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900 mt-0.5">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Image & Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2.5 text-xs text-stone-600">
                <p className="leading-relaxed">{selectedProduct.description}</p>
                <div className="p-3 bg-stone-50 rounded-xl space-y-1 border border-stone-200">
                  <span className="font-bold text-stone-800">Komposisi Bunga Segar:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                    {selectedProduct.flowersIncluded.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-[11px] text-emerald-800 font-medium">
                  ✦ {selectedProduct.careTips}
                </div>
              </div>
            </div>

            {/* Customizer: 1. Ukuran & Format Rangkaian dengan Ilustrasi Visual */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                  {selectedProduct.category === 'papan'
                    ? '1. Pilih Format & Ukuran Papan / Standing:'
                    : selectedProduct.category === 'box'
                    ? '1. Pilih Ukuran Bloom Box:'
                    : '1. Pilih Ukuran Rangkaian Buket:'}
                </label>
                <span className="text-[11px] text-stone-600 font-medium bg-stone-100 px-2 py-0.5 rounded-md">
                  ✦ Panduan visual volume & tangkai
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProduct.sizes.map((size) => {
                  const isSelected = modalSize?.id === size.id;
                  const price = Math.round(selectedProduct.price * size.priceMultiplier);
                  const illust = SIZE_ILLUSTRATIONS[size.id];

                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setModalSize(size)}
                      className={`group text-left rounded-2xl border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'border-rose-900 bg-rose-50/70 shadow-md ring-2 ring-rose-900'
                          : 'border-stone-200 hover:border-stone-400 bg-white shadow-2xs hover:shadow-sm'
                      }`}
                    >
                      {/* Image Illustration */}
                      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                        <img
                          src={illust?.image || selectedProduct.image}
                          alt={`Ilustrasi ukuran ${size.name}`}
                          className={`w-full h-full object-cover transition-transform duration-300 ${
                            isSelected ? 'scale-105' : 'group-hover:scale-105'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                        {/* Stems badge */}
                        <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-2xs">
                          {illust?.stems || size.name}
                        </div>

                        {/* Highlight badge */}
                        {illust?.highlight && (
                          <div
                            className={`absolute top-2 right-2 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-2xs ${
                              illust.highlight === 'Paling Diminati'
                                ? 'bg-amber-400 text-stone-950'
                                : 'bg-rose-900 text-white'
                            }`}
                          >
                            {illust.highlight}
                          </div>
                        )}

                        {/* Selected indicator check badge */}
                        {isSelected && (
                          <div className="absolute bottom-2 right-2 bg-rose-900 text-white p-1 rounded-full shadow-md flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-3 flex-1 flex flex-col justify-between space-y-1.5">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-stone-900">{size.name}</span>
                            {isSelected && (
                              <span className="text-[10px] font-bold text-rose-900 uppercase tracking-wide">
                                Terpilih
                              </span>
                            )}
                          </div>
                          <span className="block text-[11px] text-stone-500 leading-snug mt-0.5">
                            {illust?.subtitle || size.description}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                          <span className="text-[10px] text-stone-600 font-medium">Harga:</span>
                          <span className="text-xs font-bold text-rose-900 tabular-nums">
                            {formatRupiah(price)}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer: 2. Warna Pita & Aksen */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                {selectedProduct.category === 'papan'
                  ? '2. Pilih Aksen Pita & Ornamen Rangkaian:'
                  : '2. Pilih Warna Pita Satin & Wrapping:'}
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.ribbonColors.map((color) => {
                  const isSelected = modalRibbon === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setModalRibbon(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer: 3. Tambahan Vas Kaca Kristal (Hanya untuk Buket Bunga tangan yang tidak memiliki vas) */}
            {selectedProduct.category === 'buket' && !selectedProduct.name.toLowerCase().includes('vase') && (
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-stone-900 block">
                    3. Tambah Vas Kaca Kristal Fluted (+Rp 75.000)
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Bunga langsung dipasang rapi dalam vas dengan nutrisi pengawet segar.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={modalAddVase}
                  onChange={(e) => setModalAddVase(e.target.checked)}
                  className="w-4 h-4 rounded text-rose-800 focus:ring-rose-800 cursor-pointer"
                />
              </div>
            )}

            {/* Customizer: Kartu Ucapan / Banner Papan */}
            <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  {selectedProduct.category === 'buket' && !selectedProduct.name.toLowerCase().includes('vase')
                    ? '4. Personalisasi Kartu Ucapan Segel Lilin (Gratis)'
                    : '3. Personalisasi Ucapan & Kartu (Gratis)'}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {selectedProduct.category === 'papan' ? 'Banner & Pita Cetak' : 'Wax Seal Included'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    {selectedProduct.category === 'papan' ? 'Kepada (Penerima / Nama Acara):' : 'Kepada (Penerima):'}
                  </label>
                  <input
                    type="text"
                    placeholder={selectedProduct.category === 'papan' ? 'Contoh: PT Megah Abadi / Bpk. & Ibu Hendra...' : 'Contoh: Clara Salsabila...'}
                    value={modalCard.recipient}
                    onChange={(e) => setModalCard({ ...modalCard, recipient: e.target.value })}
                    className="w-full p-2 bg-white rounded-lg border border-stone-200 text-xs focus:ring-1 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                    {selectedProduct.category === 'papan' ? 'Dari (Pengirim / Nama Perusahaan):' : 'Dari (Pengirim):'}
                  </label>
                  <input
                    type="text"
                    placeholder={selectedProduct.category === 'papan' ? 'Contoh: Direksi & Staf PT Cahaya Sentosa...' : 'Contoh: Raya...'}
                    value={modalCard.sender}
                    onChange={(e) => setModalCard({ ...modalCard, sender: e.target.value })}
                    className="w-full p-2 bg-white rounded-lg border border-stone-200 text-xs focus:ring-1 focus:ring-stone-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                  {selectedProduct.category === 'papan' ? 'Teks Pesan / Ucapan Papan:' : 'Teks Pesan Kartu Ucapan:'}
                </label>
                <textarea
                  rows={2}
                  maxLength={250}
                  placeholder={
                    selectedProduct.category === 'papan'
                      ? 'Contoh: Selamat & Sukses atas Peresmian Gedung Baru / Turut Berduka Cita yang Sedalam-dalamnya...'
                      : 'Tuliskan ucapan penuh makna untuk orang tersayang...'
                  }
                  value={modalCard.message}
                  onChange={(e) => setModalCard({ ...modalCard, message: e.target.value })}
                  className="w-full p-2.5 bg-white rounded-lg border border-stone-200 text-xs focus:ring-1 focus:ring-stone-400"
                ></textarea>
                <span className="text-[10px] text-stone-400 text-right block">
                  {modalCard.message.length} / 250 karakter
                </span>
              </div>

              {/* Live Preview Card */}
              {modalCard.message && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-center space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800">
                    {selectedProduct.category === 'papan' ? 'Pratinjau Ucapan Banner:' : 'Pratinjau Kartu Ucapan Kaligrafi:'}
                  </span>
                  <p className="font-display italic text-stone-800 text-sm">
                    "{modalCard.message}"
                  </p>
                  <span className="text-[11px] font-serif text-stone-600 block">
                    — Dari: {modalCard.sender || 'Pengirim'} untuk {modalCard.recipient || 'Penerima'}
                  </span>
                </div>
              )}
            </div>

            {/* Price Total & Add to Cart Button */}
            <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Total Paket:</span>
                <span className="font-display text-2xl font-bold text-stone-900 tabular-nums">
                  {formatRupiah(
                    Math.round(selectedProduct.price * (modalSize?.priceMultiplier || 1)) +
                    ((selectedProduct.category === 'buket' && !selectedProduct.name.toLowerCase().includes('vase') && modalAddVase) ? 75000 : 0)
                  )}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-rose-900 hover:bg-rose-800 active:scale-98 text-white text-xs font-bold tracking-wide rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tambahkan ke Keranjang</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SLIDE-OVER DRAWER: KERANJANG BELANJA BLOOM&BOWS */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-rose-900" />
                  <h3 className="font-display text-lg font-bold text-stone-900">
                    Keranjang Belanja
                  </h3>
                  <span className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full font-semibold">
                    {totalItemsCount} item
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 text-xs">
                {subtotalPrice >= freeShippingThreshold ? (
                  <div className="text-emerald-800 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Bebas Biaya Pengiriman Same-Day aktif!</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-stone-600">
                      Tambah <strong>{formatRupiah(freeShippingThreshold - subtotalPrice)}</strong> lagi untuk Bebas Ongkir!
                    </span>
                    <div className="w-full bg-stone-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="bg-rose-800 h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotalPrice / freeShippingThreshold) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center space-y-3">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                    <h4 className="font-bold text-stone-700 text-sm">Keranjang Anda Masih Kosong</h4>
                    <p className="text-xs text-stone-500 max-w-xs mx-auto">
                      Pilih dari 20 koleksi bunga segar Bloom&amp;Bows untuk memudahkan pengiriman ke rumah.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Pilih Bunga Sekarang
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex gap-3 relative"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-start justify-between pr-4">
                          <h4 className="font-semibold text-xs text-stone-900 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => handleRemoveItem(item.cartItemId)}
                            className="text-stone-400 hover:text-rose-700 transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-stone-500 space-y-0.5">
                          <div>Ukuran: <strong className="text-stone-700">{item.selectedSize.name}</strong></div>
                          <div>Pita: <strong className="text-stone-700">{item.selectedRibbon}</strong></div>
                          {item.addVase && <div className="text-rose-900 font-medium">+ Vas Kaca Kristal</div>}
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="font-bold text-xs text-stone-900 tabular-nums">
                            {formatRupiah(item.unitPrice * item.quantity)}
                          </span>

                          <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 px-2 py-0.5">
                            <button
                              onClick={() => handleUpdateQuantity(item.cartItemId, -1)}
                              className="text-stone-500 hover:text-stone-900 p-0.5 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-stone-800 min-w-4 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.cartItemId, 1)}
                              className="text-stone-500 hover:text-stone-900 p-0.5 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Voucher Code */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-stone-200 bg-stone-50 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Kupon 'BLOOM10' atau 'BUNGASEGAR'..."
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs uppercase font-mono text-stone-800"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Klaim
                    </button>
                  </div>
                  {promoFeedback && (
                    <span className="text-[11px] font-medium text-emerald-800 block">
                      {promoFeedback}
                    </span>
                  )}
                </div>
              )}

              {/* Drawer Checkout Action */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-stone-200 bg-white space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal Produk:</span>
                      <span className="tabular-nums font-medium text-stone-900">{formatRupiah(subtotalPrice)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-rose-800 font-medium">
                        <span>Diskon Kupon:</span>
                        <span className="tabular-nums">- {formatRupiah(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-600">
                      <span>Ongkos Kirim Same-Day:</span>
                      <span className="tabular-nums font-medium text-stone-900">
                        {shippingFee === 0 ? <strong className="text-emerald-700">GRATIS</strong> : formatRupiah(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
                      <span>Total Pesanan:</span>
                      <span className="tabular-nums font-display text-lg text-rose-950">{formatRupiah(totalPrice)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutStep(1);
                    }}
                    className="w-full py-3 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-bold tracking-wide uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Lanjut Pemesanan ke Alamat Rumah</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: HOME DELIVERY CHECKOUT & PESAN KE WHATSAPP */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Checkout Header & Steps */}
            <div className="border-b border-stone-200 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose-800 font-bold">
                    Bloom&amp;Bows Checkout
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                    {checkoutStep === 1 && '1. Alamat & Jadwal Tiba di Rumah'}
                    {checkoutStep === 2 && '2. Ringkasan Pesanan & Kartu Ucapan'}
                    {checkoutStep === 3 && '3. Pembayaran Instan / COD'}
                    {checkoutStep === 4 && '4. Pesanan Diterima & Terjadwal'}
                  </h3>
                </div>
                {checkoutStep !== 4 && (
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Steps Progress */}
              {checkoutStep !== 4 && (
                <div className="flex items-center gap-2 mt-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        checkoutStep >= step ? 'bg-rose-900' : 'bg-stone-200'
                      }`}
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Step 1: Form Alamat Rumah & Slot Jam Kirim */}
            {checkoutStep === 1 && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nama Pemesan (Anda):</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">No. WhatsApp Pemesan:</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nama Penerima Bunga:</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">No. HP Penerima:</label>
                    <input
                      type="text"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Alamat Lengkap Pengiriman Rumah/Apartemen:</label>
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Tanggal Pengiriman:</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Slot Waktu Tiba:</label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                    >
                      <option value="Instant Same-Day (2-3 Jam Tiba)">Instant Same-Day (2-3 Jam Tiba)</option>
                      <option value="Pagi 08:00 - 11:00 WIB">Slot Pagi (08:00 - 11:00 WIB)</option>
                      <option value="Siang 12:00 - 15:00 WIB">Slot Siang (12:00 - 15:00 WIB)</option>
                      <option value="Sore 16:00 - 19:00 WIB">Slot Sore / Senja (16:00 - 19:00 WIB)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Catatan Khusus Pengantaran:</label>
                  <input
                    type="text"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold cursor-pointer"
                  >
                    Lanjut ke Rincian Pesanan →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Konfirmasi Rincian & Kartu Ucapan */}
            {checkoutStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1 text-stone-700">
                  <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider">
                    Penerima Bunga di Rumah:
                  </span>
                  <p>
                    Nama Penerima: <strong>{recipientName}</strong> ({recipientPhone})
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Alamat: {deliveryAddress}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Jadwal Kirim: {deliveryDate} · {deliveryTimeSlot}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-stone-800 block text-xs uppercase tracking-wider">
                    Daftar Pesanan ({cartItems.length} Produk):
                  </span>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                        <div>
                          <span className="font-semibold text-stone-900 block">{item.product.name} ({item.quantity}x)</span>
                          <span className="text-[11px] text-stone-500">{item.selectedSize.name} · Pita {item.selectedRibbon}</span>
                        </div>
                        <span className="font-bold text-stone-900 tabular-nums">
                          {formatRupiah(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-stone-100 rounded-xl space-y-1 text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="tabular-nums font-semibold">{formatRupiah(subtotalPrice)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-rose-800 font-semibold">
                      <span>Diskon Kupon:</span>
                      <span className="tabular-nums">- {formatRupiah(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Biaya Pengiriman:</span>
                    <span className="tabular-nums font-semibold">{shippingFee === 0 ? 'GRATIS' : formatRupiah(shippingFee)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200">
                    <span>Total Pembayaran:</span>
                    <span className="tabular-nums text-rose-950 font-display text-base">{formatRupiah(totalPrice)}</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="px-4 py-2 border border-stone-300 rounded-xl font-medium text-stone-700 cursor-pointer"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={() => setCheckoutStep(3)}
                    className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold cursor-pointer"
                  >
                    Lanjut ke Pembayaran →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Pilihan Pembayaran */}
            {checkoutStep === 3 && (
              <div className="space-y-4 text-xs">
                <span className="font-bold text-stone-800 block text-xs uppercase tracking-wider">
                  Pilih Metode Pembayaran:
                </span>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'qris'
                        ? 'border-rose-900 bg-rose-50/70 shadow-2xs'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-stone-900 block">QRIS Otomatis (BCA, Mandiri, GoPay, OVO, ShopeePay)</span>
                      <span className="text-[11px] text-stone-500">Scan barcode instan tanpa perlu konfirmasi manual</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">Otomatis</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bca')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'bca'
                        ? 'border-rose-900 bg-rose-50/70 shadow-2xs'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-stone-900 block">Transfer BCA Virtual Account</span>
                      <span className="text-[11px] text-stone-500">Nomor tagihan VA resmi terbit seketika</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mandiri')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'mandiri'
                        ? 'border-rose-900 bg-rose-50/70 shadow-2xs'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-stone-900 block">Mandiri Livin' VA</span>
                      <span className="text-[11px] text-stone-500">Pembayaran cepat via aplikasi Livin' by Mandiri</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-rose-900 bg-rose-50/70 shadow-2xs'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-stone-900 block">Cash On Delivery (Bayar di Tempat)</span>
                      <span className="text-[11px] text-stone-500">Bayar langsung tunai/QRIS ke kurir saat bunga tiba di rumah</span>
                    </div>
                  </button>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="px-4 py-2 border border-stone-300 rounded-xl font-medium text-stone-700 cursor-pointer"
                  >
                    ← Kembali
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="px-6 py-2.5 bg-rose-900 hover:bg-rose-800 text-white rounded-xl font-bold tracking-wide shadow-md cursor-pointer"
                  >
                    Konfirmasi Pesanan ({formatRupiah(totalPrice)})
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Invoice Resmi Bloom&Bows + Dispatch WhatsApp */}
            {checkoutStep === 4 && (
              <div className="space-y-5 text-center text-xs">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-display text-2xl font-bold text-stone-900">
                    Pesanan Berhasil Diterima Bloom&amp;Bows!
                  </h4>
                  <p className="text-stone-500 text-xs">
                    Nomor Invoice: <strong className="font-mono text-stone-900">{confirmedOrderId}</strong>
                  </p>
                </div>

                {/* Status Pelacakan Pesanan */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-bold text-stone-800 text-xs uppercase tracking-wider">
                      Status Bunga Anda:
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                      Florist Sedang Merangkai Segar
                    </span>
                  </div>

                  <div className="space-y-1 text-stone-600 text-xs">
                    <div>Penerima: <strong>{recipientName}</strong> ({recipientPhone})</div>
                    <div>Alamat Tujuan: <strong>{deliveryAddress}</strong></div>
                    <div>Jadwal Kirim: <strong>{deliveryDate} · {deliveryTimeSlot}</strong></div>
                    <div>Metode Bayar: <strong className="uppercase">{paymentMethod}</strong></div>
                    <div>Total Tagihan: <strong className="text-rose-900">{formatRupiah(totalPrice)}</strong></div>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-[11px] text-stone-500 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-rose-800 shrink-0" />
                    <span>Florist Bloom&amp;Bows akan mengirimkan foto buket via WhatsApp sebelum kurir berpendingin diberangkatkan.</span>
                  </div>
                </div>

                {/* WhatsApp Dispatch Button */}
                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/6285880518624?text=${encodeURIComponent(
                      `Halo Bloom&Bows Atelier! Saya ingin konfirmasi pesanan dari rumah:\n\n*No. Invoice:* ${confirmedOrderId}\n*Pemesan:* ${customerName} (${customerPhone})\n*Penerima:* ${recipientName} (${recipientPhone})\n*Alamat:* ${deliveryAddress}\n*Jadwal Tiba:* ${deliveryDate} (${deliveryTimeSlot})\n*Metode Bayar:* ${paymentMethod.toUpperCase()}\n*Total:* ${formatRupiah(totalPrice)}\n\nMohon diproses, terima kasih!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Rincian Pesanan ke WhatsApp Admin (0858-8051-8624)</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCartItems([]);
                    }}
                    className="w-full py-2.5 border border-stone-300 text-stone-700 rounded-xl font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Kembali ke Katalog Toko
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Floating WhatsApp Contact Button */}
      <a
        href="https://wa.me/6285880518624?text=Halo%20Bloom%26Bows%20Atelier,%20saya%20ingin%20tanya%20tentang%20pemesanan%20bunga%20segar%20dari%20rumah."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer"
        title="Chat WhatsApp: 0858-8051-8624"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline-block text-xs font-bold pr-1">
          Chat WA: 0858-8051-8624
        </span>
      </a>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-10 px-4 sm:px-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-display text-lg font-bold text-stone-900">Bloom&amp;Bows</span>
            <p className="text-stone-500">
              Atelier Pemesanan Bunga Segar dari Rumah · Pengiriman Same-Day Bergaransi 48 Jam.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-stone-600 font-medium">
            <a href="#katalog" className="hover:text-rose-900">20 Koleksi Bunga</a>
            <a href="#pengiriman" className="hover:text-rose-900">Pengiriman dari Rumah</a>
            <a href="#keunggulan" className="hover:text-rose-900">Garansi Kesegaran</a>
            <a href="#testimoni" className="hover:text-rose-900">Ulasan Pelanggan</a>
            <a
              href="https://wa.me/6285880518624"
              target="_blank"
              rel="noreferrer"
              className="hover:text-rose-900 text-emerald-700 font-bold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp: 0858-8051-8624</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
          <span>&copy; 2026 Bloom&amp;Bows Atelier. Seluruh hak cipta dilindungi.</span>
          <span>Boutique Luxury Florist · Same-Day Delivery</span>
        </div>
      </footer>

    </div>
  );
}
