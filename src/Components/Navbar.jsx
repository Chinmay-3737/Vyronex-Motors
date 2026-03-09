import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4 md:py-6 bg-black/50 backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <div className="text-xl md:text-2xl font-bold tracking-tighter">
        <span className="text-white">VYRONEX</span>
        <span className="text-primary">MOTORS</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
        <Link to="/" className="text-primary border-b border-primary pb-1">HOME</Link>
        <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">CAR SALES</Link>
        <Link to="/customization" className="text-gray-300 hover:text-white transition-colors">CUSTOMIZATION STUDIO</Link>
        <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">CONTACT</Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl flex flex-col items-center py-10 space-y-8 text-lg font-bold border-b border-white/10 md:hidden animate-in fade-in slide-in-from-top-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-primary">HOME</Link>
          <Link to="/categories" onClick={() => setIsOpen(false)} className="text-white">CAR SALES</Link>
          <Link to="/customization" onClick={() => setIsOpen(false)} className="text-white">STUDIO</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-white">CONTACT</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;