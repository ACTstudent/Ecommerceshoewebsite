import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { products } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, ShoppingCart, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductDetailsPageProps {
  productId: number;
  onNavigate: (page: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ 
  productId, 
  onNavigate 
}) => {
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Button onClick={() => onNavigate('products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-black">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('products')} className="hover:text-black">
            Products
          </button>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <Card className="overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <h1 className="text-4xl mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-3xl">${product.price}</p>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="mb-3">Select Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border rounded-md p-3 hover:border-black transition-colors ${
                      selectedSize === size ? 'border-black bg-black text-white' : ''
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="mb-3">Select Color</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md hover:border-black transition-colors ${
                      selectedColor === color ? 'border-black bg-black text-white' : ''
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              {user && (
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    handleAddToCart();
                    setTimeout(() => onNavigate('checkout'), 500);
                  }}
                  disabled={!selectedSize || !selectedColor}
                >
                  Buy Now
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 mt-1" />
                <div>
                  <p>Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 mt-1" />
                <div>
                  <p>Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 mt-1" />
                <div>
                  <p>Secure Payment</p>
                  <p className="text-sm text-gray-600">100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Card 
                  key={relatedProduct.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onNavigate('product-details', relatedProduct.id)}
                >
                  <ImageWithFallback
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600">{relatedProduct.category}</p>
                    <h3 className="mt-1">{relatedProduct.name}</h3>
                    <p className="mt-2">${relatedProduct.price}</p>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
