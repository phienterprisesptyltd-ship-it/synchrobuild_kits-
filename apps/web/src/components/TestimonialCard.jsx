import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ name, rating, quote, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 border border-gray-100 flex flex-col h-full"
    >
      <div className="flex items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 flex-grow italic">
        "{quote}"
      </blockquote>
      
      <div className="mt-auto pt-6 border-t border-gray-100">
        <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;