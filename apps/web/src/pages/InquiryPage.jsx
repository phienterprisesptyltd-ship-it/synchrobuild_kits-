import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, Clock, Shield, HardHat, DollarSign, Headphones, Phone, Mail } from 'lucide-react';
import InquiryForm from '@/components/InquiryForm.jsx';

const InquiryPage = () => {
  const commitments = [
    {
      icon: HardHat,
      title: 'Supply-Only Model',
      description: 'We focus exclusively on engineering and supplying premium materials for serious owner-builders and their contractors.'
    },
    {
      icon: DollarSign,
      title: 'Transparent Design Fees',
      description: 'Clear, upfront pricing. Our custom design consultation starts from $1,500. Fees may vary based on project scope and complexity, ensuring no hidden costs.'
    },
    {
      icon: Shield,
      title: 'Precision Engineering',
      description: 'Every component is engineered to exact Australian standards for a perfect fit on site.'
    },
    {
      icon: Headphones,
      title: '5-Day Technical Support',
      description: 'Expert guidance available 5 days a week throughout your entire build journey.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>SynchroBuild</title>
        <meta name="description" content="Ready to build your custom home? Submit an inquiry to Synchro Build and receive a free consultation with our engineering team. Get your custom quote within 24-48 hours." />
      </Helmet>

      <div className="min-h-screen pt-20">
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Let's Build Your Vision
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Share your project details with us and discover how custom engineering can transform 
                your design into reality. Upload your plans or start a custom consultation today.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="sticky top-28">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    The Synchro Build Commitment
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    We partner with serious owner-builders who demand quality, precision, and reliability. 
                    When you submit an inquiry, you're taking the first step toward a professionally engineered build.
                  </p>

                  <div className="space-y-6 mb-8">
                    {commitments.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-sm border border-gray-100"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          <item.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                    <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      What Happens Next?
                    </h3>
                    <ul className="space-y-3 mt-4 text-blue-50">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                        <span>We review your plans and project brief</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                        <span>Our engineers assess structural requirements</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                        <span>We provide a detailed consultation within 24-48 hours</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7"
              >
                <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">Or reach out directly at</h3>
                    <p className="text-sm text-gray-600">Skip the form and email our sales team with your project details.</p>
                  </div>
                  <a 
                    href="mailto:info@synchrobuild.com.au" 
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
                  >
                    <Mail className="w-5 h-5" />
                    info@synchrobuild.com.au
                  </a>
                </div>
                
                <InquiryForm />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Prefer to Talk First?
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                We understand that every project is unique. If you'd like to discuss your ideas before 
                submitting a formal inquiry, our team is here to help.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-blue-300 transition-colors flex flex-col items-center justify-center">
                  <h3 className="font-bold text-gray-900 mb-3">Call Us</h3>
                  <a 
                    href="tel:0257601059" 
                    className="text-3xl font-bold text-blue-600 mb-3 hover:text-blue-700 transition-colors flex items-center gap-3"
                  >
                    <Phone className="w-8 h-8" />
                    02 5760 1059
                  </a>
                  <p className="text-sm text-gray-600">Mon-Fri: 8am - 6pm AEST</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-blue-300 transition-colors flex flex-col items-center justify-center">
                  <h3 className="font-bold text-gray-900 mb-3">Email Us</h3>
                  <a 
                    href="mailto:info@synchrobuild.com.au"
                    className="text-xl font-semibold text-blue-600 mb-3 hover:text-blue-700 transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-6 h-6" />
                    info@synchrobuild.com.au
                  </a>
                  <p className="text-sm text-gray-600">We respond within 24 hours</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InquiryPage;