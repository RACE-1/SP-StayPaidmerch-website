import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShoppingBag, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Truck, 
  Layers, 
  Check, 
  X, 
  ChevronRight, 
  Sliders, 
  Radio, 
  TrendingUp,
  Cpu,
  Package,
  Calendar,
  MousePointer
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Curated Apparel Products
const PRODUCTS = [
  {
    id: 'sp-01',
    name: 'Syndicate 500GSM Heavyweight Hoodie',
    category: 'Heavyweight Fleece',
    price: 88,
    tag: 'Drop 01 Flagship',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    description: 'Custom milled 500 GSM loopback cotton. Pre-shrunk architectural box cut with double-needle reverse stitching.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'sp-02',
    name: 'Atelier Raw Wide-Leg Carpenter Pant',
    category: 'Tailored Streetwear',
    price: 115,
    tag: 'Limited Run',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
    description: '14oz deadstock Japanese raw denim. Double knee structural overlays and custom gunmetal stay-paid rivets.',
    sizes: ['30', '32', '34', '36']
  },
  {
    id: 'sp-03',
    name: 'Architectural Boxy Vintage Crewneck Tee',
    category: 'Daily Essential',
    price: 46,
    tag: 'Core Uniform',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    description: '280 GSM long-staple combed cotton with blind hem finish and tight ribbed collar that will never bacon.',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'sp-04',
    name: 'Tactical Weatherproof Ripstop Shell',
    category: 'Technical Outerwear',
    price: 165,
    tag: 'All-Conditions',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    description: 'Three-layer waterproof breathable membrane with AquaGuard seam sealing and dual-direction magnetic utility pulls.',
    sizes: ['M', 'L', 'XL']
  }
];

export default function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const navbarRef = useRef(null);
  const preloaderRef = useRef(null);
  const mascotPreloadRef = useRef(null);

  // Preloader State
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(80);

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState({
    'sp-01': 'L',
    'sp-02': '32',
    'sp-03': 'L',
    'sp-04': 'M'
  });

  // Feature Card 1: Diagnostic Shuffler State
  const [shufflerCards, setShufflerCards] = useState([
    {
      id: 1,
      title: 'Silhouette 01: Boxy Heavy Fleece',
      spec: '500 GSM French Terry Loopback',
      resonance: '98.9% Runway Resonance',
      batch: 'Batch SP-449'
    },
    {
      id: 2,
      title: 'Silhouette 02: Wide Leg Carpenter',
      spec: '14oz Raw Deadstock Kuroki Denim',
      resonance: '96.4% Architecture Rating',
      batch: 'Batch SP-812'
    },
    {
      id: 3,
      title: 'Silhouette 03: Sculptural Supima Tee',
      spec: '280 GSM Single Jersey Cold Wash',
      resonance: '99.2% Uniform Consistency',
      batch: 'Batch SP-103'
    }
  ]);

  // Feature Card 2: Telemetry Typewriter State
  const telemetryFullText = `[PRICING TELEMETRY // REAL-TIME DISPATCH]
Direct-from-mill raw sourcing: -42% retail markup eliminated.
Cost breakdown per garment:
  • Raw Cotton Fibers: $14.20
  • Organic Eco-Dye & Wash: $4.80
  • Structural Hardware: $3.10
  • Fair-Wage Atelier Labor: $16.50
  • Direct Logistics: $5.40
True Production Cost: $44.00 | StayPaid Price: $88.00 (Traditional Retail: $280.00).
Status: 100% Value Transparency Verified.`;
  const [typewriterText, setTypewriterText] = useState('');

  // Feature Card 3: Cursor Scheduler Day State
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDayIndex, setActiveDayIndex] = useState(3);
  const [isDaySaved, setIsDaySaved] = useState(false);

  // Add to Cart handler
  const addToCart = (product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);
    
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Shuffler Timer (cycles every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setShufflerCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Telemetry Typewriter Loop
  useEffect(() => {
    let currentIdx = 0;
    let forward = true;
    let timeoutId;

    const tick = () => {
      if (forward) {
        if (currentIdx <= telemetryFullText.length) {
          setTypewriterText(telemetryFullText.slice(0, currentIdx));
          currentIdx += 2;
          timeoutId = setTimeout(tick, 35);
        } else {
          timeoutId = setTimeout(() => {
            forward = false;
            tick();
          }, 4500);
        }
      } else {
        if (currentIdx > 0) {
          currentIdx -= 8;
          setTypewriterText(telemetryFullText.slice(0, Math.max(0, currentIdx)));
          timeoutId = setTimeout(tick, 20);
        } else {
          forward = true;
          timeoutId = setTimeout(tick, 600);
        }
      }
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  // Scheduler Cursor Simulation Loop
  useEffect(() => {
    let day = 1;
    const interval = setInterval(() => {
      day = (day + 1) % 7;
      setActiveDayIndex(day);
      setIsDaySaved(false);
      setTimeout(() => {
        setIsDaySaved(true);
      }, 1000);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Preloader progress counter (80% to 100%)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 110);
    return () => clearInterval(progressInterval);
  }, []);

  // GSAP Animations Lifecycle
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 0. Preloader Mascot Animation (Fades in from 80% to 100% on load)
      if (mascotPreloadRef.current && preloaderRef.current) {
        const preloaderTl = gsap.timeline({
          onComplete: () => {
            gsap.to(preloaderRef.current, {
              opacity: 0,
              duration: 0.7,
              ease: 'power3.inOut',
              onComplete: () => setIsLoading(false)
            });
          }
        });

        preloaderTl
          .fromTo(
            mascotPreloadRef.current,
            { opacity: 0.8, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.4,
              ease: 'power2.out'
            }
          )
          .to(mascotPreloadRef.current, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power1.inOut'
          });
      }

      // 1. Navbar Morphing on scroll
      ScrollTrigger.create({
        trigger: '#hero-section',
        start: 'top top',
        end: 'bottom 100px',
        onLeave: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(13, 13, 18, 0.85)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
            backdropFilter: 'blur(20px)',
            duration: 0.4,
            ease: 'power2.inOut'
          });
        },
        onEnterBack: () => {
          gsap.to(navbarRef.current, {
            backgroundColor: 'rgba(13, 13, 18, 0.35)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: 'none',
            backdropFilter: 'blur(8px)',
            duration: 0.4,
            ease: 'power2.inOut'
          });
        }
      });

      // 2. Hero entrance animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, delay: 0.2 })
        .from('.hero-title-sans', { y: 40, opacity: 0, duration: 0.9 }, '-=0.5')
        .from('.hero-title-serif', { y: 45, opacity: 0, duration: 1.1 }, '-=0.6')
        .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.7')
        .from('.hero-actions', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6');

      // 3. Features staggered entrance
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '#features-section',
          start: 'top 75%'
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // 4. Philosophy Manifesto Reveal
      gsap.from('.manifesto-reveal', {
        scrollTrigger: {
          trigger: '#manifesto-section',
          start: 'top 70%'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // 5. Protocol Stacking Cards with Pinning
      const protocolCards = gsap.utils.toArray('.protocol-stack-card');
      protocolCards.forEach((card, index) => {
        if (index < protocolCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            pin: true,
            pinSpacing: false,
            endTrigger: protocolCards[index + 1],
            end: 'top top',
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(card, {
                scale: 1 - progress * 0.1,
                filter: `blur(${progress * 15}px)`,
                opacity: 1 - progress * 0.5,
                duration: 0.1,
                ease: 'none',
                overwrite: 'auto'
              });
            }
          });
        }
      });

      // 6. Pricing Cards Reveal
      gsap.from('.pricing-card', {
        scrollTrigger: {
          trigger: '#membership-section',
          start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#0D0D12] text-[#FAF8F5] min-h-screen selection:bg-[#C9A84C] selection:text-[#0D0D12]">
      {/* Visual Texture: Global CSS Noise Overlay */}
      <div className="noise-overlay" />

      {/* PRELOADER — Mascot fades in from 80% to 100% on load */}
      {isLoading && (
        <div
          ref={preloaderRef}
          className="fixed inset-0 z-[99999] bg-[#0D0D12] flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Ambient Golden Radial Glow Spotlight */}
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-[#C9A84C]/25 via-[#F2A435]/15 to-transparent blur-3xl pointer-events-none" />

          {/* Mascot Figure Container */}
          <div
            ref={mascotPreloadRef}
            className="relative z-10 flex flex-col items-center"
            style={{ opacity: 0.8, transform: 'scale(0.8)' }}
          >
            <img
              src="/mascot-transparent.png"
              alt="StayPaid Mascot"
              className="w-40 sm:w-48 md:w-56 h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(201,168,76,0.4)]"
            />
          </div>

          {/* Loading Progress Bar & Counter (80% -> 100%) */}
          <div className="relative z-10 mt-8 flex flex-col items-center space-y-2.5">
            <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C9A84C] to-[#FAF8F5] transition-all duration-150"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="flex items-center space-x-2 font-mono text-[11px] tracking-widest text-[#FAF8F5]/60 uppercase">
              <span>STAYPAID ATELIER //</span>
              <span className="text-[#C9A84C] font-bold">{loadProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* A. NAVBAR — "The Floating Island" */}
      <header
        ref={navbarRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full px-6 py-3.5 bg-[#0D0D12]/40 backdrop-blur-md border border-white/10 transition-all duration-300 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <a href="#hero-section" className="flex items-center space-x-2.5 group">
          <img
            src="/logo.jpg"
            alt="StayPaid Logo"
            className="w-9 h-9 rounded-full object-cover border border-[#C9A84C]/40 shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="font-sans font-black tracking-tight text-sm uppercase text-white group-hover:text-[#C9A84C] transition-colors">
              STAYPAID
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#FAF8F5]/40 -mt-1">
              Atelier Merch
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-wider uppercase text-[#FAF8F5]/70">
          <a href="#collection-section" className="interactive-lift hover:text-white transition-colors">Collection</a>
          <a href="#features-section" className="interactive-lift hover:text-white transition-colors">Artifacts</a>
          <a href="#manifesto-section" className="interactive-lift hover:text-white transition-colors">Manifesto</a>
          <a href="#protocol-section" className="interactive-lift hover:text-white transition-colors">Protocol</a>
          <a href="#membership-section" className="interactive-lift hover:text-white transition-colors">Membership</a>
        </nav>

        {/* CTA & Cart Action */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-magnetic relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 hover:bg-white/10 transition-colors"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#FAF8F5]" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C9A84C] text-[#0D0D12] font-mono text-[10px] font-bold flex items-center justify-center animate-pulse">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

          <a
            href="#collection-section"
            className="btn-magnetic btn-slide-hover hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#C9A84C] text-[#0D0D12] font-semibold text-xs tracking-wider uppercase shadow-lg shadow-[#C9A84C]/20"
          >
            <span className="slide-bg bg-white" />
            <span className="relative z-10">Shop Drop 01</span>
            <ArrowUpRight className="relative z-10 w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* B. HERO SECTION — "The Opening Shot" */}
      <section
        id="hero-section"
        ref={heroRef}
        className="relative h-[100dvh] w-full flex flex-col justify-end overflow-hidden pb-16 md:pb-24 px-6 md:px-16"
      >
        {/* Full-bleed Editorial Background Image with heavy primary-to-black gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1920&auto=format&fit=crop"
            alt="StayPaid High-Fashion Streetwear Model Editorial"
            className="w-full h-full object-cover object-top opacity-55 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/75 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12] via-transparent to-transparent opacity-80" />
        </div>

        {/* Content pushed to the bottom-left third */}
        <div className="relative z-10 max-w-4xl">
          {/* Preset B Badge */}
          <div className="hero-badge inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
            <span className="font-mono text-[10px] tracking-widest text-[#FAF8F5]/90 uppercase">
              StayPaid Atelier // Autumn-Winter Drop 01 Live
            </span>
          </div>

          {/* Preset Hero Line Pattern: [Aspirational noun] meets / [Precision word]. */}
          <div className="mb-4">
            <h1 className="hero-title-sans font-sans font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white/95 leading-[1.05]">
              Streetwear culture meets
            </h1>
            <div className="hero-title-serif font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#C9A84C] tracking-tight leading-[0.95] mt-1 filter drop-shadow-[0_15px_25px_rgba(201,168,76,0.15)]">
              Redefining Modern Luxury.
            </div>
          </div>

          <p className="hero-sub font-sans text-sm sm:text-base md:text-lg text-[#FAF8F5]/70 max-w-xl font-normal leading-relaxed mb-8">
            An independent fashion atelier engineering high-density 500GSM architectural silhouettes, raw selvedge craftsmanship, and zero-markup direct ordering.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions flex flex-wrap items-center gap-4">
            <a
              href="#collection-section"
              className="btn-magnetic btn-slide-hover px-8 py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] font-bold text-xs sm:text-sm tracking-wider uppercase inline-flex items-center space-x-3 shadow-xl shadow-[#C9A84C]/25"
            >
              <span className="slide-bg bg-white" />
              <span className="relative z-10">Browse The Collection</span>
              <ArrowUpRight className="relative z-10 w-4 h-4" />
            </a>

            <a
              href="#manifesto-section"
              className="btn-magnetic px-7 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm tracking-wider uppercase inline-flex items-center space-x-2.5 backdrop-blur-md"
            >
              <span>Our Philosophy</span>
              <ChevronRight className="w-4 h-4 text-[#C9A84C]" />
            </a>

            <div className="hidden lg:flex items-center space-x-3 ml-4 pl-4 border-l border-white/15 text-xs text-[#FAF8F5]/60 font-mono">
              <Sparkles className="w-4 h-4 text-[#C9A84C]" />
              <span>LIMITED TO 150 NUMBERED UNITS</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator ticker */}
        <div className="absolute right-8 bottom-10 hidden md:flex flex-col items-end font-mono text-[10px] tracking-widest text-[#FAF8F5]/40 space-y-1">
          <span>COORDINATES: 40.7128° N, 74.0060° W</span>
          <span className="text-[#C9A84C]">SCROLL FOR TELEMETRY // ↓</span>
        </div>
      </section>

      {/* C. FEATURES — "Interactive Functional Artifacts" */}
      <section id="features-section" className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-[#C9A84C] mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Pillars // Functional Micro-UIs</span>
          </div>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
            Engineered for the Modern Discerning Wardrobe.
          </h2>
          <p className="text-[#FAF8F5]/60 mt-3 max-w-2xl text-sm md:text-base">
            Every garment and service layer in the StayPaid ecosystem functions as a fine-tuned instrument. Explore our live interactive software artifacts below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1 — "Diagnostic Shuffler" (Trendy & Stylish Clothing) */}
          <div className="feature-card bg-[#16161F] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-[#C9A84C]/40 transition-colors">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#C9A84C]/5 rounded-bl-[4rem] pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">// ARTIFACT 01</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-[#FAF8F5]/60">
                  SHUFFLER ENGINE
                </span>
              </div>
              <h3 className="font-sans font-bold text-2xl text-white mb-2">
                Silhouette Diagnostic Shuffler
              </h3>
              <p className="text-xs text-[#FAF8F5]/60 leading-relaxed mb-6">
                Active cycle through our seasonal pattern drafts, textile weights, and runway trend heat analysis.
              </p>
            </div>

            {/* Shuffler Micro-UI Container */}
            <div className="relative h-60 w-full flex items-center justify-center my-4">
              {shufflerCards.map((item, idx) => {
                const offsets = [
                  { y: 0, scale: 1, zIndex: 30, opacity: 1 },
                  { y: 22, scale: 0.94, zIndex: 20, opacity: 0.65 },
                  { y: 44, scale: 0.88, zIndex: 10, opacity: 0.35 }
                ];
                const conf = offsets[idx];
                return (
                  <div
                    key={item.id}
                    className="absolute w-[94%] bg-[#1E1E2B] border border-white/15 rounded-2xl p-5 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      transform: `translateY(${conf.y}px) scale(${conf.scale})`,
                      zIndex: conf.zIndex,
                      opacity: conf.opacity
                    }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#C9A84C] mb-2">
                      <span>{item.batch}</span>
                      <span className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">{item.resonance}</span>
                      </span>
                    </div>
                    <div className="font-sans font-bold text-sm text-white">{item.title}</div>
                    <div className="font-mono text-xs text-[#FAF8F5]/50 mt-1">{item.spec}</div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#FAF8F5]/50">
              <span>ALGORITHM: SPRING-BOUNCE</span>
              <span className="text-[#C9A84C]">AUTO-CYCLING 3.2S</span>
            </div>
          </div>

          {/* Card 2 — "Telemetry Typewriter" (Affordable Prices) */}
          <div className="feature-card bg-[#16161F] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-[#C9A84C]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">// ARTIFACT 02</span>
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[10px] text-emerald-400 font-medium">LIVE TELEMETRY</span>
                </div>
              </div>
              <h3 className="font-sans font-bold text-2xl text-white mb-2">
                Direct Pricing Telemetry
              </h3>
              <p className="text-xs text-[#FAF8F5]/60 leading-relaxed mb-6">
                Zero retail distributor markups. We stream honest live production economics directly to your terminal.
              </p>
            </div>

            {/* Typewriter Monospace Terminal UI */}
            <div className="bg-[#0D0D12] rounded-2xl border border-white/10 p-5 font-mono text-xs leading-relaxed text-[#FAF8F5]/85 min-h-[240px] flex flex-col justify-between my-2 shadow-inner">
              <div className="whitespace-pre-wrap">
                {typewriterText}
                <span className="inline-block w-2 h-4 bg-[#C9A84C] ml-1 animate-pulse" />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#FAF8F5]/40">
                <span>AUDIT: 0% INFLATION</span>
                <span className="text-[#C9A84C]">SAVINGS: 68% AVG</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#FAF8F5]/50">
              <span>ZERO MIDDLEMAN OVERHEAD</span>
              <span className="text-emerald-400 font-semibold">100% TRANSPARENT</span>
            </div>
          </div>

          {/* Card 3 — "Cursor Protocol Scheduler" (Easy & Convenient Online Ordering) */}
          <div className="feature-card bg-[#16161F] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl group hover:border-[#C9A84C]/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-wider">// ARTIFACT 03</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-[#FAF8F5]/60">
                  AUTONOMOUS SCHEDULER
                </span>
              </div>
              <h3 className="font-sans font-bold text-2xl text-white mb-2">
                1-Click Protocol Scheduler
              </h3>
              <p className="text-xs text-[#FAF8F5]/60 leading-relaxed mb-6">
                Automated weekly delivery slots and prioritized drop dispatch. Seamlessly click, activate, and lock in orders.
              </p>
            </div>

            {/* Interactive Weekly Grid with Animated Simulated Cursor */}
            <div className="bg-[#0D0D12] rounded-2xl border border-white/10 p-5 my-2 relative min-h-[240px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#FAF8F5]/70">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A84C]" />
                    <span>OCTOBER DROP DISPATCH CYCLE</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#C9A84C]">SLOT RESERVED</span>
                </div>

                {/* Day Grid */}
                <div className="grid grid-cols-7 gap-1.5 my-3">
                  {daysOfWeek.map((day, idx) => {
                    const isActive = idx === activeDayIndex;
                    return (
                      <div
                        key={idx}
                        className={`h-12 rounded-xl flex flex-col items-center justify-center font-mono text-xs transition-all duration-300 ${
                          isActive
                            ? 'bg-[#C9A84C] text-[#0D0D12] font-black scale-105 shadow-lg shadow-[#C9A84C]/30'
                            : 'bg-[#181824] text-[#FAF8F5]/60 hover:bg-[#222232]'
                        }`}
                      >
                        <span className="text-[10px]">{day}</span>
                        <span className="text-xs">{12 + idx}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button & Virtual Cursor Position */}
              <div className="relative pt-4">
                <button
                  className={`w-full py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isDaySaved
                      ? 'bg-emerald-500 text-[#0D0D12] font-bold'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {isDaySaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Drop Slot Locked & Saved</span>
                    </>
                  ) : (
                    <>
                      <Radio className="w-3.5 h-3.5 text-[#C9A84C] animate-pulse" />
                      <span>Confirming Priority Dispatch...</span>
                    </>
                  )}
                </button>

                {/* Animated SVG Cursor */}
                <div
                  className="absolute pointer-events-none transition-all duration-700 ease-out"
                  style={{
                    bottom: isDaySaved ? '14px' : '55px',
                    right: isDaySaved ? '35%' : `${85 - activeDayIndex * 12}%`
                  }}
                >
                  <MousePointer className="w-5 h-5 text-[#C9A84C] fill-[#C9A84C] drop-shadow-md animate-bounce" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#FAF8F5]/50">
              <span>INSTANT DIGITAL RESERVATION</span>
              <span className="text-[#C9A84C]">GLOBAL DHL/FEDEX SYNC</span>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED DROP CATALOG — "Browse & Add To Cart" */}
      <section id="collection-section" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-[#C9A84C] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn-Winter Archive // Drop 01</span>
            </div>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight">
              Curated Silhouette Release.
            </h2>
            <p className="text-[#FAF8F5]/60 mt-3 max-w-xl text-sm md:text-base">
              Each piece is custom-milled, numbered, and constructed with heavy-gauge organic fibers. Select your sizing below to instantly add to your order.
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs text-[#FAF8F5]/50">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>4 OF 4 RELEASES READY TO SHIP</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];
            return (
              <div
                key={product.id}
                className="bg-[#14141C] border border-white/10 rounded-[2rem] overflow-hidden flex flex-col justify-between group hover:border-[#C9A84C]/50 transition-all duration-300 shadow-xl"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1D1D28]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#0D0D12]/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-[#C9A84C] uppercase tracking-wider">
                      {product.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1.5 rounded-full bg-[#0D0D12]/80 backdrop-blur-md border border-white/10 font-mono text-xs font-bold text-white">
                      ${product.price}.00
                    </span>
                  </div>
                </div>

                {/* Product Meta & Size Selector */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#FAF8F5]/50">
                      {product.category}
                    </span>
                    <h3 className="font-sans font-bold text-base text-white mt-1 group-hover:text-[#C9A84C] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#FAF8F5]/60 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    {/* Size Selector */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] text-[#FAF8F5]/60">Select Size:</span>
                      <div className="flex space-x-1.5">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSizes({ ...selectedSizes, [product.id]: s })}
                            className={`w-7 h-7 rounded-lg font-mono text-[11px] flex items-center justify-center transition-all ${
                              currentSize === s
                                ? 'bg-[#C9A84C] text-[#0D0D12] font-bold shadow-md'
                                : 'bg-white/5 text-[#FAF8F5]/70 hover:bg-white/10'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add To Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-magnetic btn-slide-hover w-full py-3 rounded-full bg-white/10 hover:bg-[#C9A84C] text-white hover:text-[#0D0D12] border border-white/15 hover:border-transparent font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all"
                    >
                      <span className="slide-bg bg-[#C9A84C]" />
                      <ShoppingBag className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Add To Cart — ${product.price}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* D. PHILOSOPHY — "The Manifesto" */}
      <section
        id="manifesto-section"
        className="relative py-36 px-6 md:px-16 bg-[#09090E] border-y border-white/10 overflow-hidden"
      >
        {/* Parallaxing Luxury Marble Texture Image at low opacity */}
        <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen">
          <img
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920&auto=format&fit=crop"
            alt="Dark Liquid Marble Architectural Texture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="manifesto-reveal inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs uppercase tracking-widest text-[#C9A84C] mb-8">
            <span>The StayPaid Manifesto</span>
          </div>

          {/* Statement 1: Neutral & Smaller */}
          <p className="manifesto-reveal font-sans text-base sm:text-xl md:text-2xl text-[#FAF8F5]/50 max-w-3xl leading-relaxed mb-6">
            Most fashion retailers focus on: hyper-disposable micro-trends, flimsy synthetic blends, and 700% middleman markups that fund hollow marketing spectacles.
          </p>

          <div className="manifesto-reveal w-16 h-[1px] bg-[#C9A84C]/40 my-6" />

          {/* Statement 2: Massive Serif Italic Drama with Accent Colored Keyword */}
          <h2 className="manifesto-reveal font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.08] max-w-4xl">
            We focus on: heavy-gauge architectural silhouettes, <span className="text-[#C9A84C] underline decoration-[#C9A84C]/40 underline-offset-8">uncompromising</span> textile integrity, and radical direct pricing.
          </h2>

          <div className="manifesto-reveal mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left w-full max-w-3xl pt-8 border-t border-white/10">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#C9A84C]">// 01 INTEGRITY</span>
              <p className="text-xs text-[#FAF8F5]/60">500 GSM loopback cotton sourced directly from ethical mills.</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#C9A84C]">// 02 PROPORTION</span>
              <p className="text-xs text-[#FAF8F5]/60">Engineered drop shoulders that drape naturally on every body frame.</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#C9A84C]">// 03 VELOCITY</span>
              <p className="text-xs text-[#FAF8F5]/60">Order directly online with instant dispatch and guaranteed fulfillment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* E. PROTOCOL — "Sticky Stacking Archive" */}
      <section id="protocol-section" className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C9A84C]">Execution Methodology</span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight mt-2">
            The Three-Step Production Protocol.
          </h2>
          <p className="text-[#FAF8F5]/60 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Scroll to observe our sticky stacking archive, demonstrating the mechanical precision applied to each garment.
          </p>
        </div>

        {/* Stacking Archive Cards Container */}
        <div className="space-y-16">
          {/* Protocol Card 1: Geometric Rotating Motif */}
          <div className="protocol-stack-card sticky top-28 bg-[#161622] border border-white/15 rounded-[3rem] p-8 md:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <span className="font-mono text-sm text-[#C9A84C] tracking-widest block mb-3">// PROTOCOL STEP 01</span>
              <h3 className="font-sans font-bold text-3xl md:text-4xl text-white mb-4">
                Architectural Pattern Engineering
              </h3>
              <p className="text-sm text-[#FAF8F5]/70 leading-relaxed">
                Before cutting a single meter of cloth, each silhouette is drafted digitally using stress-tension modeling to guarantee an effortless, weighted drop without fabric sag.
              </p>
              <div className="mt-8 flex items-center space-x-4 font-mono text-xs text-[#FAF8F5]/50">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">3D CAD VERIFIED</span>
                <span className="text-[#C9A84C]">0.02MM SEAM TOLERANCE</span>
              </div>
            </div>

            {/* Canvas/SVG Animation 1: Slowly rotating geometric motif */}
            <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center relative">
              <svg className="w-full h-full animate-[spin_24s_linear_infinite]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#2A2A38" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="6 3" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="#FAF8F5" strokeWidth="1" opacity="0.4" />
                <polygon points="100,30 170,140 30,140" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
                <polygon points="100,170 30,60 170,60" fill="none" stroke="#FAF8F5" strokeWidth="1" opacity="0.3" />
                <circle cx="100" cy="100" r="6" fill="#C9A84C" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-mono text-[10px] text-[#C9A84C]">
                <span>GEOMETRY STABLE</span>
              </div>
            </div>
          </div>

          {/* Protocol Card 2: Laser Line Scanning Across Grid */}
          <div className="protocol-stack-card sticky top-28 bg-[#1B1B28] border border-white/15 rounded-[3rem] p-8 md:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <span className="font-mono text-sm text-[#C9A84C] tracking-widest block mb-3">// PROTOCOL STEP 02</span>
              <h3 className="font-sans font-bold text-3xl md:text-4xl text-white mb-4">
                Raw Mill Extraction & Quality Scan
              </h3>
              <p className="text-sm text-[#FAF8F5]/70 leading-relaxed">
                We test every roll of 500GSM long-staple cotton for yarn density, colorfastness, and pre-shrunk equilibrium under high-temperature steam.
              </p>
              <div className="mt-8 flex items-center space-x-4 font-mono text-xs text-[#FAF8F5]/50">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">100% ORGANIC CERT</span>
                <span className="text-emerald-400">PASSED OPTICAL SCAN</span>
              </div>
            </div>

            {/* Canvas/SVG Animation 2: Laser Line Scanning Grid */}
            <div className="w-64 h-64 md:w-80 md:h-80 bg-[#0D0D12] rounded-3xl border border-white/10 p-6 relative overflow-hidden flex flex-col justify-between">
              {/* Dot Grid */}
              <div className="grid grid-cols-6 gap-3">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-white/15 mx-auto" />
                ))}
              </div>

              {/* Scanning Laser Beam */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent shadow-[0_0_15px_#C9A84C] animate-[bounce_3s_infinite]" />

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#FAF8F5]/50">
                <span>LASER SPECTROMETRY</span>
                <span className="text-[#C9A84C]">DENSITY: 500 GSM</span>
              </div>
            </div>
          </div>

          {/* Protocol Card 3: Pulsing Waveform (EKG / Textile Weave) */}
          <div className="protocol-stack-card sticky top-28 bg-[#14141E] border border-[#C9A84C]/30 rounded-[3rem] p-8 md:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-md">
              <span className="font-mono text-sm text-[#C9A84C] tracking-widest block mb-3">// PROTOCOL STEP 03</span>
              <h3 className="font-sans font-bold text-3xl md:text-4xl text-white mb-4">
                Cold-Seal Worldwide Fulfillment
              </h3>
              <p className="text-sm text-[#FAF8F5]/70 leading-relaxed">
                Each unit is vacuum-sealed with humidity buffers and serialized tamper tape before being expedited via global carbon-offset air freight.
              </p>
              <div className="mt-8 flex items-center space-x-4 font-mono text-xs text-[#FAF8F5]/50">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">TRACKING INCLUDED</span>
                <span className="text-[#C9A84C]">24-HOUR DISPATCH</span>
              </div>
            </div>

            {/* Canvas/SVG Animation 3: Pulsing EKG Waveform */}
            <div className="w-64 h-64 md:w-80 md:h-80 bg-[#0D0D12] rounded-3xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="font-mono text-[11px] text-[#C9A84C] flex items-center justify-between">
                <span>WEAVE FREQUENCY MONITOR</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* SVG Waveform */}
              <svg className="w-full h-32" viewBox="0 0 240 80">
                <path
                  d="M0,40 L40,40 L50,15 L60,65 L70,30 L80,50 L90,40 L140,40 L150,10 L160,70 L170,25 L180,55 L190,40 L240,40"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="300"
                  strokeDashoffset="600"
                  className="animate-[dash_3.5s_linear_infinite]"
                />
              </svg>

              <div className="flex items-center justify-between font-mono text-[10px] text-[#FAF8F5]/50">
                <span>VITALITY: 100%</span>
                <span className="text-emerald-400">DISPATCHING NORMALLY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* F. MEMBERSHIP / PRICING */}
      <section id="membership-section" className="py-28 px-6 md:px-16 max-w-6xl mx-auto border-t border-white/10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#C9A84C]">Access Tiers</span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight mt-2">
            Choose Your Access Protocol.
          </h2>
          <p className="text-[#FAF8F5]/60 mt-3 text-sm md:text-base max-w-lg mx-auto">
            Direct public purchases or exclusive priority allocation for ongoing seasonal capsule releases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Tier 1: Essential */}
          <div className="pricing-card bg-[#14141C] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between h-full hover:border-white/20 transition-all">
            <div>
              <span className="font-mono text-xs text-[#FAF8F5]/50 uppercase tracking-widest">Public Tier</span>
              <h3 className="font-sans font-bold text-2xl text-white mt-1">Essential</h3>
              <p className="text-xs text-[#FAF8F5]/60 mt-2">Open access to seasonal catalog and standard customer service.</p>
              <div className="my-6">
                <span className="text-4xl font-sans font-bold text-white">$0</span>
                <span className="text-xs font-mono text-[#FAF8F5]/50 ml-1">/ Free Membership</span>
              </div>
              <ul className="space-y-3 font-sans text-xs text-[#FAF8F5]/80">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Public drop releases access</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Standard 3-5 day ground delivery</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Transparent cost telemetry breakdown</span>
                </li>
              </ul>
            </div>

            <a
              href="#collection-section"
              className="btn-magnetic mt-8 w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs tracking-wider uppercase text-center block"
            >
              Browse Public Drop
            </a>
          </div>

          {/* Tier 2: Performance / VIP (Middle card pops with primary color and accent button) */}
          <div className="pricing-card bg-[#1A1A26] border-2 border-[#C9A84C] rounded-[2.5rem] p-9 flex flex-col justify-between relative shadow-2xl scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C9A84C] text-[#0D0D12] font-mono text-[10px] font-black tracking-widest uppercase shadow-lg">
              ★ POPULAR ATELIER PASS
            </div>

            <div>
              <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest">Priority Syndicate</span>
              <h3 className="font-sans font-bold text-3xl text-white mt-1">Syndicate Pass</h3>
              <p className="text-xs text-[#FAF8F5]/70 mt-2">Guaranteed reservation window for all limited-quantity 150-piece drops.</p>
              <div className="my-6">
                <span className="text-5xl font-sans font-extrabold text-white">$29</span>
                <span className="text-xs font-mono text-[#FAF8F5]/50 ml-1">/ Quarter</span>
              </div>
              <ul className="space-y-3.5 font-sans text-xs text-[#FAF8F5]/90">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span><strong>15-Minute Priority Early Access</strong> before public</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Free expedited carbon-offset air shipping</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Complimentary archival tote with first order</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Exclusive member-only quarterly capsule piece</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                alert('Syndicate Pass priority window applied to your session!');
              }}
              className="btn-magnetic btn-slide-hover mt-8 w-full py-3.5 rounded-full bg-[#C9A84C] text-[#0D0D12] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#C9A84C]/30 flex items-center justify-center space-x-2"
            >
              <span className="slide-bg bg-white" />
              <span className="relative z-10">Claim Syndicate Access</span>
              <ArrowUpRight className="relative z-10 w-4 h-4" />
            </button>
          </div>

          {/* Tier 3: Enterprise / Bespoke */}
          <div className="pricing-card bg-[#14141C] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between h-full hover:border-white/20 transition-all">
            <div>
              <span className="font-mono text-xs text-[#FAF8F5]/50 uppercase tracking-widest">Private Client</span>
              <h3 className="font-sans font-bold text-2xl text-white mt-1">Atelier Bespoke</h3>
              <p className="text-xs text-[#FAF8F5]/60 mt-2">Custom-tailored pattern fits and direct private showroom consultation.</p>
              <div className="my-6">
                <span className="text-4xl font-sans font-bold text-white">$180</span>
                <span className="text-xs font-mono text-[#FAF8F5]/50 ml-1">/ Year</span>
              </div>
              <ul className="space-y-3 font-sans text-xs text-[#FAF8F5]/80">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Individual custom hem & sleeve tailoring</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>1-of-50 Serialized silver laser identity tags</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-[#C9A84C]" />
                  <span>Direct phone line with head pattern-maker</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => alert('Private Client Concierge will contact you within 2 hours.')}
              className="btn-magnetic mt-8 w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs tracking-wider uppercase text-center block"
            >
              Contact Concierge
            </button>
          </div>
        </div>
      </section>

      {/* G. FOOTER */}
      <footer className="bg-[#09090E] border-t border-white/10 rounded-t-[4rem] pt-20 pb-12 px-6 md:px-16 text-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2.5">
                <img
                  src="/logo.jpg"
                  alt="StayPaid Logo"
                  className="w-10 h-10 rounded-full object-cover border border-[#C9A84C]/40 shadow-lg"
                />
                <span className="font-sans font-black tracking-tight text-xl uppercase text-white">
                  STAYPAID MERCH
                </span>
              </div>
              <p className="font-sans text-xs text-[#FAF8F5]/60 max-w-sm leading-relaxed">
                An online clothing store and design studio dedicated to high-fidelity street fashion, heavyweight organic textiles, and direct-to-consumer digital ordering.
              </p>
              <div className="pt-2">
                <div className="inline-flex items-center space-x-2 font-mono text-[11px] text-[#C9A84C]">
                  <span>DISPATCHED FROM SOHO / BROOKLYN / TOKYO</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs text-[#FAF8F5]/40 uppercase tracking-widest mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-xs text-[#FAF8F5]/80">
                <li><a href="#hero-section" className="hover:text-[#C9A84C] transition-colors">Top // Entrance</a></li>
                <li><a href="#collection-section" className="hover:text-[#C9A84C] transition-colors">Autumn Drop 01</a></li>
                <li><a href="#features-section" className="hover:text-[#C9A84C] transition-colors">Software Micro-UIs</a></li>
                <li><a href="#manifesto-section" className="hover:text-[#C9A84C] transition-colors">Design Manifesto</a></li>
                <li><a href="#protocol-section" className="hover:text-[#C9A84C] transition-colors">Stacking Protocol</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-[#FAF8F5]/40 uppercase tracking-widest mb-4">Transparency</h4>
              <ul className="space-y-2.5 text-xs text-[#FAF8F5]/80">
                <li><a href="#features-section" className="hover:text-[#C9A84C] transition-colors">Pricing Telemetry</a></li>
                <li><span className="text-[#FAF8F5]/40">Fiber Traceability (GRS)</span></li>
                <li><span className="text-[#FAF8F5]/40">Shipping & Return Policy</span></li>
                <li><span className="text-[#FAF8F5]/40">Privacy Policy // Terms</span></li>
              </ul>
            </div>
          </div>

          {/* Bottom Row & System Operational Status Indicator */}
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="font-mono text-xs text-[#FAF8F5]/40">
              © {new Date().getFullYear()} STAYPAID MERCH CORP. ALL RIGHTS RESERVED.
            </div>

            {/* "System Operational" status indicator with pulsing green dot */}
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-[#161622] border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="font-mono text-[11px] text-[#FAF8F5]/90 tracking-wider">
                SYSTEM OPERATIONAL // LOGISTICS DISPATCH ACTIVE // AVG FULFILLMENT: 24.2H
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#12121A] border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-[#C9A84C]" />
                    <h3 className="font-sans font-bold text-lg text-white">Your Order Queue</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-full text-[#FAF8F5]/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="py-6 space-y-4 max-h-[55vh] overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-[#FAF8F5]/20 mx-auto mb-3" />
                      <p className="font-mono text-xs text-[#FAF8F5]/50">Your cart is currently empty.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="mt-4 px-4 py-2 rounded-full bg-white/10 text-xs font-mono text-[#C9A84C] hover:bg-white/15"
                      >
                        Browse Drop 01
                      </button>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <div key={`${item.id}-${item.size}`} className="bg-[#1A1A26] rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 px-4">
                          <h4 className="font-sans font-bold text-xs text-white line-clamp-1">{item.name}</h4>
                          <span className="font-mono text-[10px] text-[#C9A84C]">Size: {item.size} • ${item.price} each</span>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="w-5 h-5 rounded bg-white/10 text-xs flex items-center justify-center hover:bg-white/20"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="w-5 h-5 rounded bg-white/10 text-xs flex items-center justify-center hover:bg-white/20"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="font-mono text-xs font-bold text-white">
                          ${item.price * item.quantity}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Order Summary & Checkout Action */}
              {cart.length > 0 && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="space-y-1.5 font-mono text-xs text-[#FAF8F5]/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white">${cartTotal}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carbon-Neutral Dispatch</span>
                      <span className="text-emerald-400">FREE // COVERED</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-white/10">
                      <span>Total Amount</span>
                      <span className="text-[#C9A84C]">${cartTotal}.00</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setOrderModalOpen(true);
                      setOrderSuccess(false);
                      setTimeout(() => {
                        setOrderSuccess(true);
                      }, 1800);
                    }}
                    className="btn-magnetic btn-slide-hover w-full py-4 rounded-full bg-[#C9A84C] text-[#0D0D12] font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-xl shadow-[#C9A84C]/30"
                  >
                    <span className="slide-bg bg-white" />
                    <span className="relative z-10">Place Online Order Now</span>
                    <ArrowUpRight className="relative z-10 w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-[#FAF8F5]/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-BIT ENCRYPTED ATELIER CHECKOUT</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT / ORDER SUCCESS MODAL */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setOrderModalOpen(false)} />
          <div className="relative bg-[#161622] border border-[#C9A84C]/40 rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl text-center z-10">
            {!orderSuccess ? (
              <div className="py-8 space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin mx-auto" />
                <h3 className="font-sans font-bold text-xl text-white">Transmitting Order Telemetry...</h3>
                <p className="font-mono text-xs text-[#FAF8F5]/60">
                  Reserving numbered garment units & calculating express dispatch route.
                </p>
              </div>
            ) : (
              <div className="py-4 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest">// ORDER CONFIRMED</span>
                  <h3 className="font-sans font-bold text-2xl text-white mt-1">
                    StayPaid Order #SP-{Math.floor(100000 + Math.random() * 900000)}
                  </h3>
                  <p className="text-xs text-[#FAF8F5]/70 mt-2">
                    Your apparel units have been allocated from Autumn-Winter Drop 01. A confirmation dispatch docket and tracking code have been scheduled.
                  </p>
                </div>

                <div className="bg-[#0D0D12] rounded-2xl p-4 border border-white/10 text-left font-mono text-xs space-y-1.5">
                  <div className="flex justify-between text-[#FAF8F5]/60">
                    <span>Fulfillment Hub:</span>
                    <span className="text-white">SoHo Atelier Warehouse</span>
                  </div>
                  <div className="flex justify-between text-[#FAF8F5]/60">
                    <span>Est. Delivery:</span>
                    <span className="text-emerald-400">Within 48 Hours</span>
                  </div>
                  <div className="flex justify-between text-[#FAF8F5]/60">
                    <span>Units Allocated:</span>
                    <span className="text-[#C9A84C]">{cart.reduce((t, i) => t + i.quantity, 0)} Items (${cartTotal}.00)</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOrderModalOpen(false);
                    setCart([]);
                  }}
                  className="btn-magnetic w-full py-3.5 rounded-full bg-[#C9A84C] text-[#0D0D12] font-bold text-xs uppercase tracking-wider"
                >
                  Return To Showroom
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
