'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Generate array of frame paths only once
const TOTAL_FRAMES = 133;
const generateFramePaths = () => {
  const frames = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    frames.push(`/images/stage-animation/ezgif-frame-${String(i).padStart(3, '0')}.jpg`);
  }
  return frames;
};

const FRAMES = generateFramePaths();

export function AnimatedStage() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('🎬 AnimatedStage mounted');
    console.log('📊 Total FRAMES available:', FRAMES.length);
    console.log('🖼️ First frame path:', FRAMES[0]);
    
    // Display first frame immediately
    setCurrentFrame(0);
    setIsLoading(false);
    
    const startAnimation = () => {
      console.log('▶️ Animation started');
      intervalRef.current = setInterval(() => {
        setCurrentFrame(prev => {
          const next = (prev + 1) % FRAMES.length;
          if (next % 10 === 0) {
            console.log(`Frame: ${next}`);
          }
          return next;
        });
      }, 40); // ~25fps animation speed
    };

    // Start animation after a small delay to ensure first frame renders
    const timer = setTimeout(startAnimation, 100);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full py-12 md:py-20 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-4">
            Experience Desi Style
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Watch the magic of traditional Indian wedding décor come to life with stunning animations
          </p>
        </motion.div>

        {/* DEBUG: Show what frame is being loaded */}
        <div className="text-center mb-4 text-sm text-primary font-bold">
          DEBUG: Frame {currentFrame + 1}/{FRAMES.length} | Loading: {isLoading.toString()} | Path: {FRAMES[currentFrame]}
        </div>

        {/* Animated Frame Container */}
        <motion.div
          className="relative w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Main Animation Frame */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-premium bg-black" style={{ paddingBottom: '56.25%' }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="text-white text-center">
                  <div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3" />
                  <p>Loading animation...</p>
                </div>
              </div>
            )}
            <img
              ref={imgRef}
              src={FRAMES[currentFrame]}
              alt={`Animation frame ${currentFrame + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                imageRendering: 'auto',
              }}
              loading="eager"
              decoding="async"
              onLoad={() => {
                console.log(`✓ Frame loaded: ${currentFrame + 1}`);
                setIsLoading(false);
              }}
              onError={(e) => {
                console.error(`❌ Failed to load frame ${currentFrame + 1}:`, FRAMES[currentFrame], e);
              }}
            />

            {/* Overlay Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />

            {/* Frame Counter */}
            <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-body">
              {currentFrame + 1} / {FRAMES.length}
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="mt-6 h-1 bg-secondary/30 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentFrame + 1) / FRAMES.length) * 100}%` }}
              transition={{ duration: 0.05 }}
            />
          </motion.div>

          {/* Description */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mx-auto">
              Transform your wedding venue with elaborate Indian-style decorations featuring traditional marigold garlands, 
              ornate wooden arches, and breathtaking lighting arrangements that showcase the essence of Desi celebrations.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid Below Animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { icon: '✨', title: 'Premium Décor', desc: 'Handcrafted traditional designs' },
            { icon: '🎨', title: 'Custom Styling', desc: 'Personalized color schemes' },
            { icon: '💡', title: 'Smart Lighting', desc: 'Ambient & dramatic effects' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-headline font-bold text-lg text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
