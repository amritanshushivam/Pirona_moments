'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { VendorSidebar } from '@/components/vendor/VendorSidebar';
import { VendorOverviewSection } from '@/components/vendor/VendorOverviewSection';
import { VendorServicesSection } from '@/components/vendor/VendorServicesSection';
import { VendorBookingsSection } from '@/components/vendor/VendorBookingsSection';
import { VendorReviewsSection } from '@/components/vendor/VendorReviewsSection';
import { VendorEarningsSection } from '@/components/vendor/VendorEarningsSection';
import { VendorProfileSection } from '@/components/vendor/VendorProfileSection';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VendorDashboardPage() {
  const { user, userType, logout, isLoading } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (userType !== 'vendor' && userType !== null) {
      router.push('/');
    }
  }, [userType, router]);

  // Show loading state while auth is being checked
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Loading vendor dashboard...</h1>
          </div>
        </main>
      </>
    );
  }

  if (userType !== 'vendor') {
    return (
      <>
        <Header />
        <main className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Access Denied</h1>
            <p className="text-gray-600 mt-4">You don't have permission to access this page</p>
            <Button onClick={() => router.push('/')} className="mt-4 cursor-pointer">
              Go Home
            </Button>
          </div>
        </main>
      </>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <VendorOverviewSection />;
      case 'services':
        return <VendorServicesSection />;
      case 'bookings':
        return <VendorBookingsSection />;
      case 'reviews':
        return <VendorReviewsSection />;
      case 'earnings':
        return <VendorEarningsSection />;
      case 'profile':
        return <VendorProfileSection />;
      default:
        return <VendorOverviewSection />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-slate-50 via-white to-amber-50/30">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/95 backdrop-blur-sm border-b">
        <Header />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <VendorSidebar 
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            isMobileOpen={false}
            onMobileClose={() => {}}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={`md:hidden fixed left-0 top-16 z-30 transition-transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <VendorSidebar 
            activeSection={activeSection}
            onSelectSection={(section) => {
              setActiveSection(section);
              setIsMobileOpen(false);
            }}
            isMobileOpen={isMobileOpen}
            onMobileClose={() => setIsMobileOpen(false)}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 md:flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/30">
          <section className="min-h-full py-6 md:py-8">
            <div className="w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pb-24">
              {/* Mobile Menu Button */}
              <div className="md:hidden mb-6 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="gap-2"
                >
                  <Menu className="h-4 w-4" />
                  Menu
                </Button>
                <span className="text-sm font-medium text-gray-700">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</span>
              </div>

              {/* Content Animation */}
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderSection()}
              </motion.div>
            </div>
          </section>
        </main>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/95 backdrop-blur-sm border-t border-slate-200 flex items-center px-4">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Logged in as: <span className="font-semibold text-slate-700">{user?.name}</span>
          </p>
          <p className="text-xs text-slate-400">© 2026 Pirona. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
