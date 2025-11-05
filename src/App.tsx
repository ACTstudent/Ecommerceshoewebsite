import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { AccountPage } from './components/AccountPage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { CheckoutDetailsPage } from './components/CheckoutDetailsPage';

type Page = 'home' | 'login' | 'signup' | 'account' | 'products' | 'product-details' | 'cart' | 'checkout' | 'checkout-details';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<string>('');

  const handleNavigate = (page: string, data?: number | string) => {
    setCurrentPage(page as Page);
    
    if (page === 'product-details' && typeof data === 'number') {
      setSelectedProductId(data);
      window.scrollTo(0, 0);
    } else if (page === 'checkout-details' && typeof data === 'string') {
      setOrderId(data);
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} />;
      case 'account':
        return <AccountPage onNavigate={handleNavigate} />;
      case 'products':
        return <ProductsPage onNavigate={handleNavigate} />;
      case 'product-details':
        return selectedProductId ? (
          <ProductDetailsPage 
            productId={selectedProductId} 
            onNavigate={handleNavigate} 
          />
        ) : (
          <ProductsPage onNavigate={handleNavigate} />
        );
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'checkout-details':
        return <CheckoutDetailsPage orderId={orderId} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
          {renderPage()}
          
          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl mb-4">StepStyle</h3>
                  <p className="text-gray-400">
                    Premium shoes for every occasion. Step into style with confidence.
                  </p>
                </div>
                <div>
                  <h4 className="mb-4">Shop</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <button onClick={() => handleNavigate('products')} className="hover:text-white">
                        All Products
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigate('products')} className="hover:text-white">
                        New Arrivals
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigate('products')} className="hover:text-white">
                        Best Sellers
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4">Customer Service</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="hover:text-white cursor-pointer">Contact Us</li>
                    <li className="hover:text-white cursor-pointer">Shipping Info</li>
                    <li className="hover:text-white cursor-pointer">Returns</li>
                    <li className="hover:text-white cursor-pointer">FAQ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4">Connect</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="hover:text-white cursor-pointer">Facebook</li>
                    <li className="hover:text-white cursor-pointer">Instagram</li>
                    <li className="hover:text-white cursor-pointer">Twitter</li>
                    <li className="hover:text-white cursor-pointer">YouTube</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 StepStyle. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
