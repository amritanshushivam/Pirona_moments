'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PironaLogo } from '@/components/icons/PironaLogo';
import { MobileNav } from './MobileNav';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { HeaderLanguageSwitcher } from './HeaderLanguageSwitcher';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/planner', label: 'AI Planner' },
  { href: '/dowry-free', label: 'Dowry-Free' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100/50 bg-gradient-to-r from-orange-100 to-amber-100 backdrop-blur-xl shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <PironaLogo className="h-7 w-7 text-orange-600" />
          <span className="hidden font-bold sm:inline-block font-headline text-xl text-orange-800">
            Pirona
          </span>
        </Link>

        {/* Desktop Nav - Only show when not logged in */}
        {!user && (
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 transition-colors hover:text-orange-600 font-body"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <HeaderLanguageSwitcher />

          {/* Mobile Nav */}
          <MobileNav navLinks={navLinks} />

          {/* Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            {user && (user.userType === 'customer' || user.userType === 'vendor' || user.userType === 'admin') ? (
              <>
                <Button 
                  variant="ghost" 
                  className="font-body cursor-pointer text-gray-700 hover:text-orange-600 hover:bg-orange-50 flex items-center gap-2"
                  onClick={() => {
                    if (user.userType === 'vendor') router.push('/vendor-dashboard');
                    else if (user.userType === 'admin') router.push('/admin');
                    else router.push('/dashboard');
                  }}
                >
                  <User className="w-4 h-4" />
                  {user.name}
                </Button>
                <Button 
                  variant="outline"
                  className="font-body cursor-pointer flex items-center gap-2 text-gray-700 border-orange-200 hover:bg-orange-50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="font-body cursor-pointer text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </Button>
                <Button 
                  className="font-body bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 cursor-pointer font-semibold"
                  onClick={() => router.push('/auth/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
