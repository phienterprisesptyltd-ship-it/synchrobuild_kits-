import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloorPlanCard from '@/components/FloorPlanCard.jsx';
import { floorPlansData } from '@/data/floorPlans.js';

const FloorPlansPage = () => {
  const [filterType, setFilterType] = useState('All');

  const uniqueTypes = ['All', ...new Set(floorPlansData.map(p => p.type))].sort();

  const filteredPlans = useMemo(() => {
    let result = [...floorPlansData];

    if (filterType !== 'All') {
      result = result.filter(p => p.type === filterType);
    }

    return result;
  }, [filterType]);

  return (
    <>
      <Helmet>
        <title>Floor Plans - SynchroBuild</title>
        <meta name="description" content={`Explore our collection of ${floorPlansData.length} unique pre-engineered floor plans. From modern studios to traditional estates, find the perfect layout for your next build.`} />
      </Helmet>

      <div className="min-h-screen pt-20 flex flex-col bg-[#fafafa]">
        {/* Hero Section */}
        <section className="relative py-20 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold tracking-wider uppercase mb-6 border border-blue-500/30">
                {floorPlansData.length} Unique Designs
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Floor Plans Collection
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Discover our expanded collection of precision-engineered layouts. Designed for efficiency, built with premium Truecore® steel, and ready for your site.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters & Grid */}
        <section className="py-12 flex-grow">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Controls */}
            <div className="flex flex-col md:flex-row justify-start items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Filter className="w-5 h-5 text-slate-400" />
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                >
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type === 'All' ? 'All Styles' : type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlans.map((plan) => (
                <FloorPlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            {filteredPlans.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 text-lg">No floor plans match your selected criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setFilterType('All')}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Customisation Messaging Section */}
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              
              <div className="flex-shrink-0 relative z-10">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6 border border-blue-500">
                  <PenTool className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Need something unique?
                </h2>
                <p className="text-slate-300 mb-8 leading-relaxed max-w-2xl">
                  You don't need to settle for a pre-designed plan. Our engineering team can work with your 
                  existing sketches, architectural drawings, or custom ideas to engineer a solution tailored 
                  specifically to your site and requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/inquiry?pathway=Custom Design Service">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-semibold">
                      Request Custom Plan
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FloorPlansPage;