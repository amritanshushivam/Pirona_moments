'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  HeartHandshake,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { services, vendors, testimonials, realWeddings, deals } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline tracking-tight">
              Desi Dil, Digital Style!
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-primary-foreground/90">
              Your dream wedding, planned to perfection. Discover vendors, build packages with AI, and celebrate stress-free.
            </p>
            <div className="w-full max-w-2xl p-2 bg-white/20 backdrop-blur-sm rounded-full">
              <form className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search services, vendors, location..."
                  className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-300 h-12 text-lg"
                />
                <Button type="submit" size="icon" className="rounded-full bg-primary w-10 h-10 flex-shrink-0">
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section id="categories" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-foreground">
                Everything You Need
              </h2>
              <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our curated selection of top-tier wedding services.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {services.slice(0, 6).map((service) => (
                <Link
                  href="/services"
                  key={service.name}
                  className="group flex flex-col items-center gap-3 text-center transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="rounded-full bg-card p-4 shadow-md group-hover:shadow-lg group-hover:bg-secondary">
                    <service.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground group-hover:text-primary">
                    {service.name}
                  </span>
                </Link>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="ghost" className="text-primary hover:text-primary">
                  <Link href="/services">
                    See All Categories <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
          </div>
        </section>
        
        <section id="ai-features" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <Badge variant="outline" className="text-primary border-primary">Powered by AI</Badge>
                <h2 className="text-3xl md:text-4xl font-headline text-foreground mt-2">
                    Your Smart Wedding Planner
                </h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Let our intelligent tools create a personalized and secure wedding experience for you.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center flex flex-col items-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-3 rounded-full"><Sparkles className="h-8 w-8 text-primary" /></div>
                        <CardTitle className="font-headline pt-2">Smart Package Builder</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Answer a few questions and our AI will craft the perfect wedding package tailored to your budget and style.</p>
                    </CardContent>
                </Card>
                <Card className="text-center flex flex-col items-center">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 p-3 rounded-full"><HeartHandshake className="h-8 w-8 text-primary" /></div>
                        <CardTitle className="font-headline pt-2">Fraud-Free Vendors</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Our AI analyzes vendor profiles to ensure they are legitimate, giving you peace of mind and security.</p>
                    </CardContent>
                </Card>
                <Card className="text-center flex flex-col items-center">
                    <CardHeader>
                         <div className="mx-auto bg-primary/10 p-3 rounded-full"><Users className="h-8 w-8 text-primary" /></div>
                        <CardTitle className="font-headline pt-2">AR Venue Previews</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Visualize decorations and layouts in your chosen venue with our augmented reality feature before booking.</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </section>


        <section id="deals" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-foreground">
                Trending Deals & Packages
              </h2>
              <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                Exclusive offers to make your special day even more memorable.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal) => {
                const vendor = vendors.find(v => v.id === deal.vendorId);
                const image = PlaceHolderImages.find(p => p.id === deal.imageId);
                return (
                  <Card key={deal.title} className="overflow-hidden group">
                    <div className="relative h-56 w-full">
                       {image && <Image src={image.imageUrl} alt={deal.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={image.imageHint}/>}
                       <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">{deal.discount}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-headline">{deal.title}</h3>
                      <p className="text-sm text-muted-foreground">by {vendor?.name}</p>
                      <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-xl font-bold text-primary">{deal.price}</span>
                            <span className="text-sm line-through text-muted-foreground ml-2">{deal.originalPrice}</span>
                          </div>
                          <Button size="sm" asChild>
                            <Link href={`/vendors/${vendor?.id}`}>Book Now <ChevronRight className="w-4 h-4 ml-1" /></Link>
                          </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>


        <section id="real-weddings" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline text-foreground">
                Real Weddings, Real Stories
              </h2>
              <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                Get inspired by couples who planned their dream wedding with Pirona.
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {realWeddings.map((wedding) => {
                   const image = PlaceHolderImages.find(p => p.id === wedding.imageId);
                  return (
                  <CarouselItem key={wedding.couple} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                           {image && <Image src={image.imageUrl} alt={`Wedding of ${wedding.couple}`} fill className="object-cover" data-ai-hint={image.imageHint} />}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                           <div className="absolute bottom-0 left-0 p-4 text-white">
                                <h3 className="font-headline text-lg">{wedding.couple}</h3>
                                <p className="text-sm opacity-90">{wedding.location}</p>
                           </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                )})}
              </CarouselContent>
              <CarouselPrevious className="ml-12" />
              <CarouselNext className="mr-12" />
            </Carousel>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline text-foreground">What Our Couples Say</h2>
                </div>
                <Carousel
                    plugins={[autoplayPlugin.current]}
                    opts={{ align: 'start', loop: true }}
                    className="w-full max-w-6xl mx-auto"
                    onMouseEnter={autoplayPlugin.current.stop}
                    onMouseLeave={autoplayPlugin.current.reset}
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => {
                           const image = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                          return (
                            <CarouselItem key={index} className="p-2 md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full flex flex-col justify-between">
                                    <CardContent className="pt-6 flex-grow">
                                        <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                                    </CardContent>
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <Avatar>
                                            {image && <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />}
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </CarouselItem>
                        )})}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
