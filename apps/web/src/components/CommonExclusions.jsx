import React from 'react';
import { X } from 'lucide-react';

const exclusionsList = [
  'Site works',
  'Excavation',
  'Concrete slab construction',
  'Piering/footings/groundworks',
  'On-site labour',
  'Builder installation',
  'Crane/forklift/unloading equipment',
  'Plumbing materials/labour',
  'Electrical materials/labour',
  'Waterproofing',
  'Tiling',
  'Painting',
  'Floor coverings',
  'Kitchen joinery',
  'Bathroom joinery',
  'Laundry joinery',
  'Appliances',
  'Tapware/sinks/sanitaryware',
  'Shower screens',
  'Wardrobe sliding doors',
  'Garage doors',
  'Flyscreens',
  'Double glazing',
  'Internal/external stairs',
  'Balustrades',
  'Decking',
  'Downpipes',
  'Council application fees',
  'Certifier fees',
  'Soil test',
  'Survey',
  'Bushfire report',
  'BAL assessment',
  'BASIX/energy report',
  'Delivery',
  'Delivery unloading costs',
  'Any item not specifically listed in written quote'
];

const CommonExclusions = () => {
  return (
    <div className="w-full">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center md:justify-start gap-3">
          <div className="bg-destructive/10 p-2 rounded-xl text-destructive">
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </div>
          Common Exclusions
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto md:mx-0">
          To avoid surprises, it's important to know what is generally <strong className="text-foreground">NOT included</strong> in our standard material supply inclusions. The following items are typically managed by your local builder, trades, or owner-builder directly:
        </p>
      </div>

      <div className="bg-card rounded-card card-shadow border-none p-6 md:p-10 mb-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8">
          {exclusionsList.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-muted-foreground text-sm md:text-base leading-tight">
              <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-muted p-6 rounded-xl border border-muted-foreground/10 flex items-start gap-4">
        <div className="text-muted-foreground mt-0.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-muted-foreground text-sm md:text-base">
          <strong className="text-foreground">Note:</strong> Items shown as "Upgrade Options" or "Optional Extras" above can be added to your supply package for an additional cost — just ask for a written quote.
        </p>
      </div>
    </div>
  );
};

export default CommonExclusions;