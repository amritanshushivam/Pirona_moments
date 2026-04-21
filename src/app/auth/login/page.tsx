'use client';

import { useState, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
import { useAuth } from '@/context/AuthContext';

const LoginForm = memo(function LoginForm() {
  const router = useRouter();
  const { login, adminLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'vendor' | 'admin'>('customer');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (userRole === 'customer') {
        await login(email, password, 'customer');
        router.push('/dashboard');
      } else if (userRole === 'vendor' || userRole === 'admin') {
        await adminLogin(userRole);
        router.push(userRole === 'admin' ? '/admin' : '/vendor-dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [email, vendorId, password, userRole, login, adminLogin, router]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-500/15 border border-red-500/30 p-4 text-sm text-red-400 backdrop-blur-sm animate-pulse">
          {error}
        </div>
      )}

      {/* Role Selector Dropdown */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-200 block">Login As</Label>
        <Select value={userRole} onValueChange={(value: string) => {
          setUserRole(value as 'customer' | 'vendor' | 'admin');
          setEmail('');
          setVendorId('');
          setPassword('');
          setError('');
        }}>
          <SelectTrigger className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/20">
            <SelectValue placeholder="Select login type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-700 border-slate-600">
            <SelectItem value="customer" className="text-white hover:bg-slate-600">
              👤 Customer - Plan Your Wedding
            </SelectItem>
            <SelectItem value="vendor" className="text-white hover:bg-slate-600">
              🏪 Vendor - Manage Services
            </SelectItem>
            <SelectItem value="admin" className="text-white hover:bg-slate-600">
              ⚙️ Admin - Manage Platform
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Fields Based on Role */}
      {userRole === 'customer' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-200 block">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </>
      )}

      {userRole === 'vendor' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="vendorId" className="text-sm font-semibold text-gray-200 block">Vendor ID</Label>
            <Input
              id="vendorId"
              type="text"
              placeholder="e.g., VND-12345"
              value={vendorId}
              onChange={(e) => setVendorId(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </>
      )}

      {userRole === 'admin' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="adminEmail" className="text-sm font-semibold text-gray-200 block">Admin Email</Label>
            <Input
              id="adminEmail"
              type="email"
              placeholder="admin@pirona.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </>
      )}

      {/* Password - Common for all */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-semibold text-gray-200">Password</Label>
          <Link href="#" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
            Forgot?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
          placeholder="••••••••"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Logging in...
          </span>
        ) : (
          'Login'
        )}
      </Button>
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-800 px-2 text-gray-400 font-medium">OR</span>
        </div>
      </div>

      <Button 
        type="button" 
        variant="outline" 
        onClick={() => alert('Google login coming soon!')}
        className="w-full py-3 border border-slate-600 hover:border-primary/50 hover:bg-slate-700/30 text-gray-200 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
        Continue with Google
      </Button>
    </form>
  );
});

export default function LoginPage() {
  return (
    <div className="dark w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-black/10" />

      <div className="relative flex items-center justify-center min-h-screen py-8 px-4 sm:px-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="inline-block p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <PironaLogo className="h-8 w-8 text-primary" />
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Enter your credentials to access your perfect wedding planning experience
            </p>
          </div>

          {/* Main Card */}
          <div className="relative">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl blur opacity-75" />
            
            {/* Card Content */}
            <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">
              <LoginForm />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Create one
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex gap-1 justify-center opacity-40">
            <div className="w-1 h-1 rounded-full bg-primary" />
            <div className="w-1 h-1 rounded-full bg-accent" />
            <div className="w-1 h-1 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
