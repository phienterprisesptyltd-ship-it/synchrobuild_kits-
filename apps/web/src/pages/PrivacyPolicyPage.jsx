import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | SynchroBuild</title>
        <meta name="description" content="Read our privacy policy to understand how SynchroBuild collects, uses, and protects your personal information." />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 lg:p-16"
          >
            <div className="border-b border-slate-100 pb-8 mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                Last updated: July 5, 2026
              </p>
            </div>

            <div className="space-y-12 text-slate-700 leading-relaxed">
              
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. What Information We Collect</h2>
                <p className="mb-3">
                  To provide you with our custom-engineered building kits and design services, we collect various types of personal information. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li><strong>Personal details:</strong> Your name, email address, phone number, and billing/delivery addresses.</li>
                  <li><strong>Project specifics:</strong> Site location, budget estimates, floor plan preferences, and land characteristics.</li>
                  <li><strong>Financial data:</strong> Payment information required to process design fees and kit purchases (processed securely through our payment partners).</li>
                  <li><strong>Technical data:</strong> IP addresses, browser types, device information, and site interaction metrics.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Collect Information</h2>
                <p className="mb-3">
                  We collect information through several different channels:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li><strong>Directly from you:</strong> When you submit an inquiry form, request a quote, speak with our team over the phone, or correspond via email.</li>
                  <li><strong>Automatically:</strong> Through the use of cookies and similar tracking technologies when you navigate our website.</li>
                  <li><strong>Third parties:</strong> Occasionally, we may receive information from building certifiers or consultants you have authorized to work with us on your behalf.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Why We Collect and Use Your Information</h2>
                <p className="mb-3">
                  We utilize your personal information for the following core purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li><strong>Service delivery:</strong> To provide accurate structural engineering, architectural designs, and comprehensive kit quotes tailored to your specific site.</li>
                  <li><strong>Communication:</strong> To respond to inquiries, provide project updates, and offer technical support during your build.</li>
                  <li><strong>Fulfillment:</strong> To organize nationwide delivery of your Truecore® steel materials.</li>
                  <li><strong>Improvement:</strong> To analyze user behavior and enhance our website, services, and product offerings.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Who We Share Your Information With</h2>
                <p className="mb-3">
                  We respect your privacy and do not sell your personal information. We may share necessary details with trusted third parties exclusively to facilitate your project:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-3">
                  <li><strong>Logistics partners:</strong> Freight and transport companies required to deliver your kit to the site location.</li>
                  <li><strong>Engineering consultants:</strong> Third-party structural engineers or local certifiers involved in approving your design.</li>
                  <li><strong>Service providers:</strong> Payment gateways, IT infrastructure providers, and secure cloud storage facilities that operate under strict confidentiality agreements.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Direct Marketing</h2>
                <p className="mb-3">
                  With your consent, we may send you marketing communications regarding new floor plans, promotional offers, or educational building content. You can opt out of these communications at any time by clicking the "unsubscribe" link at the bottom of our emails, or by contacting us directly. Opting out will not affect critical communications regarding your ongoing project or orders.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies and Analytics</h2>
                <p className="mb-3">
                  Our website utilizes cookies to ensure optimal functionality and to analyze site traffic. Cookies are small data files stored on your device that help us remember your preferences and understand how you interact with our site. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our site may be impaired.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Storage and Security</h2>
                <p className="mb-3">
                  We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Data is stored on secure, encrypted servers, and we adhere to industry best practices for data management. We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by Australian law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Accessing and Correcting Your Information</h2>
                <p className="mb-3">
                  You have the right to request access to the personal information we hold about you and to ask for corrections if you believe the data is inaccurate, out of date, or incomplete. To exercise these rights, please contact us using the details provided below. We will respond to your request within a reasonable timeframe and in accordance with applicable privacy laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Complaints</h2>
                <p className="mb-3">
                  If you have concerns about how we have handled your personal information, please contact us at <strong>info@synchrobuild.com.au</strong> with a detailed description of your complaint. We take privacy matters seriously and will investigate your claim, aiming to provide a resolution within 30 days. If you are unsatisfied with our response, you may escalate the matter to the Office of the Australian Information Commissioner (OAIC).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Policy</h2>
                <p className="mb-3">
                  We reserve the right to modify this Privacy Policy at any time to reflect changes in our business operations or legal obligations. Any updates will be published on this page, and the "Last updated" date at the top will be revised accordingly. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
                </p>
              </section>

            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Contact Us</h3>
              <p className="text-slate-600">
                For any privacy-related inquiries, please reach out to us at:<br />
                <a href="mailto:info@synchrobuild.com.au" className="text-blue-600 hover:underline font-medium">info@synchrobuild.com.au</a> or call <a href="tel:0257601059" className="text-blue-600 hover:underline font-medium">02 5760 1059</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;