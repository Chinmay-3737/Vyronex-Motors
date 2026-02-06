import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

// --- IMPORTS FOR LOCAL IMAGES ---
import mafiaTruckImg from '../assets/mafia-truck.jpg';
import fourByFourImg from '../assets/4x4-car.jpg';

// --- Utility Components ---
const AnimatedReveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay * 1000);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-base ${className || ''}`}>
      {children}
    </div>
  );
};

// --- Header Component ---
const Header = () => (
  <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-black/50 backdrop-blur-md border-b border-white/10">
    <div className="text-2xl font-heading font-bold">
      <span className="text-white">VYRONEX</span><span className="text-primary">MOTORS</span>
    </div>
    <div className="hidden md:flex gap-6 text-sm font-paragraph uppercase tracking-widest">
      <Link to="/" className="text-gray-300 hover:text-white transition-colors">HOME</Link>
      <Link to="/categories" className="text-primary border-b border-primary">CAR SALES</Link>
      <Link to="/customization" className="text-gray-300 hover:text-white transition-colors">CUSTOMIZATION STUDIO</Link>
      <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">CONTACT</Link>
    </div>
  </nav>
);

// --- Footer Component (UPDATED) ---
const Footer = () => (
  <footer className="bg-black py-16 px-6 border-t border-white/10 text-white font-paragraph relative z-10">
    <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <div className="text-2xl font-heading font-bold">
          <span className="text-white">VYRONEX</span><span className="text-primary">MOTORS</span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
          Premium luxury vehicles and expert customization services for the discerning driver.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
        <ul className="space-y-4 text-sm text-gray-400">
          <li><Link to="/categories" className="hover:text-primary">Car Sales</Link></li>
          <li><Link to="/customization" className="hover:text-primary">Customization Studio</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-6">Contact</h3>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +91 8766476895</li>
          <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> info@vyronexmotors.com</li>
          <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Pune, Maharashtra</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-6">Follow Us</h3>
        <div className="flex gap-4">
          {[Facebook, Instagram, Twitter].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Copyright and Signature Section */}
    <div className="max-w-[120rem] mx-auto mt-16 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-4">
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

// --- CATEGORY DATA ---
const CATEGORIES = [
  {
    id: 'monster-trucks',
    title: 'Monster Trucks',
    description: 'Experience the raw power and commanding presence of our Monster Truck collection.',
    image: mafiaTruckImg, 
    color: 'text-primary'
  },
  {
    id: 'vip-cars',
    title: 'VIP Cars',
    description: 'Exclusive, ultra-luxury vehicles for the most discerning clientele.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop',
    color: 'text-white'
  },
  {
    id: 'luxury-cars',
    title: 'Luxury Cars',
    description: 'High-end vehicles combining sophisticated design, advanced technology, and comfort.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1000&auto=format&fit=crop',
    color: 'text-white'
  },
  {
    id: 'sports-cars',
    title: 'Branded Sports Cars',
    description: 'Performance-oriented machines built for speed, handling, and thrill.',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop',
    color: 'text-white'
  },
  {
    id: '4x4-vehicles',
    title: '4x4 Vehicles',
    description: 'Robust and capable off-road vehicles, offering versatility, power, and luxury.',
    image: fourByFourImg, 
    color: 'text-white'
  }
];

// --- Main Page Component ---
export default function CarSales() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white font-paragraph overflow-x-hidden">
      
      <Header />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        <AnimatedReveal>
          <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6">
            Premium <span className="text-primary">Collection</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our exclusive range of luxury vehicles, each category curated for the discerning driver
          </p>
        </AnimatedReveal>
      </section>

      <section className="px-6 pb-32">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <AnimatedReveal key={category.id} delay={index * 0.1}>
              <Link to={`/categories/${category.id}`} className="block group">
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full">
                    <h3 className={`text-4xl font-heading font-bold mb-4 ${category.id === 'monster-trucks' ? 'text-primary' : 'text-white'} group-hover:text-primary transition-colors duration-300`}>
                      {category.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 opacity-80 max-w-sm">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                      View Collection <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}