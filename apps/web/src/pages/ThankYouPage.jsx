import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle, Home, Calendar, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
  return (
    <>
      <Helmet>
        <title>Order Confirmed - SynchroBuild</title>
        <meta name="description" content="Thank you for your design services order." />
      </Helmet>
      
      <main className="min-h-screen flex items-center justify-center py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 text-center relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-32 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Request Received!
              </h1>
              
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">
                Thank you for choosing SynchroBuild for your design services. We have successfully received your project specifications.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left max-w-2xl mx-auto">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                  <div className="mt-1 bg-white p-2 rounded-full shadow-sm shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">What's Next?</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Our design team will review your requirements. Expect an email with your initial consultation details within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                  <div className="mt-1 bg-white p-2 rounded-full shadow-sm shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Need Help?</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      If you have any immediate questions, feel free to contact us at info@synchrobuild.com.au.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-base rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors">
                  <Link to="/">
                    <Home className="w-5 h-5 mr-2" />
                    Return to Home
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base rounded-xl font-bold border-slate-200 text-slate-700 hover:bg-slate-50">
                  <Link to="/inspiration">
                    View Inspiration Gallery
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
          
        </div>
      </main>
    </>
  );
};

export default ThankYouPage;