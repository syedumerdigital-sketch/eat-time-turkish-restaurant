import React, { useState, useMemo, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  ShoppingBag,
  Flame,
  Clock,
  MapPin,
  Plus,
  Minus,
  Trash2,
  Search,
  Check,
  X,
  ChevronRight,
  Utensils,
  ChefHat,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { MENU_ITEMS, RESTAURANT_INFO, MenuItem, MenuItemSize } from './data/menuData';

export interface CartItem {
  id: string; // unique cart entry key
  menuItemId: string;
  nameEn: string;
  nameAr: string;
  selectedSize?: MenuItemSize;
  price: number;
  quantity: number;
  specialInstructions?: string;
  image: string;
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('eattime_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);
  const [modalSelectedSize, setModalSelectedSize] = useState<MenuItemSize | null>(null);
  const [modalInstructions, setModalInstructions] = useState<string>('');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  // Checkout form state
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerLocation, setCustomerLocation] = useState<string>('Dukhan Housing Area');
  const [customAddress, setCustomAddress] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('eattime_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Set html dir attribute
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Toast auto-clear
  useEffect(() => {
    if (addedToast) {
      const t = setTimeout(() => setAddedToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [addedToast]);

  const categories = [
    { id: 'all', nameEn: 'All Dishes', nameAr: 'جميع الأصناف' },
    { id: 'shawarma', nameEn: 'Turkish Shawarma', nameAr: 'شاورما تركية' },
    { id: 'grills', nameEn: 'Charcoal Grills & BBQ', nameAr: 'مشاوي على الفحم' },
    { id: 'pizza', nameEn: 'Pizzas & Fatayer', nameAr: 'بيتزا وفطاير' },
    { id: 'appetizers', nameEn: 'Appetizers & Salads', nameAr: 'مقبلات وسلطات' },
    { id: 'beverages', nameEn: 'Drinks & Extras', nameAr: 'مشروبات وإضافات' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        item.nameEn.toLowerCase().includes(query) ||
        item.nameAr.includes(query) ||
        item.descriptionEn.toLowerCase().includes(query) ||
        item.descriptionAr.includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Add standard or sized item
  const handleAddToCart = (dish: MenuItem, size?: MenuItemSize, instructions?: string) => {
    const chosenSize = size || (dish.sizes && dish.sizes.length > 0 ? dish.sizes[0] : undefined);
    const itemPrice = chosenSize ? chosenSize.price : dish.basePrice;
    const sizeKey = chosenSize ? chosenSize.nameEn : 'standard';
    const cartItemId = `${dish.id}_${sizeKey}_${instructions || ''}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) => (i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItemId: dish.id,
          nameEn: dish.nameEn,
          nameAr: dish.nameAr,
          selectedSize: chosenSize,
          price: itemPrice,
          quantity: 1,
          specialInstructions: instructions || '',
          image: dish.image
        }
      ];
    });

    const label = lang === 'ar' ? dish.nameAr : dish.nameEn;
    setAddedToast(`${label} ${lang === 'ar' ? 'أضيف إلى السلة' : 'added to cart'}`);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const openCustomModal = (dish: MenuItem) => {
    setSelectedDishModal(dish);
    setModalSelectedSize(dish.sizes && dish.sizes.length > 0 ? dish.sizes[0] : null);
    setModalInstructions('');
  };

  // Generate WhatsApp pre-filled text
  const generateWhatsAppMessage = () => {
    const address = customAddress.trim()
      ? `${customerLocation} - ${customAddress.trim()}`
      : customerLocation;

    let text = `*Eat Time Turkish Restaurant - مطعم وقت الأكل*\n`;
    text += `📍 *Dukhan Free Home Delivery Order*\n`;
    text += `--------------------------------------\n`;

    cart.forEach((item, idx) => {
      const sizeTag = item.selectedSize ? ` (${item.selectedSize.nameEn})` : '';
      const notesTag = item.specialInstructions ? ` [Note: ${item.specialInstructions}]` : '';
      text += `${idx + 1}. *${item.quantity}x* ${item.nameEn} / ${item.nameAr}${sizeTag}\n`;
      text += `   ↳ Price: ${item.price * item.quantity} QAR${notesTag}\n`;
    });

    text += `--------------------------------------\n`;
    text += `*Subtotal:* ${cartSubtotal} QAR\n`;
    text += `*Delivery Fee:* FREE (Inside Dukhan)\n`;
    text += `*TOTAL AMOUNT:* *${cartSubtotal} QAR*\n\n`;

    text += `👤 *Customer Details:*\n`;
    if (customerName.trim()) text += `• Name: ${customerName.trim()}\n`;
    if (customerPhone.trim()) text += `• Phone: ${customerPhone.trim()}\n`;
    text += `• Address: ${address}\n`;
    if (orderNotes.trim()) text += `• Special Notes: ${orderNotes.trim()}\n`;
    text += `\nPlease confirm my order and estimated delivery time. Thank you!`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const encoded = generateWhatsAppMessage();
    // Primary WhatsApp checkout number: 97450776800 as specified
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappCheckout}?text=${encoded}`;
    window.location.href = url;
  };

  const handleSecondaryWhatsApp = () => {
    if (cart.length === 0) return;
    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappSecondary}?text=${encoded}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      {/* 1. Top Notice Bar */}
      <div className="bg-red-700 text-white text-xs md:text-sm font-medium py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-bold tracking-wide">
              {lang === 'ar'
                ? 'توصيل منزلي مجاني داخل مدينة دخان، قطر'
                : 'FREE HOME DELIVERY INSIDE DUKHAN, QATAR'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href={`tel:${RESTAURANT_INFO.whatsappCheckout}`}
              className="hover:text-amber-200 transition-colors flex items-center gap-1.5 underline decoration-amber-400"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.hotline1}</span>
            </a>
            <span className="text-red-300">|</span>
            <a
              href={`tel:${RESTAURANT_INFO.whatsappSecondary}`}
              className="hover:text-amber-200 transition-colors flex items-center gap-1.5 underline decoration-amber-400"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.hotline2}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Top Navigation Bar (Strict 3-zone contract) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="block text-lg sm:text-xl font-black text-red-700 tracking-tight">
                Eat Time <span className="text-amber-600">Restaurant</span>
              </span>
              <span className="block text-xs font-bold text-stone-500">
                مطعم وقت الأكل التركي · دخان
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links & Language Switch */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <a href="#menu" className="hover:text-red-600 transition-colors whitespace-nowrap">
              {lang === 'ar' ? 'قائمة الطعام' : 'Digital Menu'}
            </a>
            <a href="#specialties" className="hover:text-red-600 transition-colors whitespace-nowrap">
              {lang === 'ar' ? 'أطباق خاصة' : 'House Specialties'}
            </a>
            <a href="#dukhan-delivery" className="hover:text-red-600 transition-colors whitespace-nowrap">
              {lang === 'ar' ? 'توصيل دخان' : 'Dukhan Delivery'}
            </a>
            <a href="#contact" className="hover:text-red-600 transition-colors whitespace-nowrap">
              {lang === 'ar' ? 'اتصل بنا' : 'Contact & Info'}
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Hotline + Language + Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
              title="Toggle Language"
            >
              {lang === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappCheckout}?text=${encodeURIComponent(
                'Hello Eat Time Turkish Restaurant Dukhan! I would like to inquire or place an order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl shadow-md shadow-red-600/20 transition-all hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'السلة' : 'Cart'}</span>
              {totalCartCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-black text-red-700 bg-white rounded-full tabular-nums shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Showcase Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white">
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay">
          <img
            src="/src/assets/images/hero_turkish_grills_1792075504962.jpg"
            alt="Turkish Grills Backdrop"
            className="w-full h-full object-cover filter blur-xs"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-700/60 text-red-200 text-xs sm:text-sm font-semibold backdrop-blur-md">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>
                  {lang === 'ar'
                    ? 'مشاوي على الفحم الحقيقي · شاورما تركية طازجة'
                    : 'Authentic Charcoal Flame Grills · Fresh Turkish Shawarma'}
                </span>
              </div>

              {/* Bold Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-balance">
                {lang === 'ar' ? (
                  <>
                    أشهى المأكولات التركية، <span className="text-amber-400">الشاورما</span>{' '}
                    والمشاوي في <span className="text-red-500">دخان</span>
                  </>
                ) : (
                  <>
                    Authentic Turkish Shawarma, Kebabs &{' '}
                    <span className="text-amber-400">Charcoal Grills</span> in{' '}
                    <span className="text-red-500">Dukhan</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-stone-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                {lang === 'ar'
                  ? 'استمتع بطعم الشاورما التركية الأصلية داخل خبز التومبيك والزورنا، كفتة اللحم، شيش طاووق، وبيتزا وحش الشهيرة. توصيل مجاني وسريع لكافة مناطق دخان.'
                  : 'Savor traditional Turkish Shawarma in freshly baked Tombik & Zurna bread, sizzling Kofta skewers, Shish Tawook, and signature Pizza Wahsh. Fast free delivery to your doorstep in Dukhan.'}
              </p>

              {/* Primary Call to Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#menu"
                  className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 group hover:scale-[1.02]"
                >
                  <Utensils className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'تصفح قائمة الطعام' : 'Explore Digital Menu'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                </a>

                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappCheckout}?text=${encodeURIComponent(
                    'Hello! I would like to order food from Eat Time Turkish Restaurant in Dukhan.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/30 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'اطلب عبر واتساب' : 'Order via WhatsApp'}</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-stone-800 text-stone-300 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{lang === 'ar' ? 'توصيل مجاني بدخان' : 'Free Dukhan Delivery'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{lang === 'ar' ? '١٠٠٪ حلال وطازج' : '100% Fresh & Halal'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{lang === 'ar' ? 'شواء على الفحم الطبيعي' : 'Natural Charcoal Grill'}</span>
                </div>
              </div>
            </div>

            {/* Right Media Card (Hero Image) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800/80 bg-stone-900 group">
                <img
                  src="/src/assets/images/hero_turkish_grills_1792075504962.jpg"
                  alt="Eat Time Turkish Restaurant Mixed Grill"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 start-4 end-4 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-stone-700/60 flex items-center justify-between">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-amber-400 font-bold">
                      {lang === 'ar' ? 'الطبق المميز' : 'Signature Dish'}
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      {lang === 'ar' ? 'مشاوي مشكل تركي فاخر' : 'Turkish Mix Charcoal Grill'}
                    </h3>
                  </div>
                  <div className="text-end">
                    <span className="text-xs text-stone-400 block">{lang === 'ar' ? 'يبدأ من' : 'From'}</span>
                    <span className="text-lg font-black text-amber-400 tabular-nums">40 QAR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dukhan Delivery & Hotline Spotlight */}
      <section id="dukhan-delivery" className="bg-amber-500 text-stone-950 py-4 px-4 sm:px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-start">
            <div className="p-2.5 bg-stone-900 text-amber-400 rounded-xl shrink-0 shadow-sm">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
                {lang === 'ar'
                  ? 'خدمة التوصيل السريع مجاناً داخل دخان'
                  : 'FREE HOME DELIVERY INSIDE DUKHAN, QATAR'}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-stone-900/80">
                {lang === 'ar'
                  ? 'نوصل إلى المجمعات السكنية، منطقة العمليات، ومناطق دخان خلال وقت قياسي'
                  : 'Fast direct delivery to Dukhan Housing, QP Area, Chalets & Commercial Area'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="tel:+97450776800"
              className="px-4 py-2 bg-stone-950 hover:bg-stone-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+974 5077 6800</span>
            </a>
            <a
              href="tel:+97455900806"
              className="px-4 py-2 bg-stone-950/90 hover:bg-stone-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>+974 5590 0806</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. House Specialties Highlights */}
      <section id="specialties" className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-600 text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'ar' ? 'أكثر الأطباق طلباً' : 'Popular Highlights'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                {lang === 'ar' ? 'مختارات الشيف الخاصة' : 'Signature Turkish Favorites'}
              </h2>
            </div>
            <p className="text-stone-500 text-sm max-w-md">
              {lang === 'ar'
                ? 'أطباق طازجة محضرة يومياً بتتبيلات تركية أصلية وخبز ساخن من الفرن الحجري.'
                : 'Prepared fresh daily with authentic Turkish herbs, hand-kneaded dough, and traditional charcoal roasting.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Tombik Shawarma */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-stone-200">
                  <img
                    src="/src/assets/images/turkish_shawarma_tombik_1792075505289.jpg"
                    alt="Tombik Shawarma"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 start-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {lang === 'ar' ? 'تومبيك أصلي' : 'Authentic Tombik'}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-stone-900">
                  {lang === 'ar' ? 'شاورما تومبيك تركية' : 'Tombik Shawarma'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {lang === 'ar'
                    ? 'خبز تومبيك دائري طازج محشو بشرائح الشاورما وصوص الثوم.'
                    : 'Crispy Turkish round bread stuffed with tender shaved meat.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <span className="text-base font-black text-red-700 tabular-nums">15 QAR</span>
                <button
                  onClick={() => handleAddToCart(MENU_ITEMS.find((i) => i.id === 'tombik-shawarma')!)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'أضف' : 'Add'}</span>
                </button>
              </div>
            </div>

            {/* Feature 2: Turkish Mix Grill */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-stone-200">
                  <img
                    src="/src/assets/images/hero_turkish_grills_1792075504962.jpg"
                    alt="Turkish Mix Grill"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 start-2 bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {lang === 'ar' ? 'الأكثر طلباً' : 'Bestseller'}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-stone-900">
                  {lang === 'ar' ? 'مشاوي مشكل تركي' : 'Turkish Mix Grill'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {lang === 'ar'
                    ? 'كفتة لحم، شيش طاووق، ريش غنم مع خبز تركي وخضار مشوية.'
                    : 'Kofta, Tawook & Lamb Chops grilled over natural charcoal.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">{lang === 'ar' ? 'يبدأ من' : 'From'}</span>
                  <span className="text-base font-black text-red-700 tabular-nums">40 QAR</span>
                </div>
                <button
                  onClick={() => openCustomModal(MENU_ITEMS.find((i) => i.id === 'mix-grill')!)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>{lang === 'ar' ? 'خيارات' : 'Options'}</span>
                </button>
              </div>
            </div>

            {/* Feature 3: Pizza Wahsh */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-stone-200">
                  <img
                    src="/src/assets/images/turkish_pizza_wahsh_1792075505009.jpg"
                    alt="Pizza Wahsh"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 start-2 bg-red-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {lang === 'ar' ? 'بيتزا وحش' : 'Monster Pizza'}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-stone-900">
                  {lang === 'ar' ? 'بيتزا وحش وقت الأكل' : 'Pizza Wahsh (Monster Pizza)'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {lang === 'ar'
                    ? 'بيتزا عملاقة باللحم المفروم والموزاريلا وصلصة البيتزا السرية.'
                    : 'Signature monster pizza loaded with spiced meat and cheeses.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block">{lang === 'ar' ? 'يبدأ من' : 'From'}</span>
                  <span className="text-base font-black text-red-700 tabular-nums">30 QAR</span>
                </div>
                <button
                  onClick={() => openCustomModal(MENU_ITEMS.find((i) => i.id === 'pizza-wahsh')!)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  <span>{lang === 'ar' ? 'خيارات' : 'Options'}</span>
                </button>
              </div>
            </div>

            {/* Feature 4: Shish Tawook */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-3 aspect-[4/3] bg-stone-200">
                  <img
                    src="/src/assets/images/turkish_bbq_grills_1792075506548.jpg"
                    alt="Shish Tawook"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 start-2 bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {lang === 'ar' ? 'طازج على الفحم' : 'Charcoal Grilled'}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-stone-900">
                  {lang === 'ar' ? 'شيش طاووق دجاج' : 'Shish Tawook Chicken'}
                </h3>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                  {lang === 'ar'
                    ? 'قطع دجاج متبلة بالزبادي والبهارات التركية مع الثومية والبطاطس.'
                    : 'Tender marinated chicken breast skewers with garlic dip & fries.'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between">
                <span className="text-base font-black text-red-700 tabular-nums">25 QAR</span>
                <button
                  onClick={() => handleAddToCart(MENU_ITEMS.find((i) => i.id === 'shish-tawook')!)}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'أضف' : 'Add'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Digital Menu & Categories */}
      <section id="menu" className="py-12 md:py-16 bg-stone-100 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {lang === 'ar' ? 'قائمة المأكولات الرقمية' : 'Full Digital Menu'}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              {lang === 'ar'
                ? 'اختر وجبتك المفضلة وأضفها إلى السلة لتأكيد طلبك مباشرة عبر واتساب مع التوصيل المجاني داخل دخان'
                : 'Select your favorite dishes and order directly via WhatsApp with free delivery in Dukhan'}
            </p>
          </div>

          {/* Search Bar & Category Navigation */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-stone-200 mb-8 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 absolute start-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder={
                  lang === 'ar'
                    ? 'ابحث بالاسم: شاورما، كفتة، بيتزا، مشاوي، مقبلات...'
                    : 'Search menu: Shawarma, Kofta, Pizza Wahsh, Grills, Hummus...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-11 pe-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all text-stone-900 placeholder:text-stone-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Segmented Control / Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                    }`}
                  >
                    {lang === 'ar' ? cat.nameAr : cat.nameEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Menu Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-md mx-auto">
              <Utensils className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-stone-800">
                {lang === 'ar' ? 'لم يتم العثور على أطباق مطابقة' : 'No matching dishes found'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {lang === 'ar'
                  ? 'جرب البحث باسم آخر أو اختر تصنيفاً مختلفاً'
                  : 'Try searching for another dish or clear your filter'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
              >
                {lang === 'ar' ? 'عرض كل الأصناف' : 'Show All Items'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((dish) => {
                const hasSizes = dish.sizes && dish.sizes.length > 0;
                return (
                  <div
                    key={dish.id}
                    className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-red-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                        <img
                          src={dish.image}
                          alt={dish.nameEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />

                        {dish.isSpecialty && (
                          <span className="absolute top-3 start-3 bg-amber-500 text-stone-950 font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                            {lang === 'ar' ? 'طبق خاص' : 'Chef Specialty'}
                          </span>
                        )}
                        {dish.preparationTime && (
                          <span className="absolute bottom-3 end-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>{dish.preparationTime}</span>
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="font-extrabold text-lg text-stone-900 group-hover:text-red-700 transition-colors">
                            {lang === 'ar' ? dish.nameAr : dish.nameEn}
                          </h3>
                        </div>
                        <p className="text-xs text-stone-500 font-medium mb-2">
                          {lang === 'ar' ? dish.nameEn : dish.nameAr}
                        </p>
                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                          {lang === 'ar' ? dish.descriptionAr : dish.descriptionEn}
                        </p>

                        {/* Sizing badges if multiple options */}
                        {hasSizes && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {dish.sizes!.map((s) => (
                              <span
                                key={s.nameEn}
                                className="text-[11px] px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md border border-stone-200 tabular-nums font-semibold"
                              >
                                {lang === 'ar' ? s.nameAr : s.nameEn}: {s.price} QAR
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="p-4 sm:p-5 pt-0 mt-auto">
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wide">
                            {hasSizes
                              ? lang === 'ar'
                                ? 'يبدأ من'
                                : 'Starting at'
                              : lang === 'ar'
                              ? 'السعر'
                              : 'Price'}
                          </span>
                          <span className="text-lg font-black text-red-700 tabular-nums">
                            {dish.basePrice} <span className="text-xs text-stone-600 font-bold">QAR</span>
                          </span>
                        </div>

                        {hasSizes ? (
                          <button
                            onClick={() => openCustomModal(dish)}
                            className="px-4 py-2 bg-stone-900 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                          >
                            <span>{lang === 'ar' ? 'اختر الحجم' : 'Select Size'}</span>
                            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(dish)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-red-600/20 active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 7. Slide-Over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 end-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full">
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-600 text-white rounded-lg">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-stone-900">
                      {lang === 'ar' ? 'سلة الطلبات' : 'Your Order Bag'}
                    </h2>
                    <span className="text-xs text-stone-500 font-semibold">
                      {cart.length} {lang === 'ar' ? 'أصناف مختلفة' : 'distinct items'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body (Scrollable items + checkout form) */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
                {cart.length === 0 ? (
                  <div className="py-16 text-center">
                    <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-3" />
                    <p className="text-base font-bold text-stone-700">
                      {lang === 'ar' ? 'سلة الطلبات فارغة' : 'Your cart is empty'}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                      {lang === 'ar'
                        ? 'تصفح قائمة الطعام اللذيذة وأضف وجباتك المفضلة لبدء الطلب.'
                        : 'Explore our delicious Turkish menu and add your favorite dishes.'}
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-5 px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700"
                    >
                      {lang === 'ar' ? 'تصفح الأصناف الآن' : 'Browse Dishes Now'}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Itemized List */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                        {lang === 'ar' ? 'الوجبات المختارة' : 'Selected Items'}
                      </h3>
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.nameEn}
                              className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-stone-900 truncate">
                                {lang === 'ar' ? item.nameAr : item.nameEn}
                              </h4>
                              {item.selectedSize && (
                                <span className="text-[11px] text-amber-700 font-semibold block">
                                  {lang === 'ar' ? item.selectedSize.nameAr : item.selectedSize.nameEn}
                                </span>
                              )}
                              {item.specialInstructions && (
                                <span className="text-[11px] text-stone-500 italic block truncate">
                                  Note: {item.specialInstructions}
                                </span>
                              )}
                              <span className="text-xs font-black text-red-700 tabular-nums block mt-0.5">
                                {item.price * item.quantity} QAR
                              </span>
                            </div>
                          </div>

                          {/* Stepper & Delete */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center bg-white border border-stone-200 rounded-lg overflow-hidden shadow-xs">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1.5 hover:bg-stone-100 text-stone-600"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 text-xs font-bold text-stone-900 tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1.5 hover:bg-stone-100 text-stone-600"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dukhan Delivery Form */}
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                      <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        <span>{lang === 'ar' ? 'عنوان التوصيل في دخان' : 'Dukhan Delivery Details'}</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            {lang === 'ar' ? 'الاسم' : 'Your Name'}
                          </label>
                          <input
                            type="text"
                            placeholder={lang === 'ar' ? 'مثال: محمد' : 'e.g. John / Ahmed'}
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            {lang === 'ar' ? 'رقم الهاتف / الجوال' : 'Contact Phone Number'}
                          </label>
                          <input
                            type="tel"
                            placeholder="+974 XXXXXXXX"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            {lang === 'ar' ? 'المنطقة داخل دخان' : 'Area inside Dukhan'}
                          </label>
                          <select
                            value={customerLocation}
                            onChange={(e) => setCustomerLocation(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                          >
                            <option value="Dukhan Housing Area">Dukhan Housing Area (إسكان دخان)</option>
                            <option value="QP Operations / Plant Area">QP Operations Area (منطقة العمليات)</option>
                            <option value="Dukhan Commercial Center">Commercial Center (المركز التجاري)</option>
                            <option value="Khatiyah Area">Khatiyah Area (منطقة الخطية)</option>
                            <option value="Dukhan Beach / Chalets">Dukhan Beach & Chalets (شاطئ وشاليهات دخان)</option>
                            <option value="Other Dukhan Location">Other Dukhan Location (موقع آخر في دخان)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            {lang === 'ar' ? 'تفاصيل العنوان / الشارع / الفيلا' : 'Street / Villa / Camp / Flat Details'}
                          </label>
                          <input
                            type="text"
                            placeholder={lang === 'ar' ? 'رقم الفيلا، الشارع، أو البوابة' : 'Villa number, Street, or Camp'}
                            value={customAddress}
                            onChange={(e) => setCustomAddress(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-700 mb-1">
                            {lang === 'ar' ? 'ملاحظات خاصة للطلب' : 'Special Cooking Notes'}
                          </label>
                          <input
                            type="text"
                            placeholder={lang === 'ar' ? 'مثال: ثوم زيادة، شطة حارة، بدون بصل' : 'e.g. Extra spicy, extra garlic dip'}
                            value={orderNotes}
                            onChange={(e) => setOrderNotes(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer (Summary & WhatsApp Order Button) */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                      <span className="font-bold text-stone-800 tabular-nums">{cartSubtotal} QAR</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span className="flex items-center gap-1">
                        <span>{lang === 'ar' ? 'رسوم التوصيل (دخان)' : 'Delivery (Dukhan)'}</span>
                      </span>
                      <span className="font-bold text-emerald-700 uppercase">
                        {lang === 'ar' ? 'مجاني' : 'FREE'}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                      <span>{lang === 'ar' ? 'الإجمالي المطلوب' : 'Total Amount'}</span>
                      <span className="text-red-700 tabular-nums">{cartSubtotal} QAR</span>
                    </div>
                  </div>

                  {/* Primary WhatsApp Checkout CTA */}
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>
                      {lang === 'ar'
                        ? 'إرسال الطلب عبر واتساب (+974 5077 6800)'
                        : 'Order via WhatsApp (+974 5077 6800)'}
                    </span>
                  </button>

                  {/* Secondary WhatsApp button / hotline */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={handleSecondaryWhatsApp}
                      className="w-1/2 py-2 px-2 text-[11px] font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-center"
                    >
                      {lang === 'ar' ? 'واتساب بديل (+974 55900806)' : 'Alt WhatsApp (55900806)'}
                    </button>
                    <a
                      href="tel:+97450776800"
                      className="w-1/2 py-2 px-2 text-[11px] font-bold text-red-700 bg-white hover:bg-red-50 border border-red-300 rounded-lg text-center flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'اتصال هاتفي مباشر' : 'Call Directly'}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. Dish Customization Modal (For multiple sizes or custom instructions) */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div
            onClick={() => setSelectedDishModal(null)}
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs"
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Image */}
            <div className="relative aspect-[16/9] bg-stone-100">
              <img
                src={selectedDishModal.image}
                alt={selectedDishModal.nameEn}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedDishModal(null)}
                className="absolute top-3 end-3 p-1.5 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <h3 className="text-xl font-black text-stone-900">
                  {lang === 'ar' ? selectedDishModal.nameAr : selectedDishModal.nameEn}
                </h3>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  {lang === 'ar' ? selectedDishModal.nameEn : selectedDishModal.nameAr}
                </p>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {lang === 'ar' ? selectedDishModal.descriptionAr : selectedDishModal.descriptionEn}
                </p>
              </div>

              {/* Portion / Size Selector */}
              {selectedDishModal.sizes && selectedDishModal.sizes.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    {lang === 'ar' ? 'اختر الحجم أو الكمية' : 'Select Size or Portion'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDishModal.sizes.map((size) => {
                      const isSelected = modalSelectedSize?.nameEn === size.nameEn;
                      return (
                        <button
                          key={size.nameEn}
                          type="button"
                          onClick={() => setModalSelectedSize(size)}
                          className={`p-3 rounded-xl border text-start flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-red-600 bg-red-50/70 text-red-950 font-bold ring-1 ring-red-600'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium'
                          }`}
                        >
                          <span className="text-xs">{lang === 'ar' ? size.nameAr : size.nameEn}</span>
                          <span className="text-xs font-black text-red-700 tabular-nums">
                            {size.price} QAR
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  {lang === 'ar' ? 'ملاحظات الشيف' : 'Special Instructions'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'مثال: بدون بصل، ثوم زيادة...' : 'e.g. No onions, extra garlic dip...'}
                  value={modalInstructions}
                  onChange={(e) => setModalInstructions(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold block uppercase">
                    {lang === 'ar' ? 'السعر' : 'Price'}
                  </span>
                  <span className="text-xl font-black text-red-700 tabular-nums">
                    {modalSelectedSize ? modalSelectedSize.price : selectedDishModal.basePrice}{' '}
                    <span className="text-xs text-stone-600 font-bold">QAR</span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(
                      selectedDishModal,
                      modalSelectedSize || undefined,
                      modalInstructions.trim() || undefined
                    );
                    setSelectedDishModal(null);
                  }}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-red-600/25 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تأكيد وإضافة للسلة' : 'Add to Order'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-20 start-1/2 -translate-x-1/2 z-50 bg-stone-900/95 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* 10. Sticky Mobile Bottom Cart Bar (Adheres to 15% mobile sticky cap) */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="md:hidden fixed bottom-3 inset-x-3 z-40">
          <div className="bg-stone-900 text-white p-3 rounded-2xl shadow-2xl flex items-center justify-between border border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-black text-sm">
                {totalCartCount}
              </div>
              <div>
                <span className="text-xs text-stone-400 block">{lang === 'ar' ? 'المجموع' : 'Total'}</span>
                <span className="text-base font-black text-amber-400 tabular-nums">{cartSubtotal} QAR</span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{lang === 'ar' ? 'عرض السلة' : 'View Cart'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 11. Restaurant Info, Dukhan Map & Footer */}
      <footer id="contact" className="bg-stone-950 text-stone-300 pt-14 pb-10 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Col 1: Identity */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-lg">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base">Eat Time Restaurant</h3>
                  <span className="text-xs text-amber-400 font-bold block">مطعم وقت الأكل التركي</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {lang === 'ar'
                  ? 'أشهى المأكولات التركية الأصيلة، شاورما التومبيك، المشاوي على الفحم، والبيتزا في قلب مدينة دخان بدولة قطر.'
                  : 'Authentic Turkish Shawarma, Charcoal Kebabs, and Pizza Wahsh in Dukhan, Qatar. Fresh ingredients and fire-grilled mastery daily.'}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60">
                <ShieldCheck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'توصيل مجاني داخل دخان' : 'Free Home Delivery Dukhan'}</span>
              </div>
            </div>

            {/* Col 2: Direct Contact & WhatsApp */}
            <div className="space-y-3">
              <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
                {lang === 'ar' ? 'أرقام الاتصال والطلب' : 'Order Hotlines & WhatsApp'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="tel:+97450776800"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-stone-200">+974 5077 6800</span>
                    <span className="text-stone-500">(Hotline 1)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+97455900806"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-bold text-stone-200">+974 5590 0806</span>
                    <span className="text-stone-500">(Hotline 2)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${RESTAURANT_INFO.whatsappCheckout}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>WhatsApp: +974 5077 6800</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Hours & Location */}
            <div className="space-y-3">
              <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
                {lang === 'ar' ? 'ساعات العمل والموقع' : 'Hours & Dukhan Coverage'}
              </h4>
              <div className="space-y-2 text-xs text-stone-400">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-200 font-bold block">
                      {lang === 'ar' ? 'ساعات العمل اليومية' : 'Open Daily:'}
                    </span>
                    <span>11:00 AM – 1:30 AM (Midnight)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-200 font-bold block">
                      {lang === 'ar' ? 'الموقع' : 'Location:'}
                    </span>
                    <span>Dukhan, State of Qatar (مدينة دخان)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Quick Action */}
            <div className="space-y-3">
              <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">
                {lang === 'ar' ? 'طلب فوري سريع' : 'Quick Order'}
              </h4>
              <p className="text-xs text-stone-400">
                {lang === 'ar'
                  ? 'انقر للمحادثة المباشرة مع خدمة العملاء لطلب أطباقك الآن.'
                  : 'Chat directly with our team to place custom orders or party caterings.'}
              </p>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappCheckout}?text=${encodeURIComponent(
                  'Hello Eat Time Turkish Restaurant! I want to order for delivery in Dukhan.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'ar' ? 'محادثة فورية عبر واتساب' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} Eat Time Turkish Restaurant (مطعم وقت الأكل) - Dukhan, Qatar.
              All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 text-stone-400">
              <span>Free Dukhan Home Delivery</span>
              <span>·</span>
              <span>Hotlines: +974 5077 6800 / +974 55900806</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
