import React from 'react';

const FloorPlanVisual = ({ src, alt, className = '' }) => {
  if (!src) return null;
  
  return (
    <div className={`w-full h-full flex items-center justify-center bg-slate-100 overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt || "Floor plan visual"} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default FloorPlanVisual;