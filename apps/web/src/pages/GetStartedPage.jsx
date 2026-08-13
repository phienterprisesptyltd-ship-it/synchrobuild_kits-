import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import InquiryForm from '@/components/InquiryForm.jsx';

const GetStartedPage = () => {
  const [searchParams] = useSearchParams();
  const planName = searchParams.get('plan');

  return (
    <>
      <Helmet>
        <title>Get Started - SynchroBuild</title>
        <meta name="description" content="Start your building journey with SynchroBuild. Fill out our inquiry form to get started on your new steel frame home." />
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-20 bg-[#fafafa]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {planName ? `Getting Started with ${planName}` : 'Let\'s Get Started'}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fill out the form below to begin your journey. Our engineering team will review your details and get back to you within 24-48 hours.
            </p>
          </div>
          
          <InquiryForm prefilledPlanName={planName} />
        </div>
      </div>
    </>
  );
};

export default GetStartedPage;