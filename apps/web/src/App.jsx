import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ShoppingCart from '@/components/ShoppingCart.jsx';
import { CartProvider } from '@/hooks/useCart.jsx';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';

// Admin Pages
import AdminLoginPage from '@/pages/AdminLoginPage.jsx';
import AdminChatDashboard from '@/pages/AdminChatDashboard.jsx';

// Public Pages
import HomePage from '@/pages/HomePage.jsx';
import ProcessPage from '@/pages/ProcessPage.jsx';
import ExploreSupplyOptions from '@/pages/ExploreSupplyOptions.jsx';
import InspirationGalleryPage from '@/pages/InspirationGalleryPage.jsx';
import InquiryPage from '@/pages/InquiryPage.jsx';
import FloorPlanDetailPage from '@/pages/FloorPlanDetailPage.jsx';
import TestimonialsPage from '@/pages/TestimonialsPage.jsx';
import GetStartedPage from '@/pages/GetStartedPage.jsx';
import InclusionsPage from '@/pages/InclusionsPage.jsx';
import DesignServicesPage from '@/pages/DesignServicesPage.jsx';
import CheckoutPage from '@/pages/CheckoutPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import OrderPage from '@/pages/OrderPage.jsx';
import ThankYouPage from '@/pages/ThankYouPage.jsx';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage.jsx';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage.jsx';

// Layout wrapper for pages that need Header/Footer
const MainLayout = ({ setIsCartOpen }) => (
  <div className="flex flex-col min-h-screen">
    <Header setIsCartOpen={setIsCartOpen} />
    <main className="flex-grow">
      {/* Outlet is critical here - it renders the nested child routes */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ADMIN ROUTES - Public access (not protected) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        
        {/* ADMIN PROTECTED ROUTES */}
        <Route 
          path="/admin/chat" 
          element={
            <ProtectedRoute>
              <AdminChatDashboard />
            </ProtectedRoute>
          } 
        />

        {/* PUBLIC ROUTES WITH LAYOUT */}
        <Route element={<MainLayout setIsCartOpen={setIsCartOpen} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/packages" element={<ExploreSupplyOptions />} />
          <Route path="/inspiration-gallery" element={<InspirationGalleryPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/floor-plans/:planId" element={<FloorPlanDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/inclusions" element={<InclusionsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          
          {/* E-commerce & Ordering routes */}
          <Route path="/design-services" element={<DesignServicesPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          
          {/* Catch-all 404 route */}
          <Route path="*" element={
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
              <p className="text-xl text-slate-600 mb-8">Page not found</p>
              <a href="/" className="text-blue-600 hover:underline font-medium">
                Return to Home
              </a>
            </div>
          } />
        </Route>
      </Routes>
      <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      <Toaster position="top-center" />
    </Router>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </CartProvider>
  );
}

export default App;