import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  Info, 
  ArrowRight, 
  Home, 
  Layers, 
  Maximize, 
  PenTool,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const lockUpInclusions = [
  'Lightweight steel wall frames',
  'Steel roof framing/trusses/panels',
  'Roof and ceiling battens',
  'Structural steel components',
  'N3 wind rating allowance',
  'Structural fixings',
  'Colorbond roof sheeting',
  'Colorbond fascia and gutter',
  'Roof flashings',
  'External wall cladding allowance',
  'External wall wrap/building wrap',
  'Aluminium windows',
  'Sliding glass doors',
  'Standard external entry door',
  'Window and door locks',
  'Standard ceiling height allowance',
  'Basic material layout and supply documentation',
  'Engineering for structural steel frame system'
];

const lockUpUpgrades = [
  'Higher wind ratings',
  'BAL-rated materials',
  'Alternative roof profiles',
  'Alternative cladding profiles',
  'Larger windows and doors',
  'Double glazing',
  'Feature cladding',
  'Higher ceiling heights'
];

const liningInclusions = [
  'Wall insulation allowance',
  'Ceiling insulation allowance',
  'Roof blanket or reflective foil insulation',
  'Internal plasterboard wall linings',
  'Ceiling plasterboard linings',
  'Wet-area plasterboard',
  'Plasterboard fixings and setting compounds',
  'Internal hollow-core doors',
  'Door jambs',
  'Door hinges',
  'Internal door levers',
  'Cavity slider units',
  'Architraves',
  'Skirting boards',
  'Cornice or square-set ceiling allowance',
  'Robe and cupboard shelving supports',
  'Chrome hanging rails',
  'Linen cupboard shelving allowance'
];

const liningUpgrades = [
  'Higher insulation ratings',
  'Acoustic insulation',
  'Square-set ceilings',
  'Feature internal doors',
  'Higher-grade trims',
  'Custom robe or storage layouts'
];

const floorInclusions = [
  'RHS steel bearers',
  'Steel floor joists',
  'Structural steel floor framing components',
  '19mm structural flooring (Yellow Tongue or equivalent)',
  'Wet-area tile underlay allowance',
  'Floor system fixings',
  'Engineering for steel floor system'
];

const floorExtras = [
  'Steel posts',
  'Post tops and bottoms',
  'Bracing components',
  'Deck framing',
  'Decking materials',
  'Stairs',
  'Balustrades'
];

const designSupport = [
  'Review of preferred design or sketch',
  'Standard plan modification',
  'Preliminary design and quote package',
  'Material scope preparation',
  'Inclusions and exclusions schedule',
  'Structural steel frame documentation',
  'Engineering coordination',
  'BAL upgrade discussion',
  'BASIX/energy report coordination',
  'Council or certifier document checklist',
  'Owner-builder support checklist',
  'Build-stage material supply guidance'
];

const exclusionsList = [
  'Site works',
  'Excavation',
  'Concrete slab construction',
  'Piering/footings/groundworks',
  'On-site labour',
  'Builder installation',
  'Crane/forklift/unloading equipment',
  'Plumbing materials/labour',
  'Electrical materials/labour',
  'Waterproofing',
  'Tiling',
  'Painting',
  'Floor coverings',
  'Kitchen joinery',
  'Bathroom joinery',
  'Laundry joinery',
  'Appliances',
  'Tapware/sinks/sanitaryware',
  'Shower screens',
  'Wardrobe sliding doors',
  'Garage doors',
  'Flyscreens',
  'Double glazing',
  'Internal/external stairs',
  'Balustrades',
  'Decking',
  'Downpipes',
  'Council application fees',
  'Certifier fees',
  'Soil test',
  'Survey',
  'Bushfire report',
  'BAL assessment',
  'BASIX/energy report',
  'Delivery',
  'Delivery unloading costs',
  'Any item not specifically listed in written quote'
];

const commitmentList = [
  'What is included',
  'What is excluded',
  'What is optional',
  'What still needs to be confirmed',
  'What information we need from you',
  'What the next step is'
];

