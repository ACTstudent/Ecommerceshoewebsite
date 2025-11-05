import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { products } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Truck, Shield, CreditCard } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, productId?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl mb-6">Step Into Style</h1>
              <p className="text-xl mb-8 text-gray-300">
                Discover the latest collection of premium shoes designed for comfort and style.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100"
                  onClick={() => onNavigate('products')}
                >
                  Shop Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzaG9lc3xlbnwxfHx8fDE3NjIyMjE0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Featured Shoe"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Truck className="h-12 w-12" />
              </div>
              <h3 className="mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CreditCard className="h-12 w-12" />
              </div>
              <h3 className="mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12" />
              </div>
              <h3 className="mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the best materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Featured Products</h2>
            <p className="text-gray-600">Check out our latest and most popular shoes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Card 
                key={product.id} 
                className="group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onNavigate('product-details', product.id)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                    <h3 className="mb-2">{product.name}</h3>
                    <p className="text-xl">${product.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => onNavigate('products')}
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4">Join Our Newsletter</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get exclusive deals and new product announcements
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-black"
            />
            <Button className="bg-white text-black hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
