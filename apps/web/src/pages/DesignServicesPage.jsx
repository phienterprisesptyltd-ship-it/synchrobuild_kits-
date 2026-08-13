import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, MessageSquare, Edit3, CheckCircle2, Calculator, Clock, RefreshCw, FileCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EstimateYourKitInvestment from '@/components/EstimateYourKitInvestment.jsx';

const DesignServicesPage = () => {
  const processSteps = [
    {
      id: "01",
      icon: CreditCard,
      title: "Pay the fee",
      description: "Secure your design package to officially kick off the process."
    },
    {
      id: "02",
      icon: MessageSquare,
      title: "Interview & Education",
      description: "We consult with you extensively, providing money-saving education to optimize your build."
    },
    {
      id: "03",
      icon: CheckCircle2,
      title: "Receive first design",
      description: "Get your initial architectural layout and exterior 3D renders based on our consultation."
    },
    {
      id: "04",
      icon: Edit3,
      title: "Make changes",
      description: "Two rounds of updates are included. Additional updates are just $45 per revision."
    },
    {
      id: "05",
      icon: Calculator,
      title: "Price your total kit",
      description: "Once the design is finalized, we provide a comprehensive, engineered kit quote."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Design Services - SynchroBuild</title>
        <meta name="description" content="Custom design services from 1st principles. Based on your land, aspect, and features. Super cheap but effective process." />
      </Helmet>
      
      <main className="min-h-screen pt-32 pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Messaging & Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-24">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight"
            >
              Design Services
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-xl text-slate-800 font-semibold leading-relaxed">
                We design what you want from 1st principles.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Designs are based on the land it's going on, its aspect, its features and issues — not based on other floor plans as a template.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed bg-blue-50/50 p-5 rounded-xl border border-blue-100/50">
                We make this super cheap but effective through our interview process. You won't find a cheaper plan price anywhere else.
              </p>
            </motion.div>
          </div>

          {/* Pricing & Interactive Calculator Section */}
          <div className="max-w-5xl mx-auto mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pricing & Configuration</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Select your base package and add extra rooms as needed. 100% of your design fee is credited when you order your kit home — your design effectively costs $0.
              </p>
            </div>

            <EstimateYourKitInvestment />

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6"
            >
              <p className="text-sm text-blue-800 font-medium flex gap-2 leading-snug">
                <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                <span>100% of your design fee is credited when you order your kit home — your design effectively costs $0.</span>
              </p>
            </motion.div>

            {/* Added CTA Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 flex justify-center"
            >
              <Link to="/get-started" className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  className="w-full sm:w-[400px] h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  Start My Design – $495
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Delivery & Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex justify-between items-start gap-2"
            >
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <Clock className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight">7-day<br/>delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <RefreshCw className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight">Unlimited<br/>minor revisions</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 flex-1">
                <FileCheck className="w-5 h-5 text-slate-400" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight">Australian<br/>compliant</span>
              </div>
            </motion.div>
          </div>

          {/* Process Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Custom Design Process</h2>
              <p className="text-lg text-slate-600">Five simple steps to get from initial concept to a fully priced, engineered kit.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-12">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 md:gap-8 items-start group"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="text-5xl md:text-6xl font-black text-slate-200 group-hover:text-blue-200 transition-colors duration-300 tabular-nums leading-none">
                      {step.id}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 flex-grow shadow-sm group-hover:shadow-md transition-shadow group-hover:border-blue-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-blue-600">
                        <step.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <p className="text-slate-600 md:text-lg leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default DesignServicesPage;