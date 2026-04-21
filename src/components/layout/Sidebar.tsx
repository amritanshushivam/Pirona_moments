'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, Home, Zap, Users, Briefcase, CheckSquare, BarChart3, Settings, LogOut, Heart } from 'lucide-react';

interface NavItem {
  label: string;
  icon: any;
  href?: string;
  action?: () => void;
  badge?: string | number;
  submenu?: NavItem[];
}

interface SidebarProps {
  onLogout?: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    {
      label: 'Quick Actions',
      icon: Zap,
      submenu: [
        { label: 'Create Invitations', icon: Heart, action: () => alert('Create Invitations') },
        { label: 'Browse Vendors', icon: Briefcase, action: () => alert('Browse Vendors') },
        { label: 'Add Guests', icon: Users, action: () => alert('Add Guests') },
      ],
    },
    { label: 'Budget', icon: BarChart3, href: '/dashboard#budget', badge: '₹2.5L' },
    { label: 'Guests', icon: Users, href: '/dashboard#guests', badge: '150' },
    { label: 'Vendors', icon: Briefcase, href: '/dashboard#vendors', badge: '10' },
    { label: 'Tasks', icon: CheckSquare, href: '/dashboard#tasks', badge: '3' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ];

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-br from-white/80 via-amber-50/60 to-orange-50/50 border-r border-white/60 shadow-2xl z-40 overflow-y-auto">
      <div className="p-6 flex flex-col h-full">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
            💍
          </div>
          <div>
            <p className="font-bold text-gray-900">Pirona</p>
            <p className="text-xs text-gray-600">Moments</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                // Collapsible Item
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-800 hover:bg-white/50 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <item.icon className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-600 transition-transform ${
                      expandedItems.includes(item.label) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                // Link Item
                <button
                  onClick={() => {
                    if (item.href) router.push(item.href);
                    else if (item.action) item.action();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-800 hover:bg-white/50 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <item.icon className="h-5 w-5 text-amber-600" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              )}

              {/* Submenu Items */}
              {item.submenu && expandedItems.includes(item.label) && (
                <div className="space-y-1 mt-2 ml-4 border-l-2 border-amber-200">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.label}
                      onClick={() => {
                        if (subitem.action) subitem.action();
                        if (subitem.href) router.push(subitem.href);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-amber-100/50 transition-all text-sm"
                    >
                      <subitem.icon className="h-4 w-4 text-amber-600" />
                      <span>{subitem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer Stats */}
        <div className="border-t border-white/40 pt-4 space-y-2 mt-auto">
          <div className="bg-white/60 border border-white/60 rounded-lg p-3">
            <p className="text-xs text-gray-600 font-medium">Wedding Days</p>
            <p className="text-lg font-bold text-gray-900">120</p>
          </div>
          <div className="bg-white/60 border border-white/60 rounded-lg p-3">
            <p className="text-xs text-gray-600 font-medium">Progress</p>
            <p className="text-lg font-bold text-gray-900">50%</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold hover:from-rose-600 hover:to-pink-700 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
