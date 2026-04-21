'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PironaLogo } from '@/components/icons/PironaLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { services } from '@/lib/data';
import { Github, Twitter, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-rose-950 via-pink-900 to-purple-950 border-t border-rose-700/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <PironaLogo className="h-8 w-8 text-rose-300" />
              <span className="font-bold font-headline text-2xl bg-gradient-to-r from-rose-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Pirona
              </span>
            </Link>
            <p className="max-w-sm text-rose-100/80 font-body leading-relaxed mb-8">
              Your dream wedding, planned to perfection with AI. Celebrating love with tradition and innovation.
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="font-headline font-semibold text-white mb-3">
                Stay Updated
              </h4>
              <p className="text-sm text-rose-100/70 mb-4 font-body">
                Subscribe for exclusive deals and wedding tips
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-white/10 border-rose-400/30 text-white placeholder:text-rose-200/50 font-body flex-1 focus:border-rose-300"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-headline text-lg font-bold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/planner', label: 'AI Planner' },
                { href: '/dowry-free', label: 'Dowry-Free' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-rose-100/70 hover:text-rose-200 transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-headline text-lg font-bold text-white mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 5).map(service => (
                <li key={service.name}>
                  <Link
                    href="/services"
                    className="text-rose-100/70 hover:text-rose-200 transition-colors font-body text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-headline text-lg font-bold text-white mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-rose-300 flex-shrink-0 mt-1" />
                <a
                  href="mailto:contact@pirona.com"
                  className="text-rose-100/70 hover:text-rose-200 transition-colors font-body text-sm"
                >
                  contact@pirona.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-rose-300 flex-shrink-0 mt-1" />
                <a
                  href="tel:+911234567890"
                  className="text-rose-100/70 hover:text-rose-200 transition-colors font-body text-sm"
                >
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-300 flex-shrink-0 mt-1" />
                <p className="text-rose-100/70 font-body text-sm">
                  Bihar, India
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: Github, label: 'Github' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-rose-400/20 text-rose-200 hover:bg-rose-400/40 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-rose-700/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-rose-100/60 font-body">
              &copy; {new Date().getFullYear()} Pirona Weddings. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-rose-100/60 hover:text-rose-200 transition-colors font-body">
                Privacy Policy
              </Link>
              <Link href="#" className="text-rose-100/60 hover:text-rose-200 transition-colors font-body">
                Terms of Service
              </Link>
              <Link href="#" className="text-rose-100/60 hover:text-rose-200 transition-colors font-body">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
