import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSignature, Building2, Pencil, ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThreePathwaysSection = () => {
  const pathways = [
    {
      icon: FileSignature,
      title: 'Bring Your Own Design',
      description: 'Already have architectural plans or a sketch? We will engineer your existing design into a precision steel frame kit.',
      features: [
        'Upload your existing plans',
        'Full engineering analysis',
        'Custom structural design',
        'Exact material quantification'
      ],
      ctaText: 'Upload Your Plans',
      ctaLink: '/inquiry',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      icon: Building2,
      title: 'Browse Our Range',
      description: 'Explore our collection of pre-engineered floor plans. Perfect as a starting point or ready to build as-is.',
      features: [
        'Proven, efficient designs',
        'Faster engineering turnaround',
        'Cost-effective starting point',
        'Customizable layouts'
      ],
      ctaText: 'View Floor Plans',
      ctaLink: '/floor-plans',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100'
    },
    {
      icon: Pencil,
      title: 'Custom Design Service',
      description: 'Work with our design team to create a completely unique home tailored to your site, lifestyle, and budget. Design fees start from $1,500 and may vary based on project complexity.',
      features: [
        'Design fees starting from $1,500',
        'One-on-one consultation',
        'Site-specific optimization',
        'Complete creative freedom'
      ],
      ctaText: 'Start Consultation',
      ctaLink: '/inquiry',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Three Pathways to Your Custom Home
          </h2>
          <p className="text-xl text-gray-600">
            Whether you have a complete set of plans or just a vision, we have a pathway to bring your project to life with precision engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pathways.map((pathway, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${pathway.borderColor} group hover:-translate-y-2`}
            >
              <div className={`w-20 h-20 rounded-2xl ${pathway.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pathway.icon className={`w-10 h-10 ${pathway.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{pathway.title}</h3>
              <p className="text-gray-600 mb-8 flex-grow">{pathway.description}</p>
              
              <ul className="space-y-3 mb-8">
                {pathway.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${pathway.bgColor.replace('50', '400')}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={pathway.ctaLink} className="mt-auto">
                <Button className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${pathway.bgColor} ${pathway.color} hover:bg-gray-900 hover:text-white border border-transparent hover:border-gray-900`}>
                  {pathway.ctaText}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-6 text-lg">Not sure which pathway is right for you? Our sales team is ready to help.</p>
          <a href="mailto:sales@synchrobuild.com.au" className="inline-block">
            <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl transition-all duration-300 flex items-center gap-3 font-semibold">
              <Mail className="w-5 h-5" />
              Contact Sales: sales@synchrobuild.com.au
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreePathwaysSection;