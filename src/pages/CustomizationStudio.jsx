import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Palette, Layers, Wrench } from 'lucide-react';

// --- 1. IMPORT STUDIO IMAGES ---
import showcaseImg from '../assets/alloys-cc.jpg';
import blackStudioImg from '../assets/Motors-crr.jpg'; 
// NEW: Import for White Studio Card
import whiteStudioImg from '../assets/studio-gg.jpg';

// --- 2. IMPORT ALLOY IMAGES ---
import classicBlackImg from '../assets/black-classic.jpg';
import sportChromeImg from '../assets/sport-chrome.jpg';
import racingRedImg from '../assets/racing-red.jpg';
import titaniumGrayImg from '../assets/Titanium-Gray.jpg';
import pearlWhiteImg from '../assets/Pearl-White.jpg';
import gunmetalProImg from '../assets/Gunmetal-Pro.jpg';
import matteBlackImg from '../assets/Matte-Black.jpg';
import carbonFiberImg from '../assets/Matte-Black.jpg';

// --- Utility Components ---
const AnimatedReveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => element.classList.add('is-visible'), delay * 1000);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal-base ${className || ''}`}>{children}</div>;
};

// --- Header Component ---
const Header = () => (
  <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div className="text-2xl font-heading font-bold">
      <span className="text-white">VYRONEX</span><span className="text-primary">MOTORS</span>
    </div>
    <div className="hidden md:flex gap-6 text-sm font-paragraph uppercase tracking-widest">
      <Link to="/" className="text-gray-300 hover:text-white transition-colors">HOME</Link>
      <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">CAR SALES</Link>
      <Link to="/customization" className="text-primary border-b border-primary">CUSTOMIZATION STUDIO</Link>
      <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">CONTACT</Link>
    </div>
  </nav>
);

// --- Footer Component ---
const Footer = () => (
  <footer className="bg-black py-16 px-6 border-t border-white/10 text-white font-paragraph relative z-10">
    <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <div className="text-2xl font-heading font-bold">
          <span className="text-white">VYRONEX</span><span className="text-primary">MOTORS</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          Premium luxury vehicles and expert customization services.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-6">Contact</h3>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +91 8766476895</li>
          <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Pune, Maharashtra</li>
        </ul>
      </div>
    </div>
    <div className="max-w-[120rem] mx-auto mt-16 pt-8 border-t border-white/5 text-center">
      <p className="text-sm font-heading font-bold tracking-widest text-gray-400">
        © 2025 VyronexMotors. All rights reserved. Crafted for luxury.
      </p>
      {/* Signature line with Heartbeat animation */}
      <div className="text-sm font-heading font-bold tracking-widest text-gray-400">
        MADE WITH 
        <span className="heartbeat-emoji inline-block mx-2 text-primary">❤️</span> 
        BY CHINMAY CHAUDHARI
      </div>
    </div>
  </footer>
);

// --- STUDIO DATA ---
const STUDIOS = [
  {
    id: 'white-studio',
    title: "THE WHITE STUDIO",
    subtitle: "Pristine. Clinical. Perfection.",
    description: "An ultra-clean environment designed for paint protection film (PPF), ceramic coating, and detailed inspections under high-intensity lighting.",
    image: whiteStudioImg,
    lightColor: 'rgba(255, 240, 200, 0.4)' 
  },
  {
    id: 'black-studio',
    title: "THE BLACK STUDIO",
    subtitle: "Dramatic. Bold. Exclusive.",
    description: "A moody, atmospheric space for vehicle wraps, custom bodywork, and unveiling your newly transformed machine.",
    image: blackStudioImg,
    lightColor: 'rgba(255, 215, 0, 0.2)'
  }
];

// --- ALLOY DATA ---
const ALLOYS = [
  { name: "Classic Black", specs: "18\" | 5x120 | 9.5J", price: "+$1,800", image: classicBlackImg },
  { name: "Sport Chrome", specs: "19\" | 5x120 | 10J", price: "+$2,200", image: sportChromeImg },
  { name: "Racing Red", specs: "20\" | 5x120 | 10.5J", price: "+$3,500", image: racingRedImg },
  { name: "Titanium Gray", specs: "19\" | 5x120 | 9.5J", price: "+$2,100", image: titaniumGrayImg },
  { name: "Pearl White", specs: "18\" | 5x120 | 9J", price: "+$1,950", image: pearlWhiteImg },
  { name: "Gunmetal Pro", specs: "20\" | 5x120 | 10J", price: "+$2,800", image: gunmetalProImg },
  { name: "Matte Black Pro", specs: "21\" | 5x120 | 11J", price: "+$4,500", image: matteBlackImg },
  { name: "Carbon Fiber", specs: "20\" | 5x120 | 10.5J", price: "+$5,200", image: carbonFiberImg }
];

// --- Main Component ---
export default function CustomizationStudio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white font-paragraph overflow-x-hidden">
      <Header />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" style={{ scaleX }} />

      {/* --- Page Title Section --- */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <AnimatedReveal>
          <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6">
            CUSTOMIZATION <span className="text-primary">STUDIO</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Select your environment. Where your vision becomes reality.
          </p>
        </AnimatedReveal>
      </section>

      {/* --- Studios Grid --- */}
      <section className="px-6 pb-32">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {STUDIOS.map((studio, index) => (
            <AnimatedReveal key={studio.id} delay={index * 0.2}>
              <Link to={`/studio/${studio.id.split('-')[0]}`} className="block group relative h-[600px] rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500">
                <img 
                  src={studio.image} 
                  alt={studio.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div 
                    className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at center, ${studio.lightColor}, transparent 70%)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 opacity-90" />
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                    <div className="text-center">
                        <h4 
                          className="font-heading tracking-[0.3em] text-sm font-bold text-yellow-100"
                          style={{ textShadow: '0 0 15px rgba(255, 215, 0, 0.7)' }}
                        >
                            VYRONEX MOTORS STUDIO
                        </h4>
                    </div>
                    <div>
                        <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{studio.subtitle}</div>
                        <h3 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">{studio.title}</h3>
                        <p className="text-gray-300 max-w-md leading-relaxed">{studio.description}</p>
                         <div className="mt-8 flex items-center gap-2 text-white text-sm font-bold uppercase tracking-widest group-hover:gap-4 group-hover:text-primary transition-all duration-300">
                          Enter Studio <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
              </Link>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      {/* --- AVAILABLE SERVICES --- */}
       <section className="py-20 px-6 bg-zinc-900/50 relative overflow-hidden">
         <div className="max-w-7xl mx-auto text-center">
           <h2 className="text-3xl font-heading font-bold mb-12 text-white">AVAILABLE SERVICES</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                   { icon: Palette, title: "Custom Paint & Wraps", desc: "Unlimited colors and finishes." },
                   { icon: Layers, title: "PPF & Ceramic", desc: "Ultimate protection packages." },
                   { icon: Wrench, title: "Body Modifications", desc: "Kits, wheels, and performance." }
               ].map((service, i) => (
                   <div key={i} className="p-6 border border-white/10 rounded-xl bg-black/50 backdrop-blur-md">
                       <service.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                       <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                       <p className="text-gray-400 text-sm">{service.desc}</p>
                   </div>
               ))}
           </div>
         </div>
       </section>

      {/* --- SHOWCASE IMAGE --- */}
      <section className="py-0 relative h-[60vh] md:h-[80vh] overflow-hidden bg-black">
           <img 
            src={showcaseImg} 
            className="w-full h-full object-cover opacity-90" 
            alt="Customization Showcase" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
           <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 z-10">
              <AnimatedReveal>
                 <h2 className="text-white font-heading text-4xl md:text-6xl font-bold uppercase tracking-wider drop-shadow-lg">
                    VYRONEX <span className="text-primary">MOTORS</span>
                 </h2>
                 <p className="text-gray-200 text-lg md:text-xl mt-2 font-heading tracking-[0.2em] uppercase">
                    The Art of Bespoke
                 </p>
              </AnimatedReveal>
           </div>
      </section>

      {/* --- COMPLETE ALLOY COLLECTION --- */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-[120rem] mx-auto">
          <AnimatedReveal className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Complete <span className="text-primary">Alloy Collection</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Explore our full range of premium alloy wheels, each designed to enhance your vehicle's performance and aesthetics.
            </p>
          </AnimatedReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ALLOYS.map((alloy, i) => (
              <AnimatedReveal key={i} delay={i * 0.1}>
                <div className="group bg-zinc-900 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300">
                  <div className="relative aspect-square bg-zinc-800/50 p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <img 
                      src={alloy.image} 
                      alt={alloy.name} 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                    />
                  </div>
                  <div className="p-6 border-t border-white/5">
                    <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {alloy.name}
                    </h3>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                      {alloy.specs}
                    </div>
                    <div className="text-primary font-bold text-lg">
                      {alloy.price}
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}