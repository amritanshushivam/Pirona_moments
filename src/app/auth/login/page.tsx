import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PironaLogo } from "@/components/icons/PironaLogo";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LoginPage() {
  const authImage = PlaceHolderImages.find(p => p.id === 'auth-background-customer');

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12 px-4">
        <Card className="mx-auto max-w-sm w-full border-none shadow-none sm:border sm:shadow-sm">
          <CardHeader className="text-center">
              <Link href="/" className="inline-block mb-4">
                  <PironaLogo className="h-12 w-12 mx-auto text-primary" />
              </Link>
            <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        {authImage && (
            <Image
              src={authImage.imageUrl}
              alt={authImage.description}
              width="1920"
              height="1080"
              className="h-full w-full object-cover"
              data-ai-hint={authImage.imageHint}
            />
        )}
      </div>
    </div>
  );
}
