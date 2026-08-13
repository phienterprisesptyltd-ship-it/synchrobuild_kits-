import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ image, title, description, category, specifications, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 bg-white ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;