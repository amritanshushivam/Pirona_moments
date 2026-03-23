'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { realWeddings } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export function RealWeddings() {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-4">
            Real Weddings
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Celebrate beautiful moments from real couples who trusted Pirona
          </p>
        </motion.div>

        {/* Weddings Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {realWeddings.slice(0, 8).map((wedding, index) => {
            const weddingImage = PlaceHolderImages.find(p => p.id === wedding.imageId);

            return (
              <motion.div
                key={`${wedding.couple}-${index}`}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group cursor-pointer h-full"
                onClick={() => window.location.href = '/'}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all h-full flex flex-col">
                  {/* Image Container */}
                  {weddingImage ? (
                    <>
                      <div className="relative w-full h-64 flex-shrink-0">
                        <Image
                          src={weddingImage.imageUrl}
                          alt={wedding.couple}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          quality={65}
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        {/* Gradient Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"
                          initial={{ opacity: 0.4 }}
                          whileHover={{ opacity: 0.7 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>

                      {/* Content - Bottom Card */}
                      <div className="bg-gradient-to-t from-black/80 to-black/40 text-white p-4 flex-1 flex flex-col justify-end">
                        <h3 className="text-lg md:text-xl font-headline font-bold mb-1 truncate">
                          {wedding.couple}
                        </h3>
                        <p className="text-white/80 font-body text-sm flex items-center gap-1">
                          📍 {wedding.location}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-col gap-3 p-4">
                      <span className="text-3xl">💍</span>
                      <div className="text-center">
                        <h3 className="font-headline font-bold text-foreground text-lg">
                          {wedding.couple}
                        </h3>
                        <p className="text-muted-foreground font-body text-sm">
                          📍 {wedding.location}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-premium hover:shadow-premium-lg hover:scale-105 transition-all font-body cursor-pointer"
          >
            View All Weddings
            <span className="text-xl">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
