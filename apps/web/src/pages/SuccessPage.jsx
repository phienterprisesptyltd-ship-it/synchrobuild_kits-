import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart.jsx';
import { Button } from '@/components/ui/button.jsx';

const SuccessPage = () => {
  const { clearCart, cartItems, getCartTotal } = useCart();
  const [orderTotal, setOrderTotal] = useState('');
  const [itemCount, setItemCount] = useState(0);

  // Capture total before clearing the cart
  useEffect(() => {
    if (cartItems.length > 0) {
      setOrderTotal(getCartTotal());
      setItemCount(cartItems.length);
      clearCart();
    }
  }, [clearCart, cartItems, getCartTotal]);

  return (
    <>
      <Helmet>
        <title>Order Successful - SynchroBuild</title>
      </Helmet>

      <main className="min-h-screen pt-32 pb-20 bg-slate-50 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-16 text-center shadow-sm border border-slate-200 max-w-2xl mx-auto relative overflow-hidden">
            
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500" />
            
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Payment Successful!</h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Thank you for your order. We've received your payment and our design team will be in touch shortly with the next steps.
            </p>
            
            {itemCount > 0 && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-10 text-left">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">Order Summary</h3>
                <div className="flex justify-between items-center text-slate-600 mb-2">
                  <span className="font-medium">Items ordered:</span>
                  <span className="font-bold text-slate-900">{itemCount}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                  <span className="font-medium">Total amount paid:</span>
                  <span className="font-bold text-slate-900">{orderTotal}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/design-services">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 px-8 text-base font-bold flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl py-6 px-8 text-base font-bold flex items-center gap-2">
                  Return Home
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SuccessPage;