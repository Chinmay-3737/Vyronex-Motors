import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Filter } from 'lucide-react';

// --- 1. IMPORT LOCAL IMAGES ---
// Note: Case sensitivity matters! I used the capitalization from your screenshot.
import porscheImg from '../assets/proshes-crr.jpg';
import rollsImg from '../assets/royaal-car.jpg';
import bentleyImg from '../assets/sport-cc.jpg';
import defenderImg from '../assets/Vyronex-car.jpg';
import jeepImg from '../assets/jeep-off.jpg';
import hummerImg from '../assets/Hummer-ev.jpg';
import raptorImg from '../assets/gmc-ca.jpg'; // User requested this for the Raptor card
import gWagonImg from '../assets/G wagon.jpg';

// --- DATA: All Cars with Updated Local Images ---
const CAR_DATABASE = {
  'monster-trucks': {
    title: "Monster Trucks",
    description: "Experience the raw power and commanding presence of our Monster Truck collection.",
    cars: [
      {
        id: 'gmc-hummer',
        name: "GMC Hummer EV Pickup",
        year: "2024",
        price: "$110,000",
        specs: { hp: "1000 HP", speed: "170 mph" },
        image: hummerImg, // UPDATED
        tag: "In Stock"
      },
      {
        id: 'ram-trx',
        name: "RAM 1500 TRX",
        year: "2023",
        price: "$90,000",
        specs: { hp: "702 HP", speed: "118 mph" },
        // Keeping online fallback for cars you didn't specify
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop", 
        tag: "Order Now"
      }
    ]
  },
  'vip-cars': {
    title: "VIP Cars",
    description: "Exclusive, ultra-luxury vehicles for the most discerning clientele, offering unparalleled prestige.",
    cars: [
      {
        id: 'tesla-plaid',
        name: "Tesla Model S Plaid",
        year: "2023",
        price: "$110,000",
        specs: { hp: "1020 HP", speed: "322 mph" },
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop",
        tag: "Electric"
      }
    ]
  },
  'luxury-cars': {
    title: "Luxury Cars",
    description: "High-end vehicles combining sophisticated design, advanced technology, and superior driving dynamics.",
    cars: [
      {
        id: 'rolls-royce',
        name: "Rolls-Royce Phantom VIII",
        year: "2024",
        price: "$480,000",
        specs: { hp: "563 HP", speed: "250 mph" },
        image: rollsImg // UPDATED
      },
      {
        id: 'maybach',
        name: "Mercedes-Benz S-Class Maybach",
        year: "2024",
        price: "$220,000",
        specs: { hp: "496 HP", speed: "250 mph" },
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 'bentley',
        name: "Bentley Continental GT Speed",
        year: "2024",
        price: "$330,000",
        specs: { hp: "650 HP", speed: "335 mph" },
        image: bentleyImg // UPDATED
      }
    ]
  },
  'sports-cars': {
    title: "Branded Sports Cars",
    description: "Performance-oriented machines from renowned brands, built for speed, agility, and exhilarating driving.",
    cars: [
      {
        id: 'ferrari-sf90',
        name: "Ferrari SF90 Stradale",
        year: "2023",
        price: "$550,000",
        specs: { hp: "986 HP", speed: "340 mph" },
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: 'porsche-gt3',
        name: "Porsche 911 GT3 RS",
        year: "2023",
        price: "$280,000",
        specs: { hp: "518 HP", speed: "296 mph" },
        image: porscheImg // UPDATED
      }
    ]
  },
  '4x4-vehicles': {
    title: "4x4 Vehicles",
    description: "Robust and capable off-road vehicles, offering versatility, power, and luxury for any adventure.",
    cars: [
      {
        id: 'defender',
        name: "Land Rover Defender 110 V8",
        year: "2023",
        price: "$115,000",
        specs: { hp: "518 HP", speed: "149 mph" },
        image: defenderImg // UPDATED
      },
      {
        id: 'wrangler',
        name: "Jeep Wrangler Rubicon 392",
        year: "2023",
        price: "$90,000",
        specs: { hp: "470 HP", speed: "99 mph" },
        image: jeepImg // UPDATED
      },

      {
        id: 'G Wagon',
        name: "G-Class G 63 AMG",
        year: "2025",
        price: "$115,000",
        specs: { hp: "577 HP", speed: "149 mph" },
        image: gWagonImg
      },

      {
        id: 'raptor',
        name: "Ford F-150 Raptor R",
        year: "2024",
        price: "$110,000",
        specs: { hp: "700 HP", speed: "112 mph" },
        image: raptorImg // UPDATED (using gmc-ca.jpg per request)
      }
    ]
  }
};

// --- Helper Components ---
const Header = () => (
  <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
    <div className="text-2xl font-heading font-bold">
      <span className="text-white">VYRONEX</span><span className="text-primary">MOTORS</span>
    </div>
    <div className="hidden md:flex gap-6 text-sm font-paragraph uppercase tracking-widest">
      <Link to="/" className="text-gray-300 hover:text-white transition-colors">HOME</Link>
      <Link to="/categories" className="text-primary">CAR SALES</Link>
      <Link to="/customization" className="text-gray-300 hover:text-white transition-colors">CUSTOMIZATION STUDIO</Link>
      <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">CONTACT</Link>
    </div>
  </nav>
);

export default function CategoryPage() {
  const { id } = useParams(); // Gets 'monster-trucks', 'vip-cars', etc. from URL
  const data = CAR_DATABASE[id];

  // Scroll to top when loading a category
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) return <div className="text-white text-center pt-40">Category Not Found</div>;

  return (
    <div className="min-h-screen bg-black text-white font-paragraph selection:bg-primary selection:text-white">
      <Header />

      <div className="pt-32 px-6 max-w-[120rem] mx-auto pb-20">
        
        {/* Breadcrumb & Header */}
        <Link to="/categories" className="inline-flex items-center text-gray-500 hover:text-white text-xs uppercase tracking-widest mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">{data.title}</h1>
          <p className="text-gray-400 max-w-2xl text-lg">{data.description}</p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-between items-center border-y border-white/10 py-4 mb-12 gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Filter className="w-4 h-4" />
            <span>{data.cars.length} vehicles available</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-primary text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm">All Prices</button>
            <button className="bg-zinc-900 text-gray-400 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-white/30">Under $200k</button>
            <button className="bg-zinc-900 text-gray-400 border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm hover:border-white/30">$200k+</button>
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/30 border border-white/10 rounded-xl overflow-hidden group hover:border-white/30 transition-all duration-300"
            >
              {/* Image Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">
                  {car.year}
                </div>
              </div>

              {/* Details Area */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2 text-white group-hover:text-primary transition-colors">
                  {car.name}
                </h3>
                
                {/* Description Text */}
                <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-2">
                  A masterpiece of engineering, offering the perfect blend of performance, luxury, and style for the ultimate driving experience.
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6 bg-black/20 p-4 rounded-lg">
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Horsepower</span>
                    <span className="font-heading font-bold text-white">{car.specs.hp}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Top Speed</span>
                    <span className="font-heading font-bold text-white">{car.specs.speed}</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Starting at</span>
                    <span className="text-2xl font-heading font-bold text-primary">{car.price}</span>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}