import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TermsAndConditionsPage = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions | SynchroBuild</title>
        <meta name="description" content="Read our terms and conditions to understand the rules, guidelines, and agreements for using SynchroBuild services and purchasing our custom-engineered building kits." />
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
                Terms and Conditions
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                Last updated: July 5, 2026
              </p>
            </div>

            <div className="space-y-12 text-slate-700 leading-relaxed">
              
              {/* Introduction */}
              <div>
                <p className="mb-4">
                  Welcome to SynchroBuild ("we," "our," or "us"). These Terms and Conditions govern your access to and use of our website, design services, and the purchase of custom-engineered building kits. 
                </p>
                <p>
                  By accessing our website or engaging our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
                </p>
              </div>

              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. About Our Services</h2>
                <div className="space-y-4">
                  <p>1.1. SynchroBuild provides custom architectural design, structural engineering, and the supply of Truecore® steel building kits tailored to individual client specifications and site requirements.</p>
                  <p>1.2. We do not provide construction or installation services. We operate solely as a designer, engineer, and supplier of building materials.</p>
                  <p>1.3. Any references to timelines, build costs, or third-party contractor availability are estimates only and do not form part of a binding contract unless explicitly stated in writing.</p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Design Packages</h2>
                <div className="space-y-4">
                  <p>2.1. We offer custom design packages starting at $495. This fee covers the initial consultation, one initial architectural layout, exterior 3D renders, and two rounds of design revisions.</p>
                  <p>2.2. Additional revisions beyond the included two rounds will be charged at $45 per revision, billed prior to the release of updated drawings.</p>
                  <p>2.3. The design fee is fully credited toward the final purchase price of your building kit if you proceed with an order through SynchroBuild within twelve (12) months of the final design completion.</p>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Intellectual Property and Design Reuse</h2>
                <div className="space-y-4">
                  <p>3.1. All designs, floor plans, engineering drawings, and 3D renders produced by SynchroBuild remain the exclusive intellectual property of SynchroBuild until the full kit is purchased.</p>
                  <p>3.2. Purchasing a design package grants you a limited, non-exclusive license to use the design strictly for the purpose of seeking building approvals and quoting, provided you intend to purchase the kit from us.</p>
                  <p>3.3. You may not distribute, sell, or use our designs to procure steel frames or building kits from competitor suppliers without our express written consent.</p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Orders, Payment and Our Price Promise</h2>
                <div className="space-y-4">
                  <p>4.1. Quotes for building kits are valid for thirty (30) days from the date of issue due to fluctuations in global steel and material prices.</p>
                  <p>4.2. A formal kit order is only accepted once a binding purchase agreement is signed and the specified non-refundable manufacturing deposit is received.</p>
                  <p>4.3. <strong>Price Promise:</strong> We guarantee to beat any written, comparable quote for a custom-engineered kit home by 8.8%. The competing quote must be from an Australian registered business, dated within the last 30 days, and include equivalent materials (e.g., Truecore® steel) and engineering specifications.</p>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cancellations and Refunds — Design Packages</h2>
                <div className="space-y-4">
                  <p>5.1. Design package fees ($495) are non-refundable once the initial design interview/consultation has been conducted.</p>
                  <p>5.2. If you cancel your design package prior to the consultation, a full refund will be issued, less any administrative or payment gateway fees incurred by us.</p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Kit Homes</h2>
                <div className="space-y-4">
                  <p>6.1. <strong>Manufacturing:</strong> Manufacturing of your kit will not commence until final engineering approvals and local council permits (if applicable to the manufacturing timeline) have been confirmed by you.</p>
                  <p>6.2. <strong>Delivery:</strong> We deliver nationwide. Delivery dates are estimates only. We are not liable for delays caused by extreme weather, freight disruptions, or events beyond our reasonable control.</p>
                  <p>6.3. <strong>Risk and Title:</strong> Risk of loss or damage to the kit materials passes to you upon delivery to the site. Title to the materials passes to you only when full and final payment has been received by SynchroBuild.</p>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Responsibilities</h2>
                <div className="space-y-4">
                  <p>7.1. You are solely responsible for obtaining all necessary local council approvals, building permits, and zoning variances required for your site.</p>
                  <p>7.2. You must provide accurate site information, including soil tests, wind ratings, and topographical surveys, which inform our structural engineering.</p>
                  <p>7.3. You are responsible for ensuring the delivery site is accessible, safe, and prepared to receive heavy freight vehicles.</p>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Website Content</h2>
                <div className="space-y-4">
                  <p>8.1. All content on this website, including images, text, logos, and digital assets, is the property of SynchroBuild and is protected by Australian and international copyright laws.</p>
                  <p>8.2. Images of completed projects and 3D renders are indicative only. Final products may vary based on site conditions, chosen finishes, and engineering requirements.</p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Australian Consumer Law</h2>
                <div className="space-y-4">
                  <p>9.1. Nothing in these Terms limits or excludes any guarantees, warranties, representations, or conditions implied or imposed by law, including the Australian Consumer Law (ACL), which by law may not be limited or excluded.</p>
                  <p>9.2. If you are a consumer under the ACL, our goods and services come with guarantees that cannot be excluded. For major failures with the service, you are entitled: to cancel your service contract with us; and to a refund for the unused portion, or to compensation for its reduced value.</p>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Limitation of Liability</h2>
                <div className="space-y-4">
                  <p>10.1. To the maximum extent permitted by law, SynchroBuild shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, arising out of or related to your use of our services or building kits.</p>
                  <p>10.2. We are not liable for the actions, workmanship, or errors of any third-party builders, contractors, or certifiers you engage to assemble or approve the kit.</p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Privacy</h2>
                <div className="space-y-4">
                  <p>11.1. We handle your personal information in accordance with our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
                  <p>11.2. By using our services, you consent to the collection, use, and sharing of your information as detailed in the Privacy Policy, specifically for the purposes of quoting, engineering, and fulfillment.</p>
                </div>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">12. General</h2>
                <div className="space-y-4">
                  <p>12.1. <strong>Severability:</strong> If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</p>
                  <p>12.2. <strong>Governing Law:</strong> These Terms and Conditions are governed by and construed in accordance with the laws of New South Wales, Australia. You submit to the exclusive jurisdiction of the courts located in New South Wales.</p>
                  <p>12.3. <strong>Amendments:</strong> We reserve the right to update or modify these Terms at any time. Material changes will be communicated via our website or email.</p>
                </div>
              </section>
              
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Contact Us</h3>
              <p className="text-slate-600">
                If you have any questions regarding these Terms and Conditions, please contact us at:<br />
                <a href="mailto:legal@synchrobuild.com.au" className="text-blue-600 hover:underline font-medium">legal@synchrobuild.com.au</a> or call <a href="tel:0257601059" className="text-blue-600 hover:underline font-medium">02 5760 1059</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPage;