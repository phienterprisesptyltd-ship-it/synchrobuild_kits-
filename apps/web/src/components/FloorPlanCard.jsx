import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Bath, ArrowRight, Check, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloorPlanVisual from './FloorPlanVisual.jsx';

const FloorPlanCard = ({ plan }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageError(false);
    if (plan.customImages && plan.customImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % plan.customImages.length);
    }
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageError(false);
    if (plan.customImages && plan.customImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + plan.customImages.length) % plan.customImages.length);
    }
  };

  const goToImage = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setImageError(false);
    setCurrentImageIndex(index);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const hasImages = plan.customImages && plan.customImages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden h-full relative"
    >
      <Link to={`/floor-plans/${plan.id}`} className="flex flex-col flex-grow h-full w-full focus:outline-none">
        <div className="relative h-64 overflow-hidden bg-slate-50 border-b border-slate-100 group/carousel flex-shrink-0">
          {hasImages ? (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100"
                >
                  {!imageError ? (
                    <img 
                      src={plan.customImages[currentImageIndex]} 
                      alt={`${plan.name || plan.title} - View ${currentImageIndex + 1}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <ImageOff className="w-10 h-10 mb-2 opacity-50" />
                      <span className="text-sm font-medium">Image unavailable</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              
              {plan.customImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm z-10 text-slate-700 hover:text-slate-900"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-sm z-10 text-slate-700 hover:text-slate-900"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {plan.customImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => goToImage(e, idx)}
                        aria-label={`Go to image ${idx + 1}`}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex 
                            ? 'bg-white scale-110' 
                            : 'bg-white/50 hover:bg-white/80'
                        }`} 
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <FloorPlanVisual plan={plan} className="transition-transform duration-700 group-hover:scale-105" />
          )}
          
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold tracking-wide text-slate-800 shadow-sm border border-slate-200 uppercase z-10">
            {plan.type}
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{plan.name || plan.title}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {(plan.features || []).slice(0, 2).map((feature, idx) => (
                <span key={idx} className="inline-flex items-center text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                  <Check className="w-3 h-3 mr-1 text-blue-500" />
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-4 border-y border-slate-100 mb-6 mt-auto">
            <div className="flex flex-col items-center justify-center text-center">
              <Bed className="w-4 h-4 text-slate-400 mb-1" />
              <span className="text-sm font-bold text-slate-900">{plan.beds}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Beds</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-l border-slate-100">
              <Bath className="w-4 h-4 text-slate-400 mb-1" />
              <span className="text-sm font-bold text-slate-900">{plan.baths}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Baths</span>
            </div>
          </div>

          <div className="flex justify-end mt-auto">
            <Button 
              asChild
              className="bg-slate-900 hover:bg-blue-600 text-white transition-colors duration-300 rounded-xl px-4 py-2 flex items-center gap-2 font-medium text-sm"
            >
              <span>
                Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FloorPlanCard;