import React from 'react';
import { Home, Layers, Diamond, PenTool, ShieldCheck, Check, ChevronRight, Info, SquareDashedBottom as SquareDashed } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const lockUpInclusions = [
  'Lightweight steel wall frames',
  'Steel roof framing/trusses/panels',
  'Roof and ceiling battens',
  'Structural steel components',
  'N3 wind rating allowance',
  'Structural fixings',
  'Colorbond roof sheeting',
  'Colorbond fascia and gutter',
  'Roof flashings',
  'External wall cladding allowance',
  'External wall wrap/building wrap',
  'Aluminium windows',
  'Sliding glass doors',
  'Standard external entry door',
  'Window and door locks',
  'Standard ceiling height allowance',
  'Basic material layout and supply documentation',
  'Engineering for structural steel frame system'
];

const lockUpUpgrades = [
  'Higher wind ratings',
  'BAL-rated materials',
  'Alternative roof profiles',
  'Alternative cladding profiles',
  'Larger windows and doors',
  'Double glazing',
  'Feature cladding',
  'Higher ceiling heights'
];

const liningInclusions = [
  'Wall insulation allowance',
  'Ceiling insulation allowance',
  'Roof blanket or reflective foil insulation',
  'Internal plasterboard wall linings',
  'Ceiling plasterboard linings',
  'Wet-area plasterboard',
  'Plasterboard fixings and setting compounds',
  'Internal hollow-core doors',
  'Door jambs',
  'Door hinges',
  'Internal door levers',
  'Cavity slider units',
  'Architraves',
  'Skirting boards',
  'Cornice or square-set ceiling allowance',
  'Robe and cupboard shelving supports',
  'Chrome hanging rails',
  'Linen cupboard shelving allowance'
];

const liningUpgrades = [
  'Higher insulation ratings',
  'Acoustic insulation',
  'Square-set ceilings',
  'Feature internal doors',
  'Higher-grade trims',
  'Custom robe or storage layouts'
];

const floorInclusions = [
  'RHS steel bearers',
  'Steel floor joists',
  'Structural steel floor framing components',
  '19mm structural flooring (Yellow Tongue or equivalent)',
  'Wet-area tile underlay allowance',
  'Floor system fixings',
  'Engineering for steel floor system'
];

const floorExtras = [
  'Steel posts',
  'Post tops and bottoms',
  'Bracing components',
  'Deck framing',
  'Decking materials',
  'Stairs',
  'Balustrades'
];

const designSupport = [
  'Review of preferred design or sketch',
  'Standard plan modification',
  'Preliminary design and quote package',
  'Material scope preparation',
  'Inclusions and exclusions schedule',
  'Structural steel frame documentation',
  'Engineering coordination',
  'BAL upgrade discussion',
  'BASIX/energy report coordination',
  'Council or certifier document checklist',
  'Owner-builder support checklist',
  'Build-stage material supply guidance'
];

const qualityWarranty = [
  '50-Year BlueScope Steel Structural Warranty',
  'Engineered to meet NCC and relevant AS standards',
  'Premium Colorbond® steel components for durability',
  'High-quality hardware and fixings included',
  'Locally manufactured and precision-rolled materials',
  'Comprehensive quality control checks before dispatch'
];

const SupplyAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-6">
      
      {/* 1. Lock-Up Kit Inclusions */}
      <AccordionItem value="lock-up" className="bg-card rounded-card card-shadow border-none data-[state=open]:ring-2 data-[state=open]:ring-blue-100 transition-all px-4 md:px-8">
        <AccordionTrigger className="hover:no-underline py-6 md:py-8">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Home className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Lock-Up Kit Inclusions</h3>
              <p className="text-muted-foreground text-sm md:text-base font-normal mt-1">The essential weatherproof structural shell.</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-8 pt-2">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h4 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                  <Check className="w-5 h-5" />
                </div>
                Typical Inclusions
              </h4>
              <ul className="space-y-3">
                {lockUpInclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                <div className="bg-muted p-1.5 rounded-lg text-foreground/60">
                  <SquareDashed className="w-5 h-5" />
                </div>
                Upgrade Options
              </h4>
              <ul className="space-y-3">
                {lockUpUpgrades.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 2. Internal Lining Kit Inclusions */}
      <AccordionItem value="lining" className="bg-card rounded-card card-shadow border-none data-[state=open]:ring-2 data-[state=open]:ring-purple-100 transition-all px-4 md:px-8">
        <AccordionTrigger className="hover:no-underline py-6 md:py-8">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Layers className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Internal Lining Kit Inclusions</h3>
              <p className="text-muted-foreground text-sm md:text-base font-normal mt-1">Insulation, plasterboard, doors, and internal trims.</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-8 pt-2">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h4 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                  <Check className="w-5 h-5" />
                </div>
                Typical Inclusions
              </h4>
              <ul className="space-y-3">
                {liningInclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                <div className="bg-muted p-1.5 rounded-lg text-foreground/60">
                  <SquareDashed className="w-5 h-5" />
                </div>
                Upgrade Options
              </h4>
              <ul className="space-y-3">
                {liningUpgrades.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 3. Steel Floor System Inclusions */}
      <AccordionItem value="floor" className="bg-card rounded-card card-shadow border-none data-[state=open]:ring-2 data-[state=open]:ring-green-100 transition-all px-4 md:px-8">
        <AccordionTrigger className="hover:no-underline py-6 md:py-8">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <Diamond className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Steel Floor System Inclusions</h3>
              <p className="text-muted-foreground text-sm md:text-base font-normal mt-1">Elevated sub-floor solutions for sloping or raised sites.</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-8 pt-2">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h4 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                  <Check className="w-5 h-5" />
                </div>
                Typical Inclusions
              </h4>
              <ul className="space-y-3">
                {floorInclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-5 flex items-center gap-3 text-lg">
                <div className="bg-muted p-1.5 rounded-lg text-foreground/60">
                  <SquareDashed className="w-5 h-5" />
                </div>
                Optional Extras
              </h4>
              <ul className="space-y-3">
                {floorExtras.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 4. Design, Documentation & Support */}
      <AccordionItem value="support" className="bg-card rounded-card card-shadow border-none data-[state=open]:ring-2 data-[state=open]:ring-orange-100 transition-all px-4 md:px-8">
        <AccordionTrigger className="hover:no-underline py-6 md:py-8">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0">
              <PenTool className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Design, Documentation & Support</h3>
              <p className="text-muted-foreground text-sm md:text-base font-normal mt-1">Our commitment to getting your project approved and built.</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-8 pt-2">
          <div className="bg-muted/50 p-6 md:p-8 rounded-2xl border border-muted">
            <h4 className="font-bold text-foreground mb-6 flex items-center gap-3 text-lg">
              <Info className="w-5 h-5 text-orange-500" />
              Available Support & Coordination
            </h4>
            <ul className="grid md:grid-cols-2 gap-y-4 gap-x-12">
              {designSupport.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* 5. Quality & Warranty */}
      <AccordionItem value="warranty" className="bg-card rounded-card card-shadow border-none data-[state=open]:ring-2 data-[state=open]:ring-teal-100 transition-all px-4 md:px-8">
        <AccordionTrigger className="hover:no-underline py-6 md:py-8">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">Quality & Warranty</h3>
              <p className="text-muted-foreground text-sm md:text-base font-normal mt-1">Australian-made materials, backed by manufacturer warranties.</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-8 pt-2">
          <div className="max-w-3xl">
            <ul className="space-y-4">
              {qualityWarranty.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base leading-relaxed">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
};

export default SupplyAccordion;