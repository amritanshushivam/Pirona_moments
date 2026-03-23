'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, BarChart3, Settings, LogOut } from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, userType, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userType !== 'admin') {
      router.push('/');
    }
  }, [userType, router]);

  if (userType !== 'admin') {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const adminStats = [
    {
      icon: Users,
      title: 'Total Users',
      value: '1,234',
      description: 'Registered users on platform',
    },
    {
      icon: BarChart3,
      title: 'Bookings',
      value: '567',
      description: 'Confirmed wedding bookings',
    },
    {
      icon: Settings,
      title: 'Vendors',
      value: '89',
      description: 'Active vendor accounts',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-bold">Admin Dashboard</h1>
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

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="shadow-premium hover:shadow-premium-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-headline text-lg">{stat.title}</CardTitle>
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Admin Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="shadow-premium">
          <CardHeader>
            <CardTitle className="font-headline">Admin Functions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('User management coming soon!')}
              >
                Manage Users
              </Button>
              <Button
                variant="outline"
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('Vendor management coming soon!')}
              >
                Manage Vendors
              </Button>
              <Button
                variant="outline"
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('Booking management coming soon!')}
              >
                View Bookings
              </Button>
              <Button
                variant="outline"
                className="py-6 font-body cursor-pointer"
                onClick={() => alert('Analytics dashboard coming soon!')}
              >
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
