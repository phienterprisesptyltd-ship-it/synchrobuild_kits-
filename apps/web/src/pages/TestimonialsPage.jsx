import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TestimonialCard from '@/components/TestimonialCard.jsx';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      rating: 5,
      quote: 'The custom engineering provided by Synchro Build was flawless. Our modern coastal home went up without a hitch, and the precision of the steel frames saved us weeks on site.',
      project: 'Modern Coastal Build',
      avatar: 'https://images.unsplash.com/photo-1603991414220-51b87b89a371?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Mark Thompson',
      rating: 5,
      quote: 'We were amazed by the quality of the Truecore® steel frames. As an owner-builder, having materials that fit together perfectly exactly as engineered gave me immense confidence.',
      project: 'Urban Retreat',
      avatar: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Emily Chen',
      rating: 5,
      quote: 'Their 5-day technical support is a game-changer. Any questions we had during the installation phase were answered immediately by knowledgeable engineers.',
      project: 'Hinterland Estate',
      avatar: 'https://images.unsplash.com/photo-1599856413870-40540dd55110?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'David Wilson',
      rating: 4,
      quote: 'From the initial design consultation to final delivery, the process was transparent and professional. The clear span capabilities allowed us to achieve the open-plan warehouse we needed.',
      project: 'Commercial Warehouse',
      avatar: 'https://images.unsplash.com/photo-1645402300832-ac3e97bc57b5?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Jessica Taylor',
      rating: 5,
      quote: 'I brought my own plans, and they engineered them perfectly. The kit delivery was on time, complete, and the assembly manuals were incredibly detailed and easy to follow.',
      project: 'Custom Renovation',
      avatar: 'https://images.unsplash.com/photo-1603991414220-51b87b89a371?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Michael Brown',
      rating: 5,
      quote: 'Highly recommend Synchro Build for any serious owner-builder. The quality of materials is unmatched, and the transparent pricing meant no hidden surprises along the way.',
      project: 'Suburban Duplex',
      avatar: 'https://images.unsplash.com/photo-1575383596664-30f4489f9786?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Amanda White',
      rating: 5,
      quote: 'The structural integrity of our new home is outstanding. The engineering team worked closely with us to ensure our unique architectural vision was fully realized without compromise.',
      project: 'Open-Plan Living Space',
      avatar: 'https://images.unsplash.com/photo-1599856413870-40540dd55110?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Robert Green',
      rating: 5,
      quote: 'Transparent pricing and no hidden fees. The custom design service was worth every penny, resulting in a beautifully engineered kit that exceeded our expectations.',
      project: 'Tropical Nightfall Retreat',
      avatar: 'https://images.unsplash.com/photo-1645402300832-ac3e97bc57b5?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <>
      <Helmet>
        <title>SynchroBuild</title>
        <meta name="description" content="Read what our clients have to say about their experience with Synchro Build's custom-engineered building kits and exceptional support." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/f1ea4035684987239c0d3a081a0af9c2.jpg"
              alt="Beautifully constructed modern home interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
                <MessageSquare className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-white font-medium tracking-wide uppercase text-sm">Client Success Stories</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Built on Trust,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Engineered for Excellence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-medium mb-10 drop-shadow-md max-w-3xl mx-auto">
                Don't just take our word for it. Hear from the owner-builders and contractors who have transformed their visions into reality with Synchro Build.
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <div className="w-10 h-16 border-2 border-white/50 rounded-full mx-auto flex justify-center p-2">
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-1.5 h-3 bg-white rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  rating={testimonial.rating}
                  quote={testimonial.quote}
                  project={testimonial.project}
                  avatar={testimonial.avatar}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                Join our growing list of satisfied clients. Let our engineering team help you bring your custom design to life with precision and confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/inquiry">
                  <Button className="bg-white hover:bg-gray-100 text-blue-700 px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 font-bold">
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/process">
                  <Button className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 font-medium">
                    Learn Our Process
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TestimonialsPage;