import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, ArrowLeft, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const bedrooms = searchParams.get('bedrooms') || '3';
  const bathrooms = searchParams.get('bathrooms') || '2';
  const price = searchParams.get('price') || '0';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    orderNotes: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.customerName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        totalPrice: Number(price),
        orderNotes: formData.orderNotes
      };

      await pb.collection('orders').create(orderData, { $autoCancel: false });
      
      toast.success('Order submitted successfully!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Complete Your Order - SynchroBuild</title>
        <meta name="description" content="Complete your design services order." />
      </Helmet>
      
      <main className="min-h-screen pt-28 pb-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Link 
            to="/design-services" 
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Design Services
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Complete Your Request
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Provide your details below to finalize your concept design request. Our team will review your specifications and contact you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">Your Information</h2>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customerName" className="text-slate-700 font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="h-12 text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 font-medium">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="h-12 text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700 font-medium">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0400 000 000"
                          className="h-12 text-slate-900 bg-slate-50 border-slate-200 focus:bg-white"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label htmlFor="orderNotes" className="text-slate-700 font-medium">
                        Additional Notes (Optional)
                      </Label>
                      <textarea
                        id="orderNotes"
                        value={formData.orderNotes}
                        onChange={handleInputChange}
                        placeholder="Any specific requirements for your block of land?"
                        className="w-full min-h-[100px] p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-14 text-base font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:hover:shadow-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        'Submit Design Request'
                      )}
                    </Button>
                    <p className="text-center text-sm text-slate-500 mt-4">
                      No payment required at this step. Our team will contact you to confirm details.
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-5 sticky top-32">
              <div className="bg-slate-900 rounded-3xl p-8 shadow-lg text-slate-50">
                <h2 className="text-xl font-bold text-white mb-6 pb-6 border-b border-slate-800">
                  Order Summary
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Custom Concept Design</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        Professional architectural layout and exterior 3D rendering tailored to your requirements.
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3 py-4 border-y border-slate-800 text-slate-300">
                    <li className="flex justify-between">
                      <span>Bedrooms</span>
                      <span className="font-medium text-white">{bedrooms}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Bathrooms</span>
                      <span className="font-medium text-white">{bathrooms}</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Investment</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white tracking-tight">
                        ${Number(price).toFixed(2)}
                      </span>
                      <span className="text-slate-400 font-medium pb-1">AUD</span>
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-800/50 rounded-xl p-4">
                    <h4 className="font-semibold text-white text-sm flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" /> Next Steps
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      After submission, our sales team will reach out within 24 hours to schedule a consultation and finalize your project brief.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default OrderPage;