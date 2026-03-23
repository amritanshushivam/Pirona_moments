import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, CheckCircle, Package, MessageSquare, Eye } from 'lucide-react';
import { vendors, testimonials } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function VendorProfilePage({ params }: { params: { id: string } }) {
  const vendor = vendors.find((v) => v.id === params.id);

  if (!vendor) {
    notFound();
  }
  
  const vendorImage = PlaceHolderImages.find(p => p.id === vendor.profileImageId);

  return (
    <div className="bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {vendorImage && (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={vendorImage.imageUrl}
                        alt={vendor.name}
                        fill
                        className="object-cover"
                        data-ai-hint={vendorImage.imageHint}
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-headline text-foreground">{vendor.name}</h1>
                        {vendor.isVerified && <CheckCircle className="w-6 h-6 text-primary" />}
                    </div>
                    <p className="text-muted-foreground mt-1">{vendor.service}</p>
                    <div className="flex items-center gap-4 text-sm mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-muted-foreground">({vendor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-muted-foreground">{vendor.location}</span>
                      </div>
                    </div>
                    <p className="mt-4">{vendor.profileDescription}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {vendor.portfolioImageIds.map((id, index) => {
                      const image = PlaceHolderImages.find(p => p.id === id);
                      return (
                        <CarouselItem key={index} className="basis-full sm:basis-1/2">
                          <div className="p-1">
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                              {image && <Image src={image.imageUrl} alt={`${vendor.name} portfolio image ${index + 1}`} fill className="object-cover" data-ai-hint={image.imageHint}/>}
                            </div>
                          </div>
                        </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex ml-1 md:ml-12" />
                  <CarouselNext className="hidden md:flex mr-1 md:mr-12" />
                </Carousel>
                <div className="text-center mt-4">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    AR Preview (Coming Soon)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Package className="h-6 w-6" /> Packages & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {vendor.packages.map((pkg) => (
                  <div key={pkg.name} className="p-4 border rounded-lg flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">{pkg.price}</p>
                      <Button size="sm" variant="ghost">Details</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {testimonials.slice(0, 2).map((testimonial) => {
                  const image = PlaceHolderImages.find(p => p.id === testimonial.imageId);
                  return(
                  <div key={testimonial.name} className="flex gap-4">
                    <Avatar>
                      {image && <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />}
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold">{testimonial.name}</h5>
                        <div className="flex text-accent">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic mt-1">"{testimonial.quote}"</p>
                    </div>
                  </div>
                )})}
              </CardContent>
            </Card>
          </div>
          
          {/* Booking Form */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline">Book Now</CardTitle>
                <p className="text-sm text-muted-foreground">or chat with the vendor</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="date">Event Date</Label>
                        <Input id="date" type="date" />
                    </div>
                    <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Input id="guests" type="number" placeholder="e.g., 200" />
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Tell the vendor about your event..." />
                    </div>
                    <Button className="w-full">Request Booking</Button>
                    <Button variant="secondary" className="w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat with {vendor.name}
                    </Button>
                </form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
