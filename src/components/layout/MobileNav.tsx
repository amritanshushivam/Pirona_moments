'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PironaLogo } from '../icons/PironaLogo';

interface MobileNavProps {
  navLinks: { href: string; label: string }[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [open, setOpen] = useState(false);

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
