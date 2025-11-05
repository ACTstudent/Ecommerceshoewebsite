import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { products } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Filter } from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: string, productId?: number) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of premium shoes</p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.filter(c => c !== 'all').map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
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
                      <span className="text-sm">{product.rating}</span>
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

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
            <Button 
              className="mt-4"
              onClick={() => setSelectedCategory('all')}
            >
              View All Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
