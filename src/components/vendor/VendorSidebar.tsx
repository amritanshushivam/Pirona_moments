'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home, Briefcase, Calendar, Star, DollarSign, Settings, LogOut,
  ChevronDown, Menu, X, Award, TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VendorSidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function VendorSidebar({
  activeSection,
  onSelectSection,
  isMobileOpen,
  onMobileClose,
}: VendorSidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems = [
    { id: 'overview', icon: Home, label: 'Overview', color: 'from-blue-500 to-blue-600' },
    { id: 'services', icon: Briefcase, label: 'My Services', color: 'from-purple-500 to-purple-600' },
    { id: 'bookings', icon: Calendar, label: 'Bookings', color: 'from-green-500 to-green-600' },
    { id: 'earnings', icon: DollarSign, label: 'Earnings', color: 'from-emerald-500 to-emerald-600' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Desktop Sidebar - Not fixed, part of flex layout */}
      <motion.aside
        className="hidden md:flex flex-col h-full w-64 bg-slate-900 border-r border-slate-700"
        initial={{ x: -264 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 border-b border-slate-700">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="font-bold text-white text-lg">Pirona</span>
          </Link>

          {/* User Profile */}
          <div className="bg-slate-700/40 rounded-xl p-4 border border-slate-600">
            <h3 className="font-bold text-white text-sm mb-1">
              {user?.name || 'Vendor User'}
            </h3>
            <p className="text-xs text-gray-400 mb-2">
              {user?.businessName || 'Wedding Services'}
            </p>
            <div className="flex items-center gap-1 text-yellow-400 text-xs">
              <Star className="h-3 w-3 fill-yellow-400" />
              <span>4.8 (120)</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Settings & Logout */}
        <div className="p-4 border-t border-slate-700 space-y-2">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            onClick={() => onSelectSection('settings')}
          >
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <motion.aside
          className="md:hidden flex flex-col h-full w-64 bg-slate-900 border-r border-slate-700"
          initial={{ x: -264 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6 border-b border-slate-700">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-bold text-white text-lg">Pirona</span>
            </Link>

            {/* User Profile */}
            <div className="bg-slate-700/40 rounded-xl p-4 border border-slate-600">
              <h3 className="font-bold text-white text-sm mb-1">
                {user?.name || 'Vendor User'}
              </h3>
              <p className="text-xs text-gray-400 mb-2">
                {user?.businessName || 'Wedding Services'}
              </p>
              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                <Star className="h-3 w-3 fill-yellow-400" />
                <span>4.8 (120)</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 flex-1 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onSelectSection(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                    )}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Settings & Logout */}
          <div className="p-4 border-t border-slate-700 space-y-2">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200"
              onClick={() => onSelectSection('settings')}
            >
              <Settings className="h-5 w-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </motion.aside>
      )}
    </>
  );
}
