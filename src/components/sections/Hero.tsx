'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

// Generate animation frame paths
const TOTAL_FRAMES = 133;
const generateFramePaths = () => {
  const frames = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    frames.push(`/images/stage-animation/ezgif-frame-${String(i).padStart(3, '0')}.jpg`);
  }
  return frames;
};

const FRAMES = generateFramePaths();

export function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFrame, setCurrentFrame] = useState(0);
  const isMobile = useIsMobile();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start animation loop
    const startAnimation = () => {
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => (prev + 1) % FRAMES.length);
      }, 40); // ~25fps animation speed
    };

    startAnimation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center text-center overflow-hidden">
      {/* Animated Background */}
      <img
        src={FRAMES[currentFrame]}
        alt={`Background frame ${currentFrame + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          imageRendering: 'auto',
        }}
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Gradient Overlay - Additional depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6 md:space-y-8 px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-7xl lg:text-8xl font-headline font-bold text-white leading-tight tracking-tight"
          variants={itemVariants}
        >
          Desi Dil,
          <br />
          <span className="text-gradient">Digital Style</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-base md:text-xl text-white/90 max-w-3xl font-body leading-relaxed"
          variants={itemVariants}
        >
          Your dream wedding, planned to perfection. Discover vendors, build packages with AI, and celebrate stress-free.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="w-full max-w-2xl"
          variants={itemVariants}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Handle search
            }}
            className="flex items-center gap-2 p-3 bg-white/15 backdrop-blur-md rounded-full border border-white/20 hover:border-white/40 transition-colors group"
          >
            <Input
              type="search"
              placeholder={isMobile ? "Search vendors..." : "Search services, vendors, location..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/50 h-12 text-base md:text-lg font-body"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90 w-12 h-12 flex-shrink-0 transition-all group-hover:scale-110 touch-manipulation"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="font-body font-semibold px-8 bg-primary hover:bg-primary/90 touch-manipulation"
          >
            Explore Vendors
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-body font-semibold px-8 border-white/30 text-white hover:bg-white/10 touch-manipulation"
          >
            Try AI Planner
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