const PackagesPage = () => {
  return (
    <>
      <Helmet>
        <title>Kit Home Inclusions - SynchroBuild</title>
        <meta name="description" content="Explore comprehensive details of our kit home supply inclusions. Understand exactly what's included, optional upgrades, and common exclusions for transparent planning." />
      </Helmet>

      <div className="min-h-screen pt-20 bg-[#fafafa]">
        {/* Hero Section */}
        <section className="relative py-24 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="packages-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#packages-grid)" />
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
                Transparent Supply
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight text-balance">
                Our Kit Home Inclusions
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Discover our flexible supply solutions designed to match your build strategy. 
                From core structural shells to comprehensive lock-up and lining inclusions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-balance">
              Pricing Philosophy & Project Variables
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Synchro Build, we believe in complete transparency. Our inclusions are designed to give you a strong foundation, 
              but we recognise that a "one size fits all" approach doesn't work for real-world construction. 
              <strong> Final inclusions and pricing will always vary based on your specific design, engineering requirements, 
              site conditions, BAL (Bushfire Attack Level) rating, wind rating, delivery location, and any custom upgrades you select.</strong>
            </p>
          </div>
        </section>

        {/* Accordion Inclusions Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore Supply Options</h2>
              <p className="text-slate-600 text-lg">Expand the sections below to review standard inclusions and upgrade possibilities for each supply stage.</p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-6">
              
              {/* Lock-Up Kit */}
              <AccordionItem value="lock-up" className="bg-white border border-slate-200 rounded-2xl shadow-sm px-2 md:px-6 data-[state=open]:border-blue-300 data-[state=open]:ring-4 data-[state=open]:ring-blue-50 transition-all">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">Lock-Up Kit Inclusions</h3>
                      <p className="text-slate-500 text-sm font-normal mt-1">The essential weatherproof structural shell.</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        Typical Inclusions
                      </h4>
                      <ul className="space-y-3">
                        {lockUpInclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm md:text-base leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Maximize className="w-5 h-5 text-blue-500" />
                        Upgrade Options
                      </h4>
                      <ul className="space-y-3">
                        {lockUpUpgrades.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm md:text-base leading-snug">
                            <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Internal Lining Kit */}
              <AccordionItem value="lining" className="bg-white border border-slate-200 rounded-2xl shadow-sm px-2 md:px-6 data-[state=open]:border-blue-300 data-[state=open]:ring-4 data-[state=open]:ring-blue-50 transition-all">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">Internal Lining Kit Inclusions</h3>
                      <p className="text-slate-500 text-sm font-normal mt-1">Insulation, plasterboard, doors, and internal trims.</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        Typical Inclusions
                      </h4>
                      <ul className="space-y-3">
                        {liningInclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm md:text-base leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Maximize className="w-5 h-5 text-indigo-500" />
                        Upgrade Options
                      </h4>
                      <ul className="space-y-3">
                        {liningUpgrades.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm md:text-base leading-snug">
                            <ChevronRight className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Steel Floor System */}
              <AccordionItem value="floor" className="bg-white border border-slate-200 rounded-2xl shadow-sm px-2 md:px-6 data-[state=open]:border-blue-300 data-[state=open]:ring-4 data-[state=open]:ring-blue-50 transition-all">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-6 h-6 text-emerald-600 rotate-90" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">Steel Floor System Inclusions</h3>
                      <p className="text-slate-500 text-sm font-normal mt-1">Elevated sub-floor solutions for sloping or raised sites.</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        Typical Inclusions
                      </h4>
                      <ul className="space-y-3">
                        {floorInclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm md:text-base leading-snug">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Maximize className="w-5 h-5 text-emerald-500" />
                        Optional Extras
                      </h4>
                      <ul className="space-y-3">
                        {floorExtras.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-700 text-sm md:text-base leading-snug">
                            <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Support */}
              <AccordionItem value="support" className="bg-white border border-slate-200 rounded-2xl shadow-sm px-2 md:px-6 data-[state=open]:border-blue-300 data-[state=open]:ring-4 data-[state=open]:ring-blue-50 transition-all">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <PenTool className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">Design, Documentation & Support</h3>
                      <p className="text-slate-500 text-sm font-normal mt-1">Our commitment to getting your project approved and built.</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pt-2">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Info className="w-5 h-5 text-orange-500" />
                      Available Support & Coordination
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                      {designSupport.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-snug">
                          <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </section>

        {/* Exclusions Section */}
        <section className="py-20 bg-slate-100 border-y border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <X className="w-8 h-8 text-red-500" />
                Common Exclusions
              </h2>
              <p className="text-slate-600 text-lg max-w-3xl">
                To avoid surprises, it's important to know what is generally <strong>not included</strong> in our standard material supply inclusions. The following items are typically managed by your local builder, trades, or owner-builder directly:
              </p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                {exclusionsList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                    <X className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Important Note & CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-2xl p-8 md:p-10 mb-12 shadow-sm">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Important Note</h3>
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    Every project is different. Final pricing and inclusions depend on the selected design, site location, engineering, 
                    BAL rating, wind rating, delivery distance, customer selections and approval requirements.
                  </p>
                  <p className="text-slate-900 font-semibold mb-4">Before you commit, we will clearly explain:</p>
                  <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                    {commitmentList.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Ready to start planning?</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Reach out to our team to discuss your specific requirements. We can tailor a supply solution that fits your exact site and budget needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Link to="/get-started" className="flex items-center gap-2">
                    Request a Quote
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg rounded-xl">
                  <Link to="/inquiry">
                    General Inquiry
                  </Link>
                </Button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default PackagesPage;