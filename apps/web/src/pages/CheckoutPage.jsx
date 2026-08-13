import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShoppingCart, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart.jsx';
import { initializeCheckout } from '@/api/EcommerceApi.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-slate-200 max-w-md w-full mx-4">
          <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">You haven't added any design services yet.</p>
          <Link to="/design-services">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-bold">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const customer = {
        email: formData.email,
        external_id: `guest_${Date.now()}` // Provide generic id if not authenticated
      };

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl, customer });
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('There was a problem initializing checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - SynchroBuild</title>
      </Helmet>

      <main className="min-h-screen pt-28 pb-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <Link to="/design-services" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Form Section */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Information</h2>
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-700 font-semibold">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        required 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-700 font-semibold">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        required 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-slate-700 font-semibold">Street Address</Label>
                    <Input 
                      id="address" 
                      name="address" 
                      required 
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl h-12"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-700 font-semibold">City / Suburb</Label>
                      <Input 
                        id="city" 
                        name="city" 
                        required 
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-slate-700 font-semibold">Postcode</Label>
                      <Input 
                        id="postalCode" 
                        name="postalCode" 
                        required 
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-xl h-12"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 sticky top-28">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-6 mb-6 pb-6 border-b border-slate-100">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.variant.id}-${idx}`} className="flex gap-4">
                      {item.product.image ? (
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden">
                          <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0" />
                      )}
                      <div className="flex-grow">
                        <h4 className="font-semibold text-slate-900 text-sm leading-tight mb-1">{item.product.title}</h4>
                        <div className="text-slate-500 text-xs font-medium mb-1">Qty: {item.quantity}</div>
                        <div className="font-bold text-slate-800">
                          {item.variant.sale_price_formatted || item.variant.price_formatted || `$${(item.variant.price_in_cents / 100).toFixed(2)}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-3xl font-extrabold text-blue-600">{getCartTotal()}</span>
                </div>

                <Button 
                  type="submit" 
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-6 text-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </Button>

                <div className="mt-6 flex items-start gap-3 text-slate-500 bg-slate-50 p-4 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <p className="text-xs font-medium leading-relaxed">
                    Payments are secure and encrypted. You will be redirected to our trusted payment provider to complete this transaction safely.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;