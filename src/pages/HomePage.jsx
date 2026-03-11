import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, Palette, Calendar, 
  Shield, Car, Droplets, Layers, Hammer, 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter 
} from 'lucide-react';
import LogoTicker from '../Components/LogoTicker';
import CategoryTicker from '../Components/CategoryTicker';

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

const NeonButton = ({ to, children, variant = 'primary' }) => {
  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-paragraph text-sm uppercase tracking-widest transition-all duration-300 border ${
        variant === 'primary' 
          ? 'bg-primary text-white border-primary hover:bg-red-700' 
          : 'bg-transparent text-white border-white/30 hover:border-primary hover:text-primary'
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

const Header = () => (
  <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-black/50 backdrop-blur-md border-b border-white/10">
    <div className="text-2xl font-heading font-bold">
      <span className="text-white">VYRONEX</span><span className="text-primary">MOTORS</span>
    </div>
    <div className="hidden md:flex gap-6 text-sm font-paragraph uppercase tracking-widest">
      <Link to="/" className="text-primary border-b border-primary">HOME</Link>
      <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">CAR SALES</Link>
      <Link to="/customization" className="text-gray-300 hover:text-white transition-colors">CUSTOMIZATION STUDIO</Link>
      <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">CONTACT</Link>
    </div>
  </nav>
);

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
          <li><Link to="/categories" className="hover:text-primary transition-colors">Car Sales</Link></li>
          <li><Link to="/customization" className="hover:text-primary transition-colors">Customization Studio</Link></li>
          <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
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
          <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
        </div>
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

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const categories = [
    { title: 'VIP Cars', slug: 'vip-cars' },
    { title: 'Luxury Cars', slug: 'luxury-cars' },
    { title: 'Branded Sports', slug: 'branded-sports-cars' },
    { title: '4×4 Vehicles', slug: '4x4-vehicles' },
    { title: 'Monster Trucks', slug: 'monster-trucks' },
  ];
  const features = [
    { icon: Sparkles, title: 'Premium Selection', description: 'Curated collection of VIP cars, luxury vehicles, branded sports cars, 4×4s, and monster trucks.' },
    { icon: Palette, title: 'Full Customization', description: 'Expert color charts, interior/exterior design, and complete body customization services.' },
    { icon: Calendar, title: 'Test Drive Booking', description: 'Experience luxury firsthand with our seamless test drive scheduling system.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-x-hidden">
      <Header />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" style={{ scaleX }} />
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="https://static.wixstatic.com/media/04c535_b4e79ab9c667433988738eb88367d2fe~mv2.png" alt="Hero" className="w-full h-full object-cover opacity-60 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 flex flex-col items-center">
          <AnimatedReveal className="text-center space-y-2">
            <h2 className="font-paragraph text-primary tracking-[0.5em] text-sm md:text-base uppercase mb-4">The Future of Automotive Luxury</h2>
            <div className="relative">
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-heading font-bold leading-[0.8] tracking-tighter text-white mix-blend-overlay opacity-50 select-none">PRECISION</h1>
              <h1 className="absolute top-0 left-0 w-full text-7xl md:text-9xl lg:text-[12rem] font-heading font-bold leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0">PRECISION</h1>
            </div>
            <div className="relative mt-[-2vw]">
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-heading font-bold leading-[0.8] tracking-tighter text-stroke-primary opacity-80">PERFORMANCE</h1>
            </div>
          </AnimatedReveal>
          <AnimatedReveal delay={0.3} className="mt-12 flex flex-col md:flex-row gap-6 items-center">
            <NeonButton to="/categories">Explore Collection</NeonButton>
            <NeonButton to="/customization" variant="outline">Customization Studio</NeonButton>
          </AnimatedReveal>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-widest font-paragraph">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>
      <div className="relative z-20">
        <LogoTicker />
        <CategoryTicker />
      </div>
      <section className="relative py-32 px-6 bg-black">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <AnimatedReveal>
                <div className="w-12 h-1 bg-primary mb-8" />
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-none">BEYOND<br /><span className="text-stroke">ORDINARY</span></h2>
                <p className="font-paragraph text-white/60 text-lg leading-relaxed max-w-md">We don't just sell cars. We curate experiences.</p>
              </AnimatedReveal>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-32 pt-12 lg:pt-0">
            {features.map((feature, index) => {
              const featureImages = [
                'https://static.wixstatic.com/media/04c535_a948e600af30481999ba86515d73e75c~mv2.png',
                'https://static.wixstatic.com/media/04c535_a6304e7ea1ee415483debc80c589fbf7~mv2.png',
                'https://static.wixstatic.com/media/04c535_963d0b77a899476d80bf856ad24c7bb0~mv2.png'
              ];
              return (
                <AnimatedReveal key={index} className="group relative">
                  <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-primary/50 transition-colors duration-500" />
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-8 border border-white/10 group-hover:border-primary/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <img src={featureImages[index]} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-0 left-0 p-8 z-20">
                      <feature.icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-3xl font-heading font-bold text-white mb-2">{feature.title}</h3>
                      <p className="font-paragraph text-white/80 max-w-lg">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <AnimatedReveal>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">THE <span className="text-primary">COLLECTION</span></h2>
            </AnimatedReveal>
            <AnimatedReveal delay={0.2}>
              <Link to="/categories" className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors font-paragraph text-sm uppercase tracking-widest mt-6 md:mt-0">View Full Inventory<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
            </AnimatedReveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
            <div className="md:col-span-8 row-span-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10">
              <Link to="/categories" className="block w-full h-full">
                <img src={'https://static.wixstatic.com/media/04c535_3e460bb9eb0842fdba4b1323158e697f~mv2.png'} alt={categories[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-10">
                  <span className="text-primary font-paragraph text-xs uppercase tracking-widest mb-2 block">Flagship Series</span>
                  <h3 className="text-5xl font-heading font-bold text-white group-hover:text-primary transition-colors">{categories[0].title}</h3>
                </div>
              </Link>
            </div>
            {categories.slice(1).map((category, idx) => {
              const categoryImages = [
                'https://static.wixstatic.com/media/04c535_73aa591ed3284e138f65029b4320cfb6~mv2.png',
                'https://static.wixstatic.com/media/04c535_3598601e9d4b4b119aa5367b64a56c7f~mv2.png',
                'https://static.wixstatic.com/media/04c535_6fd23c04e6674bcb8fcb17d55bb54557~mv2.png',
                'https://static.wixstatic.com/media/04c535_de8c24aaaedc414087d8e4a79f02133a~mv2.png'
              ];
              return (
                <div key={category.slug} className={`md:col-span-4 relative group overflow-hidden rounded-xl border border-white/10 ${idx === 2 ? 'md:col-span-4' : ''}`}>
                  <Link to="/categories" className="block w-full h-full">
                    <img src={categoryImages[idx]} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-heading font-bold text-white mb-2">{category.title}</h3>
                        <div className="h-[1px] w-0 group-hover:w-full bg-primary transition-all duration-500" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="relative py-32 px-6 bg-black overflow-hidden">
        <div className="max-w-[120rem] mx-auto text-center mb-16">
          <AnimatedReveal>
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">Where <span className="text-primary">The Real Magic</span> Happens</h2>
            <p className="font-paragraph text-lg text-white/70 max-w-2xl mx-auto">Our comprehensive suite of services transforms your automotive dreams into reality</p>
          </AnimatedReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {[
              { icon: Palette, label: 'Ceramic Coating', desc: 'Premium protection' },
              { icon: Sparkles, label: 'Clarity Coat', desc: 'Crystal clear finish' },
              { icon: Shield, label: 'Paint Protection', desc: 'Scratch resistant' },
              { icon: Hammer, label: 'Denting Painting', desc: 'Expert restoration' },
              { icon: Droplets, label: 'Car Wash', desc: 'Deep clean service' },
              { icon: Layers, label: 'Glass Film', desc: 'UV protection' }
            ].map((service, index) => (
              <AnimatedReveal key={index} delay={index * 0.05}>
                <div className="flex flex-col items-center text-center p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 group hover:bg-white/5 backdrop-blur-sm h-full">
                  <div className="text-primary mb-4 transform group-hover:scale-110 transition-transform duration-300"><service.icon className="w-8 h-8" /></div>
                  <h3 className="font-heading font-semibold text-white text-sm mb-1">{service.label}</h3>
                  <p className="font-paragraph text-xs text-white/50">{service.desc}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-paragraph uppercase tracking-widest mb-8"><Palette className="w-4 h-4" /> Customization Studio</div>
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight">YOUR VISION.<br /><span className="text-stroke">OUR EXPERTISE.</span></h2>
            <p className="font-paragraph text-white/70 text-lg mb-12 max-w-xl">From custom paint jobs to complete body modifications, our studio brings your dream vehicle to life.</p>
            <NeonButton to="/customization">Start Customizing</NeonButton>
          </AnimatedReveal>
          <AnimatedReveal delay={0.2} className="relative">
            <div className="relative aspect-square rounded-full border border-white/10 p-12 animate-[spin_60s_linear_infinite]"><div className="absolute inset-0 rounded-full border border-dashed border-white/20" /></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 group">
                <img src="https://static.wixstatic.com/media/04c535_a9c3963c4cb24cc89aa854281e87d420~mv2.png" alt="UI" className="w-full h-full object-cover" />
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </section>
      <section className="py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedReveal>
            <h2 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight">READY TO <span className="text-primary">DRIVE?</span></h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <button className="bg-primary text-white px-8 py-4 font-bold tracking-wider text-sm flex items-center justify-center hover:bg-red-700 transition-all">VIEW INVENTORY <ArrowRight className="ml-2 w-4 h-4" /></button>
              <button className="bg-white text-black px-8 py-4 font-bold tracking-wider text-sm flex items-center justify-center hover:bg-gray-200 transition-all">CONTACT SALES</button>
            </div>
          </AnimatedReveal>
        </div>
      </section>
      <Footer />
    </div>
  );
}