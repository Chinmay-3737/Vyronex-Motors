import React from 'react';

const LogoTicker = () => {
  const logos = [
    { name: 'Luxe Auto', weight: 'font-medium' },
    { name: 'Vyronex', weight: 'font-black' },
    { name: 'Custom Vyronex', weight: 'font-semibold' },
  ];

  // Duplicate the logos to create the infinite scroll effect
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full py-12 bg-black/40 backdrop-blur-sm border-t border-white/5 overflow-hidden logo-ticker-container">
      <div className="max-w-[120rem] mx-auto px-6 mb-4">
        <p className="text-[10px] text-center uppercase tracking-[0.4em] text-gray-500 font-medium">
          BRANDS BUILT BY US
        </p>
      </div>
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className={`flex items-center mx-12 text-2xl md:text-3xl lg:text-4xl tracking-tighter text-white/40 hover:text-primary transition-colors duration-500 cursor-default uppercase ${logo.weight}`}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
