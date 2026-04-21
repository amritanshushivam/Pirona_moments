'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Calendar, DollarSign, Star, Settings, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'packages', label: 'Packages', icon: Package },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'earnings', label: 'Earnings', icon: DollarSign },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface VendorDashboardNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function VendorDashboardNav({ activeTab, onTabChange }: VendorDashboardNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 sticky top-20 z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-gray-700 hover:bg-orange-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-20 z-40 bg-white border-b border-orange-200">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="font-bold text-gray-900">Navigation</h3>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="border-t border-orange-200 p-4 space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    </>
  );
}
