'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PironaLogo } from '../icons/PironaLogo';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface MobileNavProps {
  navLinks: { href: string; label: string }[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push('/');
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <div className="flex items-center md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            onClick={() => setOpen(false)}
          >
            <PironaLogo className="h-6 w-6" />
            <span className="font-bold font-headline text-lg">Pirona</span>
          </Link>
          <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Section - Mobile */}
            <div className="mt-6 pt-6 border-t border-border/50">
              {user ? (
                <div className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-body cursor-pointer hover:text-primary flex items-center gap-2"
                    onClick={() => handleNavClick('/dashboard')}
                  >
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full justify-start font-body cursor-pointer flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-body cursor-pointer hover:text-primary"
                    onClick={() => handleNavClick('/auth/login')}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full justify-start font-body bg-primary hover:bg-primary/90 cursor-pointer"
                    onClick={() => handleNavClick('/auth/signup')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center space-x-2">
        <PironaLogo className="h-6 w-6" />
        <span className="font-bold font-headline text-lg">Pirona</span>
      </Link>
    </div>
  );
}
