import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import SupplyAccordion from '@/components/SupplyAccordion.jsx';
import CommonExclusions from '@/components/CommonExclusions.jsx';

const ExploreSupplyOptions = () => {
  return (
    <>
      <Helmet>
        <title>Explore Supply Options - SynchroBuild</title>
        <meta name="description" content="Discover our flexible supply solutions designed to match your build strategy, from structural lock-up kits to comprehensive lining packages." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-20 bg-background selection:bg-primary/20">
        
        {/* Header Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
              Explore Supply Options
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
              Discover our flexible supply solutions designed to match your build strategy. From core structural shells to comprehensive lock-up and lining inclusions.
            </p>
            
            {/* Trust Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <div className="bg-card px-5 py-2.5 rounded-full card-shadow border border-border text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Structural steel frame system
              </div>
              <div className="bg-card px-5 py-2.5 rounded-full card-shadow border border-border text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                50-year BlueScope steel warranty
              </div>
              <div className="bg-card px-5 py-2.5 rounded-full card-shadow border border-border text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Engineered to NCC & AS standards
              </div>
            </div>
          </motion.div>
        </section>

        {/* Accordions Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SupplyAccordion />
          </motion.div>
        </section>

        {/* Common Exclusions Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <CommonExclusions />
          </motion.div>
        </section>

      </div>
    </>
  );
};

export default ExploreSupplyOptions;