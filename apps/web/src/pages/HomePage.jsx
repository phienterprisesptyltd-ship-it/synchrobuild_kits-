import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Shield, Truck, 
  Headphones, CheckCircle, Ruler, 
  Phone, TrendingDown, Clock, RefreshCw, FileCheck, Sparkles, Mail,
  CreditCard, MessageSquare, CheckCircle2, Edit3, Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ProjectCard.jsx';
import EstimateYourKitInvestment from '@/components/EstimateYourKitInvestment.jsx';
import ChatWidget from '@/components/ChatWidget.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  const designStages = [
    {
      stage: 1,
      title: 'Pay the fee',
      description: 'Secure your design package to officially kick off the process.',
      icon: CreditCard,
      color: 'bg-blue-500'
    },
    {
      stage: 2,
      title: 'Interview & Education',
      description: 'We consult with you extensively, providing money-saving education to optimize your build.',
      icon: MessageSquare,
      color: 'bg-indigo-500'
    },
    {
      stage: 3,
      title: 'Receive first design',
      description: 'Get your initial architectural layout and exterior 3D renders based on our consultation.',
      icon: CheckCircle2,
      color: 'bg-purple-500'
    },
    {
      stage: 4,
      title: 'Make changes',
      description: 'Two rounds of updates are included. Additional updates are just $45 per revision.',
      icon: Edit3,
      color: 'bg-pink-500'
    },
    {
      stage: 5,
      title: 'Price your total kit',
      description: 'Once the design is finalized, we provide a comprehensive, engineered kit quote.',
      icon: Calculator,
      color: 'bg-rose-500'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: '100% Custom Engineering',
      description: 'Every structural component is engineered from first principles specifically for your project.'
    },
    {
      icon: CheckCircle,
      title: 'Truecore® Steel Materials',
      description: 'Premium Australian-standard materials engineered for durability and precision.'
    },
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      description: 'Complete kit delivery to any location across Australia.'
    },
    {
      icon: Headphones,
      title: '5-Day Technical Support',
      description: 'Expert assistance throughout your entire build journey.'
    }
  ];

  const featuredProjects = [
    {
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/6cde55c6e76926a3cdec14a1916c98ab.jpg',
      title: 'Modern Corrugated Estate',
      category: 'Exterior',
      description: 'A striking modern design utilizing corrugated metal cladding and precision steel framing for a durable, contemporary finish.'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/f8c91778823102edc7d9b4492c9f0bb3.jpg',
      title: 'Tropical Nightfall Retreat',
      category: 'Exterior',
      description: 'Contemporary dark exterior perfectly integrated with tropical landscaping, showcasing our ability to engineer for unique environments.'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/f1ea4035684987239c0d3a081a0af9c2.jpg',
      title: 'Open-Plan Living Space',
      category: 'Interior',
      description: 'Expansive interior spaces made possible by our advanced structural steel engineering, allowing for massive clear spans without intrusive columns.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>SynchroBuild | 100% Custom-Engineered Building Kits</title>
        <meta name="description" content="100% custom-engineered building kits with precision Truecore® steel materials. From concept to delivery, we engineer your vision with nationwide support across Australia." />
      </Helmet>

      <div className="min-h-screen">
        {/* SECTION 1: HERO */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/fc3a3c5be5216ad25773a094c2a3faa8.jpg"
              alt="Modern multi-level dark building with deck nestled in lush tropical forest"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40" />
          </div>

          {/* Price Beat Guarantee Overlay */}
          <div className="absolute top-28 left-4 sm:left-6 lg:left-8 z-20">
            <motion.div
              initial={{ opacity: 0, x: -30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 100 }}
              className="bg-black/50 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-6 shadow-2xl max-w-[320px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="bg-blue-600 rounded-full p-2 shadow-lg">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-black text-lg tracking-tight uppercase">Price Promise</span>
              </div>
              <p className="text-gray-100 font-semibold leading-snug relative z-10 text-lg md:text-xl">
                We will beat any kit home quote by <span className="text-blue-400 font-black text-5xl md:text-6xl drop-shadow-md block mt-2">8.8%</span>
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-gray-100 font-medium mb-8 max-w-3xl mx-auto drop-shadow-md">
                Transform your vision into reality with 100% custom-engineered building solutions. 
                Precision-crafted materials delivered nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/process">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2">
                    Explore Our Process
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                    Start Your Project
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-sm drop-shadow-md"
            >
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white rounded-full" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: DESIGN SERVICES */}
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Design Services
              </h2>
              
              {/* Prominent Value Messaging */}
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 md:p-10 shadow-sm">
                  <p className="text-2xl md:text-3xl font-black text-blue-900 mb-3 leading-tight">
                    Get your design for only <span className="text-blue-600">$495</span>
                  </p>
                  <p className="text-lg text-blue-800 font-semibold leading-relaxed">
                    You won't find cheaper anywhere else
                  </p>
                </div>

                <p className="text-xl text-slate-800 font-semibold leading-relaxed">
                  We design what you want from 1st principles.
                </p>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                  Designs are based on the land it's going on, its aspect, its features and issues — not based on other floor plans as a template.
                </p>
                <div className="bg-blue-50/80 p-5 rounded-xl border border-blue-100/50">
                  <p className="text-sm md:text-base text-slate-700 font-medium">
                    We make this super cheap but effective through our interview process. You won't find a cheaper plan price anywhere else.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Calculator Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <EstimateYourKitInvestment />
            </motion.div>

            {/* Credit-Back Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-6 md:p-8 shadow-sm"
            >
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">Your Design Effectively Costs $0</h3>
                  <p className="text-green-800 leading-relaxed">
                    100% of your design fee is credited when you order your kit home. Your investment in design becomes a credit toward your total build cost.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: DESIGN PROCESS WORKFLOW */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Custom Design Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Five simple steps to get from initial concept to a fully priced, engineered kit.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {designStages.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-50 rounded-xl hover:shadow-lg transition-all duration-300 p-6 border border-slate-100 flex flex-col h-full group"
                >
                  <div className={`${stage.color} w-14 h-14 rounded-lg flex items-center justify-center mb-5 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <stage.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-400 tracking-wider">STEP {stage.stage}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{stage.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">{stage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: FEATURED PROJECTS */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
                <p className="text-lg text-gray-600">
                  Explore a selection of our recently completed custom-engineered homes. 
                  Each project demonstrates our commitment to precision, quality, and design freedom.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/inspiration-gallery">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-5 rounded-lg flex items-center gap-2">
                    View Full Gallery
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  image={project.image}
                  title={project.title}
                  category={project.category}
                  description={project.description}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link to="/get-started">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto">
                  Start Your Design
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: PHILOSOPHY */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  The Synchro Build Philosophy
                </h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Designing accommodation and homes has been our family passion since 2007. Since then, we've built everything from private retreats and wedding venues to hundreds of custom cabins and steel-frame structures.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    For us, the greatest reward is seeing how these spaces transform our clients' lives. We approach every new project with excitement, ready to help you bring your dreams to life.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Over the years, our family has grown our skills and resources to create a seamless, highly synchronized building process that delivers beautiful results every time.
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/process">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 text-base rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
                      Learn More About Our Process
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-slate-50 hover:bg-white rounded-xl p-6 border border-slate-100 hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CTA FOOTER */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/fc3a3c5be5216ad25773a094c2a3faa8.jpg')] bg-cover bg-center mix-blend-overlay opacity-10" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                Ready to Build Your Vision?
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                Let's discuss your project and show you how custom engineering can bring your design to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/get-started" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-600 px-8 py-6 text-lg font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
                <Link to="/inspiration-gallery" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300">
                    View Inspiration Gallery
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 pt-10 border-t border-blue-500/30 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-blue-100">
                <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-blue-200" />
                  <a 
                    href="tel:0257601059" 
                    className="text-lg font-bold text-white hover:text-blue-200 transition-colors"
                  >
                    02 5760 1059
                  </a>
                </div>
                <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                  <Mail className="w-5 h-5 text-blue-200" />
                  <a 
                    href="mailto:info@synchrobuild.com.au" 
                    className="text-lg font-bold text-white hover:text-blue-200 transition-colors"
                  >
                    info@synchrobuild.com.au
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </>
  );
};

export default HomePage;