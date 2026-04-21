'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Home,
  Calendar,
  Users,
  Briefcase,
  DollarSign,
  Mail,
  CheckSquare,
  Settings,
  LogOut,
  ChevronDown,
  Heart,
  MapPin,
  Music,
  Camera,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (section: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({
  activeSection,
  onSelectSection,
  isMobileOpen = false,
  onMobileClose = () => {},
}: SidebarProps) {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: Home,
      description: 'Quick summary & metrics',
    },
    {
      id: 'events',
      label: 'Events & Timeline',
      icon: Calendar,
      description: 'Manage wedding dates',
    },
    {
      id: 'guests',
      label: 'Guest Management',
      icon: Users,
      description: 'Add & manage guests',
    },
    {
      id: 'vendors',
      label: 'Vendors & Bookings',
      icon: Briefcase,
      description: 'Find & book vendors',
      submenu: [
        { id: 'vendors-all', label: 'All Vendors', icon: Briefcase },
        { id: 'vendors-catering', label: 'Catering', icon: Music },
        { id: 'vendors-decoration', label: 'Decoration', icon: Heart },
        { id: 'vendors-photography', label: 'Photography', icon: Camera },
      ],
    },
    {
      id: 'budget',
      label: 'Budget Planner',
      icon: DollarSign,
      description: 'Track expenses',
    },
    {
      id: 'invitations',
      label: 'Invitations',
      icon: Mail,
      description: 'Digital & physical',
    },
    {
      id: 'tasks',
      label: 'Tasks & Timeline',
      icon: CheckSquare,
      description: 'Planning checklist',
    },
  ];

  const handleSelectSection = (sectionId: string) => {
    onSelectSection(sectionId);
    onMobileClose();
  };

  const toggleSubmenu = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Mobile Menu Toggle - Show only on small screens */}
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700 transition-transform duration-300 z-30',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Close button for mobile */}
        <button
          onClick={onMobileClose}
          className="md:hidden absolute right-4 top-4 p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-300" />
        </button>

        {/* Logo/Header */}
        <div className="p-6 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-lg transition-all">
              <span className="text-white font-bold text-lg">💍</span>
            </div>
            <div>
              <p className="font-bold text-white">Pirona</p>
              <p className="text-xs text-gray-400">Wedding Planner</p>
            </div>
          </Link>
        </div>

        {/* User Profile */}
        <div className="px-4 py-4 border-b border-slate-700">
          <p className="text-sm font-medium text-gray-200">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isExpanded = expandedMenu === item.id;
            const hasSubmenu = item.submenu && item.submenu.length > 0;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (hasSubmenu) {
                      toggleSubmenu(item.id);
                    } else {
                      handleSelectSection(item.id);
                    }
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary font-medium'
                      : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-gray-400 hidden group-hover:block">
                      {item.description}
                    </p>
                  </div>
                  {hasSubmenu && (
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        isExpanded ? 'rotate-180' : ''
                      )}
                    />
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-2 mt-1 space-y-1 border-l border-slate-700 pl-2">
                    {item.submenu?.map((subitem) => {
                      const SubIcon = subitem.icon;
                      const isSubActive = activeSection === subitem.id;
                      return (
                        <button
                          key={subitem.id}
                          onClick={() => handleSelectSection(subitem.id)}
                          className={cn(
                            'w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200',
                            isSubActive
                              ? 'bg-primary/20 text-primary font-medium'
                              : 'text-gray-400 hover:bg-slate-700/30 hover:text-gray-200'
                          )}
                        >
                          <SubIcon className="h-4 w-4" />
                          {subitem.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Settings & Logout */}
        <div className="p-3 border-t border-slate-700 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200">
            <Settings className="h-5 w-5" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
        className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={onMobileClose}
        />
      )}
    </>
  );
}
