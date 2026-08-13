import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';

const Header = ({ setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/design-services', label: 'Design Services' },
    { path: '/process', label: 'Our Process' },
    { path: '/inclusions', label: 'Inclusions' },
    { path: '/inspiration-gallery', label: 'Inspiration Gallery' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/get-started', label: 'Get Started' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-1' : 'bg-white/95 backdrop-blur-sm py-2'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3 group h-full py-2">
            <img 
              src="https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/3bda80279253f8529b6fb07584656d3f.jpg" 
              alt="Synchro Build Logo" 
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col items-start justify-center">
              <span className="text-base font-bold uppercase tracking-widest text-blue-600 leading-none">
                Family Owned
              </span>
              <span className="text-sm text-slate-500 font-medium mt-1">
                Australian Built
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold text-sm xl:text-base transition-colors relative group whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <button 
                onClick={() => setIsCartOpen && setIsCartOpen(true)}
                className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <a 
                href="tel:0257601059" 
                className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap shadow-sm hover:shadow transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>02 5760 1059</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button 
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors mr-1"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <a 
              href="tel:0257601059" 
              className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-7 h-7 text-slate-900" />
              ) : (
                <Menu className="w-7 h-7 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-slate-200 overflow-hidden shadow-xl"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <a 
                  href="tel:0257601059" 
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                >
                  <Phone className="w-5 h-5" />
                  Call 02 5760 1059
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;