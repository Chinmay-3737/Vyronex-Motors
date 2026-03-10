import React, { useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Camera, Layers, PenTool } from 'lucide-react';
import Layout from '../Components/Layout';

// --- IMPORT LOCAL STUDIO HERO IMAGES ---
import blackStudioHero from '../assets/Motors-crr.jpg';
// NEW: Import for the White Studio Hero Image
import whiteStudioHero from '../assets/studio-gg.jpg';

// --- IMPORT GALLERY IMAGES ---
// Reusing existing assets for the gallery grid examples
import showcaseImg from '../assets/alloys-cc.jpg';
import matteBlackImg from '../assets/Matte-Black.jpg';
import porscheImg from '../assets/proshes-crr.jpg';
import ferrariImg from '../assets/sport-cc.jpg';

// --- UTILITY COMPONENT ---
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

// --- DATA CONFIGURATION ---
const STUDIO_DATA = {
  white: {
    title: "THE WHITE STUDIO",
    description: "A clinical, high-exposure environment designed for perfectionists. Here, every curve is analyzed, and every finish is perfected under 6000K daylight-balanced lighting.",
    // UPDATED: Using your local studio-gg.jpg image here
    heroImage: whiteStudioHero, 
    themeColor: 'text-gray-200',
    // Using online placeholders for the gallery examples (you can replace these later)
    gallery: [
      { src: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=800', label: 'Ceramic Coating' },
      { src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800', label: 'Paint Correction' },
      { src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800', label: 'Final Inspection' },
      { src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800', label: 'Detailing Bay' },
    ]
  },
  black: {
    title: "THE BLACK STUDIO",
    description: "Where shadows meet structure. This studio is engineered for dramatic reveals, stealth wraps, and heavy customization work. A sanctuary for the bold.",
    // Using your local Motors-crr.jpg image
    heroImage: blackStudioHero, 
    themeColor: 'text-primary',
    // Using your local car images for the gallery examples
    gallery: [
      { src: showcaseImg, label: 'Custom Alloy Fitting' },
      { src: matteBlackImg, label: 'Stealth Wrap Application' },
      { src: porscheImg, label: 'Body Kit Installation' },
      { src: ferrariImg, label: 'Performance Tuning' },
    ]
  }
};

const Header = () => (
    <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="text-2xl font-heading font-bold">
        <span className="text-white">VYRONEX</span><span className="text-primary">MOTORS</span>
      </div>
      <div className="hidden md:flex gap-6 text-sm font-paragraph uppercase tracking-widest">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">HOME</Link>
        <Link to="/customization" className="text-primary border-b border-primary">BACK TO STUDIOS</Link>
      </div>
    </nav>
  );

export default function Studio() {
  const { type } = useParams(); // Gets 'white' or 'black' from the URL
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Determine which studio data to show based on the URL parameter
  // Fallback to 'black' if the type is not recognized
  const content = STUDIO_DATA[type] || STUDIO_DATA.black; 

  // Scroll to top of page when opening a studio
  useEffect(() => window.scrollTo(0, 0), [type]);

  return (
    <Layout>
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" style={{ scaleX }} />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
            <img 
                src={content.heroImage} 
                alt={content.title} 
                className="w-full h-full object-cover opacity-80"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10 pt-20">
            <AnimatedReveal>
                <div className="text-sm font-bold uppercase tracking-[0.5em] mb-4 text-gray-400">
                    Entering
                </div>
                <h1 className="text-5xl md:text-8xl font-heading font-bold mb-6 text-white drop-shadow-2xl">
                    {content.title}
                </h1>
                <p className="max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed mx-auto">
                    {content.description}
                </p>
            </AnimatedReveal>
        </div>
      </section>

      {/* --- STUDIO GALLERY SECTION --- */}
      <section className="py-24 px-6 bg-zinc-900 border-t border-white/10">
        <div className="max-w-[120rem] mx-auto">
            {/* Section Header */}
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-4xl font-heading font-bold">Studio <span className={content.themeColor}>Showcase</span></h2>
                    <p className="text-gray-500 mt-2 text-sm uppercase tracking-wider">Current projects & Environment</p>
                </div>
                {/* Decorative Icons */}
                <div className="hidden md:flex gap-4 text-gray-500">
                    <Camera className="w-6 h-6" />
                    <Layers className="w-6 h-6" />
                    <PenTool className="w-6 h-6" />
                </div>
            </div>

            {/* Grid of Gallery Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.gallery.map((img, index) => (
                    <AnimatedReveal key={index} delay={index * 0.1}>
                        <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black luxury-hover">
                            <img 
                                src={img.src} 
                                alt={img.label} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            />
                            {/* Subtle gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            {/* Image Label */}
                            <div className="absolute bottom-6 left-6">
                                <span className={`text-xs font-bold uppercase tracking-widest ${content.themeColor} mb-1 block`}>
                                    Project 0{index + 1}
                                </span>
                                <h3 className="text-2xl font-heading font-bold text-white group-hover:translate-x-2 transition-transform duration-300">
                                    {img.label}
                                </h3>
                            </div>
                        </div>
                    </AnimatedReveal>
                ))}
            </div>
        </div>
      </section>

      {/* --- BACK NAVIGATION --- */}
      <section className="py-20 text-center bg-black border-t border-white/10">
          <Link to="/customization" className="inline-flex items-center gap-3 text-white hover:text-primary transition-colors text-lg font-bold uppercase tracking-widest luxury-hover">
            <ArrowLeft className="w-5 h-5" /> Return to Studio Selection
          </Link>
      </section>

    </Layout>
  );
}