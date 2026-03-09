import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Added pt-20 to account for fixed navbar on mobile */}
      <main className="flex-grow pt-20 md:pt-0">
        {children}
      </main>

      <footer className="py-8 border-t border-white/5 bg-black">
        <div className="text-center text-[10px] md:text-sm font-heading font-bold tracking-widest text-gray-500 uppercase">
          Made With 
          <span className="heartbeat-emoji inline-block mx-2 text-primary">❤️</span> 
          By Chinmay Chaudhari
        </div>
      </footer>
    </div>
  );
}