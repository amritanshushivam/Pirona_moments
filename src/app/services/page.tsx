import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { services, vendors } from '@/lib/data';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <div className="bg-secondary">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-headline text-foreground">Our Services</h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect vendors to make your dream wedding a reality.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-headline">Filters</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Delhi" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                     <Select>
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select a range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">Minimum Rating</Label>
                    <Select>
                      <SelectTrigger id="rating">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4">4 Stars & Up</SelectItem>
                        <SelectItem value="3">3 Stars & Up</SelectItem>
                        <SelectItem value="2">2 Stars & Up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </CardContent>
              </Card>
            </aside>

            <div className="md:col-span-3 space-y-8">
              {services.map((service) => (
                <div key={service.name}>
                  <div className="flex items-center gap-4 mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-headline text-foreground">{service.name}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors
                      .filter((v) => v.service === service.name)
                      .map((vendor) => {
                        const image = PlaceHolderImages.find(p => p.id === vendor.portfolioImageIds[0]);
                        return (
                          <Link key={vendor.id} href={`/vendors/${vendor.id}`}>
                            <Card className="group overflow-hidden">
                               <div className="relative h-48 w-full">
                                {image && <Image src={image.imageUrl} alt={vendor.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={image.imageHint} />}
                                {vendor.isVerified && <Badge className="absolute top-2 right-2">Verified</Badge>}
                              </div>
                              <CardContent className="p-4">
                                <h3 className="font-headline text-lg truncate">{vendor.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {vendor.location}
                                </div>
                                <div className="flex items-center text-sm mt-2">
                                  <Star className="w-4 h-4 mr-1 text-accent fill-accent" />
                                  <span className="font-semibold">{vendor.rating}</span>
                                  <span className="text-muted-foreground ml-1">({vendor.reviews} reviews)</span>
                                </div>
                                <p className="text-sm font-semibold text-primary mt-2">{vendor.priceRange}</p>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
