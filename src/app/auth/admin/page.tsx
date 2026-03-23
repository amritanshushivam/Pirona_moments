'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PironaLogo } from '@/components/icons/PironaLogo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin } = useAuth();
  const [role, setRole] = useState<'admin' | 'vendor' | ''>('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authImage = PlaceHolderImages.find(p => p.id === 'auth-background-admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!role) {
      setError('Please select a role');
      return;
    }

    if (!userId || !password) {
      setError('Please enter ID and password');
      return;
    }

    setIsLoading(true);
    try {
      await adminLogin(role as 'admin' | 'vendor');
      router.push(role === 'admin' ? '/admin' : '/vendor-dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark w-full min-h-screen">
      <div className="absolute inset-0">
        {authImage && (
          <Image
            src={authImage.imageUrl}
            alt={authImage.description}
            fill
            className="object-cover"
            quality={45}
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
            <CardTitle className="text-2xl font-headline">Admin & Vendor Login</CardTitle>
            <CardDescription>
              Select your role and enter your credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'vendor')}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="id">User ID / Email</Label>
                  <Input
                    id="id"
                    type="text"
                    placeholder="Enter your ID or email"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Are you a customer?{' '}
              <Link href="/auth/login" className="underline">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
