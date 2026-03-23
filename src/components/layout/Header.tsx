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
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <PironaLogo className="h-7 w-7" />
          <span className="hidden font-bold sm:inline-block font-headline text-xl text-foreground">
            Pirona
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-primary font-body"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <HeaderLanguageSwitcher />

          {/* Mobile Nav */}
          <MobileNav navLinks={navLinks} />

          {/* Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            {user && user.userType === 'customer' ? (
              <>
                <Button 
                  variant="ghost" 
                  className="font-body cursor-pointer hover:text-primary flex items-center gap-2"
                  onClick={() => router.push('/dashboard')}
                >
                  <User className="w-4 h-4" />
                  {user.name}
                </Button>
                <Button 
                  variant="outline"
                  className="font-body cursor-pointer flex items-center gap-2"
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
                  className="font-body cursor-pointer hover:text-primary"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </Button>
                <Button 
                  className="font-body bg-primary hover:bg-primary/90 cursor-pointer"
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
