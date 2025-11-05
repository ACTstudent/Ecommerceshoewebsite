import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-2xl">StepStyle</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-gray-600 ${currentPage === 'home' ? 'font-semibold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`hover:text-gray-600 ${currentPage === 'products' ? 'font-semibold' : ''}`}
            >
              Products
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('account')}
                >
                  <User className="h-5 w-5 mr-2" />
                  {user.name}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </Button>
                <Button
                  onClick={() => onNavigate('signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-gray-600"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('products');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-gray-600"
              >
                Products
              </button>
              <button
                onClick={() => {
                  onNavigate('cart');
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:text-gray-600 flex items-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart {getCartCount() > 0 && `(${getCartCount()})`}
              </button>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('account');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left hover:text-gray-600"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left hover:text-gray-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left hover:text-gray-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left hover:text-gray-600"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
