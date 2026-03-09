import Link from 'next/link';
import { PironaLogo } from '@/components/icons/PironaLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { services } from '@/lib/data';
import { Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <PironaLogo className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-2xl text-foreground">
                Pirona
              </span>
            </Link>
            <p className="max-w-sm text-muted-foreground">
              Your dream wedding, planned to perfection with AI. Desi Dil, Digital Style!
            </p>
            <div className="mt-6">
                <h3 className="font-semibold text-foreground">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mt-1">Subscribe to our newsletter for the latest deals.</p>
                <form className="flex w-full max-w-sm items-center space-x-2 mt-3">
                    <Input type="email" placeholder="Email" className="bg-background"/>
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="/dowry-free" className="text-muted-foreground hover:text-primary">Dowry-Free Initiative</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
              <li><Link href="/auth/admin" className="text-muted-foreground hover:text-primary">For Vendors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 5).map(service => (
                <li key={service.name}>
                    <Link href="/services" className="text-muted-foreground hover:text-primary">{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Github"><Github className="text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="text-muted-foreground hover:text-primary" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="text-muted-foreground hover:text-primary" /></Link>
            </div>
             <div className="mt-4 space-y-1">
                <p className="text-sm text-muted-foreground">contact@pirona.com</p>
                <p className="text-sm text-muted-foreground">+91 12345 67890</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Pirona. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
