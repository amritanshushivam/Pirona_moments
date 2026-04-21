'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { EventsSection } from '@/components/dashboard/EventsSection';
import { GuestsSection } from '@/components/dashboard/GuestsSection';
import { VendorsSection } from '@/components/dashboard/VendorsSection';
import { BudgetSection } from '@/components/dashboard/BudgetSection';
import { InvitationsSection } from '@/components/dashboard/InvitationsSection';
import { TasksSection } from '@/components/dashboard/TasksSection';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

export default function CustomerDashboard() {
  const { user, userType, logout, isLoading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'overview' | 'events' | 'guests' | 'vendors' | 'budget' | 'invitations' | 'tasks'>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (userType !== 'customer' && userType !== null) {
      router.push('/');
    }
  }, [userType, router]);

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12 h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Loading your dashboard...</h1>
          </div>
        </main>
      </>
    );
  }

  if (userType === null) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Please Login First</h1>
            <Button onClick={() => router.push('/auth/login')} className="mt-4 cursor-pointer">
              Go to Login
            </Button>
          </div>
        </main>
      </>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'events':
        return <EventsSection />;
      case 'guests':
        return <GuestsSection />;
      case 'vendors':
        return <VendorsSection />;
      case 'budget':
        return <BudgetSection />;
      case 'invitations':
        return <InvitationsSection />;
      case 'tasks':
        return <TasksSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/30 flex flex-col">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-rose-100/40 to-transparent blur-2xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-100/30 to-transparent blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b h-16">
        <Header />
      </div>

      {/* Main Content with Sidebar and Scrollable Area */}
      <div className="flex flex-1 pt-16 overflow-hidden relative">
        {/* Mobile Menu Button - Fixed position so it's always accessible */}
        <div className="md:hidden fixed top-20 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="gap-2"
          >
            <Menu className="h-4 w-4" />
            Menu
          </Button>
        </div>

        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection as string}
          onSelectSection={(section: string) => setActiveSection(section as 'overview' | 'events' | 'guests' | 'vendors' | 'budget' | 'invitations' | 'tasks')}
          isMobileOpen={isMobileOpen}
          onMobileClose={() => setIsMobileOpen(false)}
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 md:ml-64 overflow-y-auto overflow-x-hidden h-[calc(100vh-7rem)]">
          <section className="py-8 md:py-12 min-h-full">
            <div className="px-4 md:px-8 pb-24 w-full">
              {/* Mobile Menu Button */}
              <div className="md:hidden mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="gap-2"
                >
                  <Menu className="h-4 w-4" />
                  Menu
                </Button>
              </div>

              {/* Animated Section Content */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderSection()}
              </motion.div>
            </div>
          </section>
        </main>
      </div>

      {/* Minimal Dashboard Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-slate-200 py-2 px-4 h-14">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <p className="text-xs text-slate-500">Logged in as: <span className="font-semibold text-slate-700">{user?.name}</span></p>
          <p className="text-xs text-slate-400">© 2026 Pirona. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
