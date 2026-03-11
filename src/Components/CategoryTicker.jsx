import React from 'react';

const CategoryTicker = () => {
  const categories = [
    { name: 'VIP CARS' },
    { name: 'MONSTER TRUCKS' },
    { name: 'CUSTOM BUILDS' },
    { name: 'LUXURY SEDANS' },
    { name: 'PERFORMANCE SUV' },
    { name: 'CLASSIC RESTORATIONS' },
  ];

  // Duplicate the categories to create the infinite scroll effect
  const duplicatedCategories = [...categories, ...categories, ...categories, ...categories, ...categories, ...categories];

  return (
    <div className="w-full py-4 bg-red-950/20 border-y border-red-900/40 overflow-hidden logo-ticker-container">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center" style={{ animationDuration: '30s' }}>
          {duplicatedCategories.map((item, index) => (
            <div
              key={index}
              className="flex items-center mx-12 text-xs md:text-sm tracking-[0.4em] font-heading font-bold text-primary hover:text-white transition-colors duration-500 cursor-default uppercase"
            >
              {item.name}
              <span className="ml-12 w-1.5 h-1.5 bg-white rounded-full scale-[0.6] opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTicker;
