import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PironaLogo } from "@/components/icons/PironaLogo";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function SignupPage() {
  const authImage = PlaceHolderImages.find(p => p.id === 'auth-background-customer');

  return (
    <div className="dark w-full min-h-screen">
      <div className="absolute inset-0">
        {authImage && (
            <Image
              src={authImage.imageUrl}
              alt={authImage.description}
              fill
              className="object-cover"
              data-ai-hint={authImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative flex items-center justify-center min-h-screen py-12 px-4">
        <Card className="mx-auto max-w-sm w-full bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader className="text-center">
              <Link href="/" className="inline-block mb-4">
                  <PironaLogo className="h-12 w-12 mx-auto text-primary" />
              </Link>
            <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
            <CardDescription>
              Join Pirona to plan your perfect wedding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" placeholder="Priya Sharma" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="priya@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
