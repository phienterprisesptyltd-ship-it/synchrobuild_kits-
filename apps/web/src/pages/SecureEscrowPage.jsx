import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SecureEscrowPage = () => {
  return (
    <div className="pt-24 md:pt-28 pb-20 bg-slate-50 min-h-screen">
      <Helmet>
        <title>{`CheckVault | Synchro Build`}</title>
        <meta name="description" content="Learn how we protect your investment with CheckVault and Perpetual Corporate Trust secure escrow accounts." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Subtle background texture/gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-blue-100/40 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-8"
            >
              <ShieldCheck className="w-4 h-4" />
              100% Financial Security
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight"
            >
              Protecting Your Investment with Secure Escrow
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium"
            >
              We never ask you to transfer large lump sums to a regular business bank account. To completely eliminate any financial risk for you, we partner with CheckVault and Perpetual Corporate Trust to secure your money safely in an independent trust account until your physical kit home materials arrive on site.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trust Partners & Mechanism Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual / Left Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Lock className="w-64 h-64 text-blue-600" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 relative z-10">
                  Our Secure Partners
                </h2>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">CheckVault</h3>
                      <p className="text-slate-600 mt-1">Australia's leading B2B secure payment platform, ensuring funds are locked and verified before manufacturing begins.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Perpetual Corporate Trust</h3>
                      <p className="text-slate-600 mt-1">An independent, highly regulated trust account holding your funds separate from our operational capital.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text / Right Side (Process) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-10">
                How the Escrow Process Works
              </h2>
              
              <div className="space-y-12">
                {[
                  {
                    step: "01",
                    title: "Funds Secured in Trust",
                    description: "You deposit the required milestone amount into the CheckVault secure trust. We see the funds are verified, giving us the green light to manufacture and order materials, but we cannot access the money.",
                    icon: Lock
                  },
                  {
                    step: "02",
                    title: "Materials Manufactured & Shipped",
                    description: "With funds securely held, our teams confidently fabricate your steel framing and collate your kit components, preparing them for delivery to your site.",
                    icon: Building2
                  },
                  {
                    step: "03",
                    title: "Delivery & Release",
                    description: "Only when the physical kit home materials arrive safely on your site and the delivery is verified, do you authorize the release of funds from the trust account to us.",
                    icon: CheckCircle2
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 relative">
                    {/* Connecting line */}
                    {index !== 2 && (
                      <div className="absolute left-8 top-20 bottom-[-3rem] w-px bg-slate-200" />
                    )}
                    
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center flex-shrink-0 relative z-10 text-blue-600 font-bold text-xl">
                      {item.step}
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl shadow-blue-900/20"
          >
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Build with Complete Confidence
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Ready to start planning your kit home without the financial anxiety? Let's discuss your project and how our secure processes protect you every step of the way.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-50 font-bold px-8 h-14 rounded-xl text-lg">
              <Link to="/inquiry">
                Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default SecureEscrowPage;