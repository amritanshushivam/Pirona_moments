'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { LogOut, Heart, Calendar, FileText, Settings } from 'lucide-react';

export default function CustomerDashboard() {
  const { user, userType, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userType !== 'customer' && userType !== null) {
      router.push('/');
    }
  }, [userType, router]);

  if (userType === null) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-headline">Please Login First</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              <Button onClick={() => router.push('/auth/login')} className="mt-4 cursor-pointer">
                Go to Login
              </Button>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const dashboardCards = [
    {
      icon: Calendar,
      title: 'My Weddings',
      description: 'Plan and manage your wedding events',
      action: 'View',
    },
    {
      icon: Heart,
      title: 'Favorites',
      description: 'Your saved vendors and services',
      action: 'Browse',
    },
    {
      icon: FileText,
      title: 'E-Invitations',
      description: 'Create and send digital invitations',
      action: 'Create',
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      action: 'Edit',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="container px-4 md:px-6">
            {/* Welcome Section */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-2">
                    Welcome, {user?.name}! 💍
                  </h1>
                  <p className="text-lg text-muted-foreground font-body">
                    Your personalized wedding planning dashboard
                  </p>
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
            </motion.div>

            {/* Dashboard Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
              {dashboardCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="h-full shadow-premium hover:shadow-premium-lg transition-all cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-4">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl">{card.title}</CardTitle>
                        <CardDescription className="font-body">{card.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="w-full font-body cursor-pointer"
                          onClick={() => alert(`${card.action} feature coming soon!`)}
                        >
                          {card.action}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 shadow-premium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-headline font-bold text-foreground mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="py-6 font-body font-semibold cursor-pointer"
                  onClick={() => window.location.href = '/e-invitations'}
                >
                  Create E-Invitation
                </Button>
                <Button
                  variant="outline"
                  className="py-6 font-body font-semibold cursor-pointer"
                  onClick={() => window.location.href = '/services'}
                >
                  Browse Vendors
                </Button>
                <Button
                  variant="outline"
                  className="py-6 font-body font-semibold cursor-pointer"
                  onClick={() => window.location.href = '/planner'}
                >
                  AI Wedding Planner
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
