import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bed, Bath, Maximize, Shield, CheckCircle, Clock, PenTool, ArrowRight, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloorPlanCard from '@/components/FloorPlanCard.jsx';
import FloorPlanVisual from '@/components/FloorPlanVisual.jsx';
import ImageLightbox from '@/components/ImageLightbox.jsx';
import { floorPlansData } from '@/data/floorPlans.js';

const FloorPlanDetailPage = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  useEffect(() => {
    // Safely compare string IDs and integer IDs
    const foundPlan = floorPlansData.find(p => String(p.id) === String(planId));
    if (foundPlan) {
      setPlan(foundPlan);
      setCurrentImageIndex(0);
      setImageError(false);
      window.scrollTo(0, 0);
    } else {
      navigate('/floor-plans');
    }
  }, [planId, navigate]);

  if (!plan) return null;

  // Show related plans of the same style, avoiding the current plan
  const relatedPlans = floorPlansData
    .filter(p => String(p.id) !== String(plan.id) && p.type === plan.type)
    .slice(0, 3);

  // Fallback if not enough related plans of the same type
  if (relatedPlans.length < 3) {
    const additional = floorPlansData.filter(p => String(p.id) !== String(plan.id) && !relatedPlans.includes(p));
    relatedPlans.push(...additional.slice(0, 3 - relatedPlans.length));
  }

  const hasCustomImages = plan.customImages && plan.customImages.length > 0;

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (hasCustomImages) {
      setImageError(false);
      setCurrentImageIndex((prev) => (prev + 1) % plan.customImages.length);
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (hasCustomImages) {
      setImageError(false);
      setCurrentImageIndex((prev) => (prev - 1 + plan.customImages.length) % plan.customImages.length);
    }
  };

  const goToImage = (index, e) => {
    if (e) e.stopPropagation();
    setImageError(false);
    setCurrentImageIndex(index);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleGetStarted = () => {
    navigate(`/get-started?plan=${encodeURIComponent(plan.name || plan.title)}`);
  };

  const openLightbox = (url) => {
    setSelectedImageUrl(url);
    setIsLightboxOpen(true);
  };

  const getGalleryLabel = (index) => {
    if (index === 0) return 'Floor Plan';
    if (index === 1) return '3D Render';
    return `View ${index + 1}`;
  };

  return (
    <>
      <Helmet>
        <title>{`${plan.name || plan.title} - SynchroBuild`}</title>
        <meta name="description" content={plan.description || `View details for ${plan.name || plan.title}`} />
      </Helmet>

      <div className="min-h-screen pt-20 bg-[#fafafa] pb-20">
        {/* Header / Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/floor-plans" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Floor Plans
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Visual & Details */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Visual Container */}
              <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 md:p-8 relative min-h-[300px] md:min-h-[500px] flex items-center justify-center overflow-hidden group">
                  {hasCustomImages ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-50"
                        >
                          {!imageError ? (
                            <img 
                              src={plan.customImages[currentImageIndex]} 
                              alt={`${plan.name || plan.title} - View ${currentImageIndex + 1}`}
                              onError={handleImageError}
                              className="w-full h-full object-contain cursor-zoom-in transition-transform duration-500 hover:scale-[1.02]"
                              onClick={() => openLightbox(plan.customImages[currentImageIndex])}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-100 rounded-xl w-3/4 h-3/4 max-w-md max-h-64">
                              <ImageOff className="w-16 h-16 mb-4 opacity-50" />
                              <h3 className="text-lg font-bold text-slate-600">Image Unavailable</h3>
                              <p className="text-sm mt-2 text-slate-500">The selected image could not be loaded.</p>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                      
                      {plan.customImages.length > 1 && (
                        <>
                          <button 
                            onClick={prevImage} 
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10 text-slate-700 hover:text-slate-900"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={nextImage} 
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10 text-slate-700 hover:text-slate-900"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md hidden md:flex">
                            {plan.customImages.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => goToImage(idx, e)}
                                aria-label={`Go to image ${idx + 1}`}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                  idx === currentImageIndex 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/50 hover:bg-white/80'
                                }`} 
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <FloorPlanVisual layout={plan.layout} className="w-full h-auto" />
                  )}
                </div>

                {/* Gallery Thumbnails */}
                {hasCustomImages && plan.customImages.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {plan.customImages.map((img, idx) => (
                      <div 
                        key={idx}
                        onClick={() => openLightbox(img)}
                        className={`group relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 aspect-[4/3] bg-slate-50 ${
                          currentImageIndex === idx ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-slate-300'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`View ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="text-white w-6 h-6" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] md:text-xs py-1.5 px-2 text-center font-medium backdrop-blur-sm truncate">
                          {getGalleryLabel(idx)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details Tabs */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <Tabs defaultValue="description" className="w-full">
                  <div className="border-b border-slate-100 px-6 pt-6">
                    <TabsList className="bg-transparent h-auto p-0 flex gap-8">
                      <TabsTrigger 
                        value="description" 
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-4 text-base font-bold text-slate-500 data-[state=active]:text-blue-600"
                      >
                        Description
                      </TabsTrigger>
                      <TabsTrigger 
                        value="features" 
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-4 text-base font-bold text-slate-500 data-[state=active]:text-blue-600"
                      >
                        Design Features
                      </TabsTrigger>
                      <TabsTrigger 
                        value="included" 
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-4 text-base font-bold text-slate-500 data-[state=active]:text-blue-600"
                      >
                        What's Included
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <TabsContent value="description" className="mt-0 outline-none">
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-4">About {plan.name || plan.title}</h3>
                      <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                        {plan.description || "Detailed description coming soon."}
                      </p>
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-start gap-4">
                        <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2">Engineered to Australian Standards</h4>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            Every Synchro Build kit is manufactured using premium Truecore® steel and engineered to comply strictly with AS 1684 and AS 4100. Backed by our 5-day technical support guarantee.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="features" className="mt-0 outline-none">
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Key Features</h3>
                      <ul className="grid sm:grid-cols-2 gap-5">
                        {(plan.features?.length > 0 ? plan.features : [
                          'Premium Truecore® steel frame construction',
                          'Termite and borer proof structural integrity',
                          'Precision CNC-cut components for perfect fit',
                          'Pre-drilled service holes for plumbing/electrical',
                          'High energy efficiency potential',
                          'Customisable roof pitch and ceiling heights',
                          'Engineered for specific wind and terrain ratings',
                          'Non-combustible structural materials'
                        ]).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    <TabsContent value="included" className="mt-0 outline-none">
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-6">Kit Inclusions</h3>
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</div>
                            Structural Frame
                          </h4>
                          <ul className="list-disc list-inside text-slate-600 ml-11 space-y-2 font-medium">
                            <li>Complete Truecore® steel wall frames</li>
                            <li>Engineered roof trusses</li>
                            <li>Floor systems (optional — only if the build is not on a slab)</li>
                            <li>All structural bracing and tie-downs</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">2</div>
                            Documentation
                          </h4>
                          <ul className="list-disc list-inside text-slate-600 ml-11 space-y-2 font-medium">
                            <li>Full structural engineering certification (Form 15)</li>
                            <li>Detailed assembly plans and manuals</li>
                            <li>Comprehensive material quantification list</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">3</div>
                            Support
                          </h4>
                          <ul className="list-disc list-inside text-slate-600 ml-11 space-y-2 font-medium">
                            <li>5-day technical support during construction</li>
                            <li>Direct access to our engineering team</li>
                            <li>Nationwide delivery coordination</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                
                {/* Main Info Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4 border border-slate-200">
                      {plan.type} Design
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">{plan.name || plan.title}</h1>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100 mb-8">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Bed className="w-6 h-6 text-slate-400 mb-2" />
                      <span className="text-xl font-bold text-slate-900">{plan.beds}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Beds</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center border-x border-slate-100">
                      <Bath className="w-6 h-6 text-slate-400 mb-2" />
                      <span className="text-xl font-bold text-slate-900">{plan.baths}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Baths</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                      <Maximize className="w-6 h-6 text-slate-400 mb-2" />
                      <span className="text-xl font-bold text-slate-900">{plan.squareMeters || 'TBA'}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">m²</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button 
                      onClick={handleGetStarted}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-lg rounded-xl shadow-md hover:shadow-xl transition-all duration-300 font-semibold"
                    >
                      Get Started
                    </Button>
                    
                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-slate-400 font-medium">OR</span>
                      </div>
                    </div>

                    <Link to={`/inquiry?pathway=Browse Our Range - Customisation&plan=${encodeURIComponent(plan.name || plan.title)}`} className="block">
                      <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-6 text-lg rounded-xl transition-all duration-300 flex flex-col h-auto items-center justify-center gap-1">
                        <span className="flex items-center gap-2 font-bold">
                          <PenTool className="w-4 h-4" />
                          Request Custom Plan
                        </span>
                        <span className="text-xs font-medium text-slate-500">Modify this layout to suit your needs</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Quick Specs Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <h3 className="font-extrabold text-slate-900 mb-6 text-xl">Specifications</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Total Area</span>
                      <span className="font-bold text-slate-900">{plan.squareMeters || 'TBA'} m²</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Bedrooms</span>
                      <span className="font-bold text-slate-900">{plan.beds}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Bathrooms</span>
                      <span className="font-bold text-slate-900">{plan.baths}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Est. Build Time</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-500" /> 12-16 Weeks
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Material</span>
                      <span className="font-bold text-slate-900">Truecore® Steel</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Related Plans Section */}
        {relatedPlans.length > 0 && (
          <section className="py-20 mt-10 bg-white border-t border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900">Similar Floor Plans</h2>
                <Link to="/floor-plans" className="hidden sm:flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors">
                  View All Plans <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPlans.map((relatedPlan) => (
                  <FloorPlanCard key={relatedPlan.id} plan={relatedPlan} />
                ))}
              </div>
              <div className="mt-8 text-center sm:hidden">
                <Link to="/floor-plans">
                  <Button variant="outline" className="w-full border-slate-200 text-slate-700 font-bold">
                    View All Plans
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>

      <ImageLightbox 
        isOpen={isLightboxOpen}
        imageUrl={selectedImageUrl}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
};

export default FloorPlanDetailPage;