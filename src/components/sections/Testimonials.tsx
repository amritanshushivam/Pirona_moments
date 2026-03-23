'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/lib/data';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';

export function Testimonials() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );
  const [isPaused, setIsPaused] = useState(false);

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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-4">
            Loved by Couples
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            See what happy couples say about their Pirona experience
          </p>
        </motion.div>

        {/* Testimonials Carousel - Multiple Items */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onMouseEnter={() => {
            setIsPaused(true);
            autoplayPlugin.current.stop();
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            autoplayPlugin.current.play();
          }}
          className="w-full"
        >
          <Carousel
            plugins={[autoplayPlugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => {
                const avatarImage = PlaceHolderImages.find(
                  p => p.id === testimonial.imageId
                );

                return (
                  <CarouselItem
                    key={testimonial.name}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-3xl p-6 md:p-8 shadow-premium h-full flex flex-col"
                    >
                      <div className="flex flex-col items-center text-center gap-4 flex-1">
                        {/* Rating */}
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent"
                            />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-base md:text-lg font-body font-medium text-foreground leading-relaxed flex-1">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Author */}
                        <div className="flex flex-col items-center gap-2 pt-2 w-full">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={avatarImage?.imageUrl}
                              alt={testimonial.name}
                            />
                            <AvatarFallback>
                              {testimonial.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-headline font-bold text-base text-foreground">
                              {testimonial.name}
                            </h4>
                            <p className="text-muted-foreground font-body text-xs md:text-sm">
                              {testimonial.event}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: '5000+', text: 'Happy Couples' },
            { label: '1000+', text: 'Verified Vendors' },
            { label: '4.9★', text: 'Average Rating' },
          ].map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-headline font-bold text-primary">
                {badge.label}
              </div>
              <div className="text-muted-foreground font-body">
                {badge.text}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
