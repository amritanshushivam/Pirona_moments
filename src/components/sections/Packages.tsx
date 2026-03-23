'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { deals } from '@/lib/data';

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function Packages() {
  return (
    <section className="py-8 md:py-12 bg-secondary/30">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-primary/20 text-primary border-0 font-body">
            Special Offers
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-4">
            Trending Packages
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Handpicked wedding packages available in your area with exclusive discounts
          </p>
        </motion.div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {deals.slice(0, 3).map((deal, index) => {
            const dealImage = PlaceHolderImages.find(p => p.id === deal.imageId);

            return (
              <motion.div
                key={deal.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all">
                  {/* Image Container */}
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    {dealImage && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                      >
                        <Image
                          src={dealImage.imageUrl}
                          alt={deal.title}
                          fill
                          className="object-cover"
                          quality={65}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </motion.div>
                    )}

                    {/* Discount Badge */}
                    {deal.discount && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute top-4 right-4"
                      >
                        <Badge className="bg-primary text-primary-foreground text-lg py-2 px-4 font-bold font-body">
                          {deal.discount}
                        </Badge>
                      </motion.div>
                    )}

                    {/* Popular Label */}
                    {index === 0 && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-accent text-accent-foreground font-body">
                          Popular Near You
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-headline font-bold text-foreground mb-2">
                      {deal.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl font-bold text-primary font-headline">
                        {deal.price}
                      </span>
                      <span className="text-lg text-muted-foreground line-through font-body">
                        {deal.originalPrice}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="w-full font-body font-semibold bg-primary hover:bg-primary/90 cursor-pointer"
                        onClick={() => window.location.href = '/services'}
                      >
                        View Package
                      </Button>
                    </motion.div>
                  </div>
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
          <Button
            size="lg"
            variant="outline"
            className="font-body font-semibold px-8 border-foreground/20 cursor-pointer"
            onClick={() => window.location.href = '/services'}
          >
            View All Deals
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
