import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Wrench, 
  Home, 
  Shield, 
  Package, 
  Layers, 
  DoorOpen, 
  Wind, 
  Grid, 
  PlusCircle,
  XCircle
} from 'lucide-react';

const InclusionsPage = () => {
  const kitComponents = [
    {
      id: 'steel-frame',
      title: '2. Steel Frame Kit',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      items: [
        'Truecore® steel wall studs and tracks',
        'Noggings and bracing as per engineering',
        'All structural steel components for load-bearing walls',
        'Pre-punched service holes for electrical and plumbing',
        'Structural beams, lintels, and portal frames (if applicable)'
      ]
    },
    {
      id: 'roof-system',
      title: '3. Roof System',
      icon: Layers,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      items: [
        'Truecore® steel roof trusses or rafters',
        'Ridge beams, purlins, and battens',
        'Colorbond® roof sheeting',
        'Ridge capping, barge, and gable trim',
        'Gutter and downpipe materials'
      ]
    },
    {
      id: 'external-cladding',
      title: '4. External Wall Cladding',
      icon: Grid,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      items: [
        'Choice of Colorbond® steel cladding or James Hardie® fiber cement',
        'Corner trims and joining profiles',
        'Flashings and weather seals',
        'All required fixing screws and accessories'
      ]
    },
    {
      id: 'windows-doors',
      title: '5. Windows and External Doors',
      icon: DoorOpen,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      items: [
        'Aluminum-framed windows (standard series)',
        'Sliding or hinged external doors',
        'Flyscreens for all openable windows',
        'Door hardware (handles, locks, hinges)',
        'Window and door flashings'
      ]
    },
    {
      id: 'insulation-wraps',
      title: '6. Insulation and Wraps',
      icon: Wind,
      color: 'text-sky-600',
      bgColor: 'bg-sky-100',
      items: [
        'Wall wrap/building wrap',
        'Roof sarking/reflective foil',
        'Moisture barrier membranes',
        'Tapes and sealants for weather-tightness',
        'Wall and ceiling insulation batts (R-value as per NCC requirements)'
      ]
    },
    {
      id: 'internal-lining',
      title: '7. Internal Lining Kit',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      items: [
        'Plasterboard sheets (standard or fire-rated as required)',
        'Cornice and ceiling battens',
        'Joining compounds and tapes',
        'Fixing screws and accessories'
      ]
    },
    {
      id: 'internal-doors-trims',
      title: '8. Internal Doors and Trims',
      icon: DoorOpen,
      color: 'text-fuchsia-600',
      bgColor: 'bg-fuchsia-100',
      items: [
        'Hollow-core or solid-core internal doors',
        'Door frames and architraves',
        'Door handles, hinges, and latches',
        'Skirting boards and window sills',
        'Finishing nails and adhesives'
      ]
    },
    {
      id: 'robes-cupboards',
      title: '9. Robes and Cupboards',
      icon: Package,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      items: [
        'Basic robe shelving and hanging rails',
        'Linen cupboard shelving',
        'Pantry shelving (if specified)',
        'Melamine or similar finish materials'
      ]
    },
    {
      id: 'steel-floor',
      title: '10. Steel Floor System',
      icon: Wrench,
      color: 'text-rose-600',
      bgColor: 'bg-rose-100',
      items: [
        'Truecore® steel floor joists and bearers',
        'Subfloor bracing and noggings',
        'Structural steel posts and footings brackets',
        'Particle board or plywood flooring substrate',
        'Moisture-resistant sheeting for wet areas'
      ]
    }
  ];

  const designAndDoc = [
    'Structural engineering calculations and certifications (Form 15)',
    'Wind and load engineering to Australian standards',
    'Detailed assembly plans and installation manuals',
    'Comprehensive material quantification list',
    '5-day technical support during construction'
  ];

  const optionalUpgrades = [
    'Bushfire Attack Level (BAL) rated materials and construction',
    'Cyclonic wind rating upgrades for high-wind zones',
    'Site-specific engineering for sloping or difficult sites',
    'Upgraded cladding profiles or architectural features',
    'Double-glazed windows and upgraded insulation packages'
  ];

  const commonExclusions = [
    'Site clearing, excavation, earthworks, and retaining walls',
    'Concrete footings, slab, and concrete pumping',
    'Construction labor, trades, crane hire, and scaffolding',
    'Plumbing, electrical, HVAC, and gas installations',
    'Kitchen cabinetry, bathroom vanities, and appliances',
    'Floor coverings, painting, and tiling',
    'Council application fees, soil tests, and utility connections'
  ];

  return (
    <>
      <Helmet>
        <title>Kit Home Inclusions - Synchro Build</title>
        <meta name="description" content="Complete guide to what's included in Synchro Build kit homes. From steel framing to delivery, understand exactly what you receive in your custom-engineered building kit." />
      </Helmet>

      <div className="min-h-screen bg-[#fafafa] pb-24">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                Kit Home Inclusions
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                A comprehensive guide to everything included in your custom-engineered building kit.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl -mt-10 relative z-20">
          
          {/* 1. Introduction */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-slate-200 mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 rounded-xl p-3">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">1. Introduction</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed font-medium">
              Final inclusions are confirmed in your written quote. This guide provides a comprehensive overview of what is typically supplied in a Synchro Build kit. Every project is unique, and your final quotation will detail the exact materials, specifications, and services included based on your custom design and requirements.
            </p>
          </motion.section>

          {/* 2-10. Kit Components */}
          <div className="space-y-8 mb-12">
            {kitComponents.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${section.bgColor} rounded-xl p-3`}>
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ))}
          </div>

          {/* 11. Design and Documentation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200 mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-indigo-100 rounded-xl p-3">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">11. Design and Documentation</h2>
            </div>
            <ul className="space-y-4">
              {designAndDoc.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* 12. Optional Upgrades */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200 mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-amber-100 rounded-xl p-3">
                <PlusCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">12. Optional Upgrades</h2>
            </div>
            <ul className="space-y-4">
              {optionalUpgrades.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <PlusCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* 13. Common Exclusions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-red-50 rounded-2xl shadow-sm p-8 border border-red-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-100 rounded-xl p-3">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-red-900">13. Common Exclusions Unless Quoted</h2>
            </div>
            <p className="text-red-800 mb-6 font-medium">
              The following items are typically NOT included in a standard Synchro Build kit unless specifically quoted and agreed upon:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {commonExclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-900 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

        </div>
      </div>
    </>
  );
};

export default InclusionsPage;