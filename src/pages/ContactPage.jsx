import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

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
      <Link to="/customization" className="text-gray-300 hover:text-white transition-colors">CUSTOMIZATION STUDIO</Link>
      <Link to="/contact" className="text-primary border-b border-primary">CONTACT</Link>
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
    <div className="max-w-[120rem] mx-auto mt-16 pt-8 border-t border-white/5 text-center text-xs text-gray-600 uppercase tracking-widest">
      © 2025 VyronexMotors. All rights reserved. Crafted for luxury.
    </div>
  </footer>
);

export default function ContactPage() {
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
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-paragraph">
            Have questions about our premium vehicles or customization services? We're here to help.
          </p>
        </AnimatedReveal>
      </section>

      {/* --- Contact Cards Grid --- */}
      <section className="px-6 pb-20">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Phone, title: 'Phone', lines: ['+91 8766476895', '+91 8766476895'] },
            { icon: Mail, title: 'Email', lines: ['info@vyronexMotors.com', 'chinmaychaudhari312@gmail.com'] },
            { icon: MapPin, title: 'Address', lines: ['Pune, Maharashtra', 'India'] },
            { icon: ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: 'Business Hours', lines: ['Mon - Fri: 10:00 AM - 9:00 PM', 'Sat - Sun: 11:00 AM - 7:00 PM'] }
          ].map((item, index) => (
            <AnimatedReveal key={index} delay={index * 0.1}>
              <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 hover:border-primary/50 transition-all duration-300 group h-full">
                <div className="w-12 h-12 rounded-lg bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors">
                  <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4">{item.title}</h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-gray-400 text-sm font-paragraph uppercase tracking-wider mb-1">{line}</p>
                ))}
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      {/* --- Map Section --- */}
      <section className="h-[60vh] w-full relative border-y border-white/10 overflow-hidden">
        {/* Dark overlay for map styling */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none z-10" />
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9979896405875!2d73.9141!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Market%20City%20Viman%20Nagar!5e0!3m2!1sen!2sin!4v1625641234567!5m2!1sen!2sin"
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        {/* Custom Marker Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <MapPin className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] animate-bounce" />
          <div className="mt-2 bg-black/80 px-4 py-2 rounded-full border border-primary/50 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            Pune, Maharashtra, India
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-zinc-900 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedReveal>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Visit our showroom to explore our exclusive collection of premium vehicles
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 font-bold tracking-wider text-sm hover:bg-red-700 transition-all rounded-sm">
                <Phone className="w-4 h-4" /> CALL US NOW
              </button>
              <button className="flex items-center justify-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 font-bold tracking-wider text-sm hover:bg-white hover:text-black transition-all rounded-sm">
                <Mail className="w-4 h-4" /> SEND EMAIL
              </button>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}