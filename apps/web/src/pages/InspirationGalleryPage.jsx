import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard.jsx';
import ProjectModal from '@/components/ProjectModal.jsx';

const InspirationGalleryPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const projects = [
    {
      id: 1,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/6cde55c6e76926a3cdec14a1916c98ab.jpg',
      title: 'Modern Corrugated Estate',
      category: 'Exterior',
      description: 'A striking modern design utilizing corrugated metal cladding and precision steel framing for a durable, contemporary finish.'
    },
    {
      id: 2,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/f8c91778823102edc7d9b4492c9f0bb3.jpg',
      title: 'Tropical Nightfall Retreat',
      category: 'Exterior',
      description: 'Contemporary dark exterior perfectly integrated with tropical landscaping, showcasing our ability to engineer for unique environments.'
    },
    {
      id: 3,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/f1ea4035684987239c0d3a081a0af9c2.jpg',
      title: 'Open-Plan Living Space',
      category: 'Interior',
      description: 'Expansive interior spaces made possible by our advanced structural steel engineering, allowing for massive clear spans without intrusive columns.'
    },
    {
      id: 4,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/1255a62d90404059d0d1c0203834aae7.jpg',
      title: 'Coastal Modern Home',
      category: 'Exterior',
      description: 'Sleek architectural lines combined with robust materials designed to withstand harsh coastal conditions.'
    },
    {
      id: 5,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/d12608438a7c0c1d337d4718230a7f62.jpg',
      title: 'Frame Assembly Phase',
      category: 'Construction',
      description: 'Truecore® steel wall frames and roof trusses being erected on site, demonstrating the precision fit of our pre-engineered components.'
    },
    {
      id: 6,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/dd9b66682fb8b5dfd53e45c455b9418f.jpg',
      title: 'Structural Steel Integration',
      category: 'Construction',
      description: 'Heavy structural steel members integrated seamlessly with light gauge framing to support complex architectural features.'
    },
    {
      id: 7,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/79a3c9f0aa9e2bb1e51577553f5dba91.jpg',
      title: 'Suburban Duplex Design',
      category: 'Exterior',
      description: 'A highly efficient dual-occupancy design maximizing site potential while maintaining distinct, private facades.'
    },
    {
      id: 8,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/efd09240cff135476fb7b8ed2bf5c13e.jpg',
      title: 'Minimalist Urban Infill',
      category: 'Exterior',
      description: 'Clean, minimalist aesthetic applied to a narrow urban block, utilizing every square meter efficiently.'
    },
    {
      id: 9,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/64ee43c492141ee10ff3be9587c5e75a.jpg',
      title: 'Construction Phase Kit Home',
      category: 'Construction',
      description: 'Kit home under construction with steel frame and brick materials on rural property'
    },
    {
      id: 10,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/685ccadb39189af91d11df2ad4273657.jpg',
      title: 'Modern Tropical Kit Home',
      category: 'Exterior',
      description: 'Completed modern kit home with dark corrugated metal cladding in tropical forest setting'
    },
    {
      id: 11,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/fb5ec177493dc832f002c21c2d3f2d09.jpg',
      title: 'Dual Kit Homes',
      category: 'Exterior',
      description: 'Two light blue/grey kit homes on rural property with gravel driveway and green fields'
    },
    {
      id: 12,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/5ca5d8c3bc42f9b2cc252ad2fadf7d65.jpg',
      title: 'Rural Kit Home with Porch',
      category: 'Exterior',
      description: 'Modern kit home with covered porch and landscaping in rural setting'
    },
    {
      id: 13,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/f5eafc18fc4a097ab6490ecd2653af04.jpg',
      title: 'Luxury Kit Home at Sunset',
      category: 'Exterior',
      description: 'Luxury kit home with outdoor dining area, stone wall, and forest views at sunset'
    },
    {
      id: 14,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/f64161a16eb953cb909577c315ac3c89.jpg',
      title: 'Tropical Modern Kit Home',
      category: 'Exterior',
      description: 'Modern dark kit home with tropical landscaping, palm trees, and colorful garden plants'
    },
    {
      id: 15,
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/1c1f1cda2c0470638ef95dd3843989b7.jpg',
      title: 'Modern Kit Home',
      category: 'Exterior',
      description: 'Modern kit home with dark horizontal cladding, timber roof accent, black slat fencing, gravel driveway, and native landscaping with stone features'
    }
  ];

  const filters = ['All', 'Exterior', 'Interior', 'Construction'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleNext = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((prev) => (prev + 1) % filteredProjects.length);
    }
  };

  const handlePrev = () => {
    if (selectedProjectIndex !== null) {
      setSelectedProjectIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  const handleStartProject = () => {
    navigate('/get-started');
  };

  return (
    <>
      <Helmet>
        <title>SynchroBuild</title>
        <meta name="description" content="Explore completed custom homes built with Synchro Build's precision-engineered steel frame systems. Get inspired by real projects showcasing design freedom and quality craftsmanship." />
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
                Inspiration Gallery
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Discover the possibilities of custom engineering. Each project showcases unique designs 
                brought to life with precision-crafted Truecore® steel frame systems.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 min-h-[600px]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSelectedProjectIndex(null);
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Masonry/Grid Layout */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ProjectCard
                      image={project.image}
                      title={project.title}
                      category={project.category}
                      description={project.description}
                      onClick={() => setSelectedProjectIndex(index)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                No projects found in this category.
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                  Your Design Could Be Next
                </h2>
                <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
                  These homes started as sketches and ideas, just like yours. With Synchro Build's 
                  custom engineering, there are no limits to what you can create.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                    <div className="text-gray-700">Custom Designs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-700">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">5 Days</div>
                    <div className="text-gray-700">Technical Support</div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleStartProject}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    Start Your Custom Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <ProjectModal
        isOpen={selectedProjectIndex !== null}
        onClose={() => setSelectedProjectIndex(null)}
        project={selectedProjectIndex !== null ? filteredProjects[selectedProjectIndex] : null}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};

export default InspirationGalleryPage;