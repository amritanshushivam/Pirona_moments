'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

export function Services() {
  const serviceImages: { [key: string]: string } = {
    'Catering': 'vendor-catering-1',
    'DJ & Music': 'vendor-dj-1',
    'Tent & Decoration': 'vendor-decor-1',
    'Photography': 'vendor-photo-1',
    'Venue Booking': 'vendor-venue-1',
    'Bridal Makeup': 'vendor-makeup-1',
    'Band & Dhol': 'vendor-dj-1',
    'Transportation': 'vendor-decor-2',
  };

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
            Your Wedding Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Browse our curated selection of premium wedding vendors, from catering to décor
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.slice(0, 8).map((service, index) => {
            const imageId = serviceImages[service.name];
            const serviceImage = PlaceHolderImages.find(p => p.id === imageId);

            return (
              <motion.div
                key={service.name}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link
                  href="/services"
                  className="group flex flex-col items-stretch gap-0 text-center h-full cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-56 md:h-64 rounded-t-3xl overflow-hidden">
                    {serviceImage && (
                      <>
                        <Image
                          src={serviceImage.imageUrl}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          quality={65}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          loading="lazy"
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      </>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="rounded-b-3xl bg-gradient-to-br from-secondary to-secondary/80 p-6 md:p-8 shadow-premium group-hover:shadow-premium-lg transition-all flex flex-col justify-between flex-1">
                    {/* Service Name */}
                    <h3 className="font-headline font-bold text-foreground group-hover:text-primary transition-colors text-2xl md:text-3xl tracking-tight">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-opacity font-body leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold shadow-premium hover:shadow-premium-lg hover:scale-105 transition-all font-body"
          >
            Browse All Services
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
