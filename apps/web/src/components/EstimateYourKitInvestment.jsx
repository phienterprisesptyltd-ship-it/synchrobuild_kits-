import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, CheckCircle2, Clock, RefreshCw, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PRODUCT_IMAGES = [
  {
    id: 'exterior',
    src: "https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/6527495190ca2e9363ccbd00e49e1476.png",
    alt: "Modern architectural exterior perspective"
  },
  {
    id: 'floorplan',
    src: "https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/7d351ebf40bbb307a62ae5ac75ac6b0c.png",
    alt: "Detailed floor plan layout"
  }
];

const PACKAGES = {
  '1br': { title: '1 Bedroom', beds: 1, baths: 1, cars: '1', price: 395 },
  '2br': { title: '2 Bedroom', beds: 2, baths: 1, cars: '1–2', price: 445 },
  '3br': { title: '3 Bedroom', beds: 3, baths: 2, cars: '2', price: 495, popular: true },
};

const EstimateYourKitInvestment = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState('3br');
  const [extraRooms, setExtraRooms] = useState("0");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const basePrice = PACKAGES[selectedPackage].price;
  const extraRoomRate = 30;
  const totalPrice = basePrice + (parseInt(extraRooms, 10) * extraRoomRate);

  // Carousel auto-advance
  useEffect(() => {
    if (isCarouselHovered) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isCarouselHovered]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  const handleRequestDesign = () => {
    // Navigating directly to /get-started as requested to match the home page behavior
    navigate('/get-started');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 lg:p-8 shadow-xl shadow-slate-200/50">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Carousel & Features */}
        <div className="lg:col-span-7 flex flex-col">
          <div 
            className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50 aspect-[4/3] w-full relative group"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={PRODUCT_IMAGES[currentImageIndex].src}
                alt={PRODUCT_IMAGES[currentImageIndex].alt}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full h-full object-cover object-center absolute inset-0"
              />
            </AnimatePresence>
            
            {/* Carousel Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={prevImage}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 flex items-center justify-center shadow-md hover:bg-white hover:scale-105 transition-all border border-slate-200/50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 flex items-center justify-center shadow-md hover:bg-white hover:scale-105 transition-all border border-slate-200/50"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {PRODUCT_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${
                    idx === currentImageIndex 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-white hover:bg-blue-100'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-bold text-slate-900 shadow-sm border border-slate-100">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Professional Design
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mb-2" />
              <h4 className="font-bold text-slate-900 mb-1 text-sm">Architectural Layouts</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Fully scaled floor plans tailored to your site.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mb-2" />
              <h4 className="font-bold text-slate-900 mb-1 text-sm">Exterior 3D Renders</h4>
              <p className="text-xs text-slate-600 leading-relaxed">High-resolution visuals of your home.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mb-2" />
              <h4 className="font-bold text-slate-900 mb-1 text-sm">Site-Ready Docs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Plans prepared for council and builder conversations.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Calculator */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Design Your Kit Home</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Get architectural floor plans and 3D renders tailored to your block — before you commit to a build.</p>
          </div>

          <div className="space-y-6">
            {/* Base Package Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-900">
                Select Base Package
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(PACKAGES).map(([key, pkg]) => {
                  const isSelected = selectedPackage === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`relative p-4 rounded-xl border text-left transition-all overflow-hidden ${
                        isSelected
                          ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-600 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-xl transform translate-x-8 -translate-y-8 pointer-events-none" />
                      )}
                      {pkg.popular && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap z-10 shadow-sm">
                          Popular
                        </span>
                      )}
                      <div className="relative z-10">
                        <h4 className={`font-bold mb-1.5 text-sm ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                          {pkg.title}
                        </h4>
                        <ul className={`space-y-1 text-[11px] mb-2 ${isSelected ? 'text-blue-800/80 font-medium' : 'text-slate-500'}`}>
                          <li className="flex items-center gap-1.5">
                            <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-slate-300'}`} />
                            {pkg.beds} Bed
                          </li>
                          <li className="flex items-center gap-1.5">
                            <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-blue-500' : 'bg-slate-300'}`} />
                            {pkg.baths} Bath
                          </li>
                        </ul>
                        <p className={`text-base font-black ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                          ${pkg.price}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra Rooms Select */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-900">
                Additional Rooms
              </Label>
              <Select value={extraRooms} onValueChange={setExtraRooms}>
                <SelectTrigger className="w-full h-12 text-sm rounded-lg border-slate-200 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 hover:bg-slate-100 transition-colors">
                  <SelectValue placeholder="Select extra rooms" />
                </SelectTrigger>
                <SelectContent position="popper" side="bottom" sideOffset={4} className="rounded-lg max-h-[300px]">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()} className="py-2 text-sm cursor-pointer">
                      <div className="flex items-center justify-between w-full min-w-[200px]">
                        <span>{num === 0 ? 'No extra rooms' : `+${num} Extra Room${num > 1 ? 's' : ''}`}</span>
                        {num > 0 && <span className="text-slate-500 text-xs ml-4">+${num * extraRoomRate}</span>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Design Package</p>
                <p className="text-[11px] text-slate-500">Comparable draftsperson: <span className="line-through decoration-slate-300">$2,500+</span></p>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums leading-none">
                  ${totalPrice}
                </span>
                <span className="text-xs text-slate-500 font-medium">AUD</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-5">
              <p className="text-[13px] text-blue-800 font-medium flex gap-2 leading-snug">
                <Sparkles className="w-4 h-4 flex-shrink-0 text-blue-600" />
                <span>100% of your design fee is credited when you order your kit home.</span>
              </p>
            </div>

            <Button 
              onClick={handleRequestDesign}
              size="lg"
              className="w-full h-12 text-base font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Start My Design – ${totalPrice}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="flex justify-between items-start mt-6 pt-5 border-t border-slate-100 gap-2">
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-tight">7-day<br/>delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <RefreshCw className="w-4 h-4 text-slate-400" />
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-tight">Unlimited<br/>revisions</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <FileCheck className="w-4 h-4 text-slate-400" />
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-tight">Australian<br/>compliant</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EstimateYourKitInvestment;