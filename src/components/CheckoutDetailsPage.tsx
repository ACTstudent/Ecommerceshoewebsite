import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

interface CheckoutDetailsPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

export const CheckoutDetailsPage: React.FC<CheckoutDetailsPageProps> = ({ 
  orderId, 
  onNavigate 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-gray-600">
            Order number: <span className="font-mono">{orderId}</span>
          </p>
        </div>

        {/* Order Timeline */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl mb-6">Order Status</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p>Order Confirmed</p>
                  <p className="text-sm text-gray-600">Your order has been received</p>
                </div>
                <span className="text-sm text-gray-600">Just now</span>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="bg-gray-200 rounded-full p-3">
                  <Package className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p>Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your items</p>
                </div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="bg-gray-200 rounded-full p-3">
                  <Truck className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p>Shipped</p>
                  <p className="text-sm text-gray-600">Your order is on the way</p>
                </div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>

              <div className="flex items-start gap-4 opacity-50">
                <div className="bg-gray-200 rounded-full p-3">
                  <Home className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p>Delivered</p>
                  <p className="text-sm text-gray-600">Package has arrived</p>
                </div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl mb-4">What's Next?</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                📧 You'll receive a confirmation email at your registered email address with your order details.
              </p>
              <p>
                📦 Once your order ships, we'll send you a tracking number so you can follow your package.
              </p>
              <p>
                🚚 Estimated delivery: <span>5-7 business days</span>
              </p>
              <p>
                💬 Need help? Contact our customer support at support@stepstyle.com
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => onNavigate('account')}
          >
            View Order Details
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('home')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};
