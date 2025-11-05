import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started!</p>
          <Button onClick={() => onNavigate('products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const shipping = getCartTotal() > 100 ? 0 : 9.99;
  const tax = getCartTotal() * 0.08;
  const total = getCartTotal() + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.category}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span>Size: {item.selectedSize}</span>
                            <span>Color: {item.selectedColor}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {getCartTotal() < 100 && (
                    <p className="text-sm text-gray-600">
                      Add ${(100 - getCartTotal()).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="text-2xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                {user ? (
                  <Button 
                    className="w-full mb-3" 
                    size="lg"
                    onClick={() => onNavigate('checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => onNavigate('login')}
                    >
                      Login to Checkout
                    </Button>
                    <p className="text-sm text-center text-gray-600">
                      or{' '}
                      <button
                        onClick={() => onNavigate('signup')}
                        className="text-black hover:underline"
                      >
                        create an account
                      </button>
                    </p>
                  </div>
                )}

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('products')}
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
