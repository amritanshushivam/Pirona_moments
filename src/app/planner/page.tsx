'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { runPackageBuilder, type BuildPackageState } from './actions';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Terminal, Loader2, Package, Users, Tag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const initialState: BuildPackageState = {
  result: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Building Package...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Build My Wedding Package
        </>
      )}
    </Button>
  );
}


export default function PlannerPage() {
  const [state, formAction] = useFormState(runPackageBuilder, initialState);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <Badge variant="outline" className="text-primary border-primary">Powered by AI</Badge>
                <h1 className="text-4xl md:text-5xl font-headline text-foreground mt-2">AI Wedding Planner</h1>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                    Describe your dream wedding, and our AI will create a customized package with vendor suggestions and cost estimates, just for you.
                </p>
            </div>
          
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Tell Us About Your Wedding</CardTitle>
                    <CardDescription>The more details you provide, the better our AI can tailor your package.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="weddingStyle">Wedding Style</Label>
                                <Input id="weddingStyle" name="weddingStyle" placeholder="e.g., Modern, Traditional, Rustic" defaultValue="Traditional" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="e.g., Delhi, India" defaultValue="Delhi, India" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget (USD)</Label>
                                <Input id="budget" name="budget" type="number" placeholder="e.g., 20000" defaultValue="20000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="guestCount">Guest Count</Label>
                                <Input id="guestCount" name="guestCount" type="number" placeholder="e.g., 250" defaultValue="250"/>
                            </div>
                             <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="venueType">Venue Type</Label>
                                <Input id="venueType" name="venueType" placeholder="e.g., Ballroom, Garden, Beach" defaultValue="Ballroom" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="additionalPreferences">Additional Preferences</Label>
                                <Textarea id="additionalPreferences" name="additionalPreferences" placeholder="Any specific requests? e.g., 'Need a vegetarian-only caterer', 'Looking for a photographer with drone experience'." rows={4} />
                            </div>
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>

            {state.result && (
                <Card className="max-w-4xl mx-auto mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-6 w-6" /> Your Custom Wedding Package
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-headline text-xl mb-2">Package Overview</h3>
                            <p className="text-muted-foreground">{state.result.packageDescription}</p>
                            <div className="mt-4 flex items-baseline gap-4 bg-secondary p-4 rounded-lg">
                                <h4 className="font-semibold">Total Estimated Cost:</h4>
                                <p className="text-2xl font-bold text-primary">${state.result.totalEstimatedCost.toLocaleString()}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-headline text-xl mb-4">Suggested Vendors</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {state.result.suggestedVendors.map((vendor, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{vendor.name}</CardTitle>
                                            <CardDescription>{vendor.service}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-sm">
                                             <div className="flex items-center gap-2 text-muted-foreground">
                                                <Star className="w-4 h-4 text-accent fill-accent" />
                                                <span>Rating: {vendor.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Tag className="w-4 h-4" />
                                                <span>Price: {vendor.priceRange}</span>
                                            </div>
                                             <div className="flex items-center gap-2 text-muted-foreground">
                                                <Users className="w-4 h-4" />
                                                <span>Contact: {vendor.contactInfo}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                    </CardContent>
                </Card>
            )}

            {state.error && (
                <Alert variant="destructive" className="max-w-4xl mx-auto mt-8">
                <Terminal className="h-4 w-4" />
                <AlertTitle>An Error Occurred</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
                </Alert>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
