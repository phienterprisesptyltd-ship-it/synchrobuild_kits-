import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const recentProjects = [
    {
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/79a3c9f0aa9e2bb1e51577553f5dba91.jpg',
      title: 'Modern Coastal'
    },
    {
      image: 'https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/efd09240cff135476fb7b8ed2bf5c13e.jpg',
      title: 'Urban Retreat'
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8">
              <div className="bg-white p-5 rounded-xl inline-block shadow-sm">
                <img 
                  src="https://horizons-cdn.hostinger.com/0e3c4b12-5c30-4fff-a4c0-65b7e6df4b83/3bda80279253f8529b6fb07584656d3f.jpg" 
                  alt="Synchro Build Logo" 
                  className="h-20 md:h-24 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              100% custom-engineered building solutions with precision-crafted materials and nationwide delivery across Australia.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Australian Standards Certified</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/process" className="text-sm hover:text-blue-400 transition-colors">Our Process</Link>
              </li>
              <li>
                <Link to="/inspiration-gallery" className="text-sm hover:text-blue-400 transition-colors">Inspiration Gallery</Link>
              </li>
              <li>
                <Link to="/get-started" className="text-sm hover:text-blue-400 transition-colors">Get Started</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:0257601059" className="text-sm font-medium text-white hover:text-blue-400 transition-colors block">
                    02 5760 1059
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Mon-Fri: 8am - 6pm AEST</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:info@synchrobuild.com.au" className="text-sm hover:text-blue-400 transition-colors">info@synchrobuild.com.au</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">Nationwide Delivery</p>
                  <p className="text-xs text-gray-400 mt-1">All Australian States</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Recent Projects</h3>
            <div className="space-y-4 mb-4">
              {recentProjects.map((project, idx) => (
                <Link key={idx} to="/inspiration-gallery" className="group flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors">{project.title}</p>
                    <p className="text-xs text-gray-500 mt-1">View Gallery</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/inspiration-gallery" className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors">
              See all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Synchro Build. All rights reserved. Australian owned and operated.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;