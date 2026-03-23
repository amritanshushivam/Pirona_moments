'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show after 2 seconds
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-40 max-w-sm"
        >
          <div className="bg-white rounded-2xl shadow-premium-lg p-6 border border-border/50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline font-bold text-foreground text-lg">
                🍪 Cookie Preferences
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
              We use cookies to improve your experience on Pirona. By clicking "Accept", you agree to our use of cookies.
            </p>

            <div className="flex gap-3">
              <Button
                onClick={handleAccept}
                className="flex-1 font-body font-semibold bg-primary hover:bg-primary/90"
              >
                Accept
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="flex-1 font-body font-semibold"
              >
                Manage
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
