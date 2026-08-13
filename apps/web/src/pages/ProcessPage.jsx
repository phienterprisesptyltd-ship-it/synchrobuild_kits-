import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Ruler, Package, Truck, Headphones, ArrowRight, CheckCircle, Sparkles, Lock, Home, DollarSign, Shield, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProcessPage = () => {
  const processSteps = [
    {
      icon: Ruler,
      title: 'Design',
      subtitle: 'Design & Selection',
      description: 'Your plans, our plans or choose/adapt one of our standard plans.',
      details: [
        'Bring your own custom plans',
        'Choose from our pre-engineered range',
        'Adapt a standard plan to your needs',
        'Initial design consultation'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: DollarSign,
      title: 'Quotation',
      subtitle: 'Pricing & Options',
      description: 'We will quote your kit including any options you have selected.',
      details: [
        'Comprehensive kit quotation',
        'Inclusion of selected optional extras',
        'Transparent pricing breakdown',
        'Value engineering review'
      ],
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'Approval & Deposit',
      subtitle: 'Documentation & DA',
      description: 'A deposit is paid that releases all the council required docs such as engineering etc for your council DA process.',
      details: [
        'Initial deposit payment',
        'Release of engineering documentation',
        'Support for council DA process',
        'Compliance certification'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Wrench,
      title: 'Manufacturing',
      subtitle: 'Manufacturing & CC',
      description: 'After council DA approval we will complete the docs required for CC and begin manufacturing.',
      details: [
        'Completion of CC documentation',
        'Precision CNC manufacturing',
        'Truecore® steel framing fabrication',
        'Quality assurance checks'
      ],
      color: 'from-pink-500 to-pink-600',
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/d12608438a7c0c1d337d4718230a7f62.jpg',
      imageCaption: 'Precision manufacturing of your custom-engineered steel frames'
    },
    {
      icon: Truck,
      title: 'Delivery & Installation',
      subtitle: 'Logistics & Handover',
      description: 'Approx 4 to 8 weeks depending on complexity of the kit your kit will be delivered and final payment made.',
      details: [
        '4 to 8 weeks manufacturing timeline',
        'Nationwide site delivery coordination',
        'Final payment processing',
        'Comprehensive assembly manuals provided'
      ],
      color: 'from-rose-500 to-rose-600'
    }
  ];

  const advantages = [
    {
      title: 'Design Freedom',
      description: 'Build exactly what you want, not what a catalog offers. Your design, your way.',
      icon: Sparkles
    },
    {
      title: 'Precision Engineering',
      description: 'Every component calculated and manufactured to exact specifications for perfect fit.',
      icon: Ruler
    },
    {
      title: 'Premium Materials',
      description: 'Truecore® steel and Australian-standard materials engineered for durability.',
      icon: CheckCircle
    },
    {
      title: 'Expert Support',
      description: '5-day technical support throughout your build journey from experienced engineers.',
      icon: Headphones
    }
  ];

  return (
    <>
      <Helmet>
        <title>SynchroBuild</title>
        <meta name="description" content="Discover how Synchro Build transforms your design concept into a precision-engineered building kit. From engineering analysis to nationwide delivery with 5-day support." />
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
                Our 5-Stage Supply Process
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Your journey from initial design to complete building kit delivery. 
                Every step engineered with precision, backed by expert support.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative mb-20 last:mb-0"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg z-10 relative`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>

                    <div className="flex-1 w-full">
                      <div className="mb-4">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                          Stage {index + 1}
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900 mt-1">{step.title}</h2>
                        <p className="text-lg text-blue-600 font-semibold mt-1">{step.subtitle}</p>
                      </div>

                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            What's Included
                          </h3>
                          <ul className="space-y-3">
                            {step.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {step.image && (
                          <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 group relative h-full min-h-[250px]">
                            <img 
                              src={step.image} 
                              alt={step.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-sm font-medium">{step.imageCaption}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute left-10 top-24 bottom-[-4rem] w-0.5 bg-gradient-to-b from-gray-300 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Custom Engineering?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The difference between pre-designed solutions and true custom engineering
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <advantage.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <Headphones className="w-8 h-8 text-white" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    5-Day Technical Support
                  </h2>
                </div>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Our commitment doesn't end at delivery. Throughout your build, our experienced engineers 
                  are available to answer questions, provide guidance, and ensure your project stays on track. 
                  From foundation to final touches, we're with you every step of the way.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">5 Days</div>
                    <div className="text-blue-100">Weekly Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">100%</div>
                    <div className="text-blue-100">Custom Solutions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">24-48h</div>
                    <div className="text-blue-100">Response Time</div>
                  </div>
                </div>
                <div className="text-center">
                  <Link to="/inquiry">
                    <Button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2">
                      Start Your Project Today
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProcessPage;