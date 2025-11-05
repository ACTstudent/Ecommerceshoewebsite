import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from '../context/AuthContext';
import { User, Package, Settings } from 'lucide-react';

interface AccountPageProps {
  onNavigate: (page: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { user, updateProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saved, setSaved] = useState(false);

  if (!user) {
    onNavigate('login');
    return null;
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, address });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const mockOrders = [
    {
      id: 'ORD-001',
      date: 'Nov 1, 2025',
      total: 259.98,
      status: 'Delivered',
      items: 2
    },
    {
      id: 'ORD-002',
      date: 'Oct 28, 2025',
      total: 129.99,
      status: 'In Transit',
      items: 1
    },
    {
      id: 'ORD-003',
      date: 'Oct 15, 2025',
      total: 189.99,
      status: 'Delivered',
      items: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">My Account</h1>
          <p className="text-gray-600">Manage your account settings and view your orders</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, New York, NY 10001"
                    />
                  </div>

                  {saved && (
                    <p className="text-sm text-green-600">Profile updated successfully!</p>
                  )}

                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View and track your orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="mb-1">Order {order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.date} • {order.items} item{order.items > 1 ? 's' : ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total</p>
                            <p>${order.total.toFixed(2)}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2">Password</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="mb-2 text-red-600">Danger Zone</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back.
                    </p>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete your account?')) {
                          logout();
                          onNavigate('home');
                        }
                      }}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
