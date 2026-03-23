'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { LogOut, TrendingUp, Users } from 'lucide-react';

export default function VendorDashboardPage() {
  const { user, userType, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userType !== 'vendor') {
      router.push('/');
    }
  }, [userType, router]);

  if (userType !== 'vendor') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-bold">Vendor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome, {user?.name}!</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <Card className="shadow-premium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline">Active Bookings</CardTitle>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">12</div>
            <p className="text-sm text-muted-foreground mt-2">Upcoming events scheduled</p>
          </CardContent>
        </Card>

        <Card className="shadow-premium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-headline">Client Reviews</CardTitle>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">4.9/5</div>
            <p className="text-sm text-muted-foreground mt-2">Based on 34 reviews</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="font-headline">Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" defaultValue={user?.businessName || 'Wedding Services'} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Category</Label>
                <Input id="service" defaultValue={user?.services?.[0] || 'Catering'} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue="Mumbai" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profileDescription">Profile Description</Label>
              <Textarea
                id="profileDescription"
                defaultValue="Professional wedding vendor providing premium services to make your special day unforgettable."
                rows={4}
              />
            </div>
            <Button className="cursor-pointer" onClick={() => alert('Profile saved!')}>
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Verification Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="font-headline">Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
              <p className="text-sm text-muted-foreground">Your profile is verified and trusted by users.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('View bookings coming soon!')}
              >
                View Bookings
              </Button>
              <Button
                variant="outline"
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('Manage portfolio coming soon!')}
              >
                Manage Portfolio
              </Button>
              <Button
                variant="outline"
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('Messages coming soon!')}
              >
                Messages
              </Button>
              <Button
                variant="outline"
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('Analytics coming soon!')}
              >
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
