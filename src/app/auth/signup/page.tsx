'use client';

import { useState, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PironaLogo } from '@/components/icons/PironaLogo';
import { useAuth } from '@/context/AuthContext';

const SignupForm = memo(function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signup(fullName, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  }, [fullName, email, password, signup, router]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-500/15 border border-red-500/30 p-4 text-sm text-red-400 backdrop-blur-sm animate-pulse">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="full-name" className="text-sm font-semibold text-gray-200 block">Full Name</Label>
        <div className="relative">
          <Input
            id="full-name"
            placeholder="Priya Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-gray-200 block">Email Address</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="priya@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-gray-200">Password</Label>
        <p className="text-xs text-gray-400">Minimum 6 characters</p>
        <div className="relative">
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
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Creating account...
          </span>
        ) : (
          'Create Account'
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
        onClick={() => alert('Google signup coming soon!')}
        className="w-full py-3 border border-slate-600 hover:border-primary/50 hover:bg-slate-700/30 text-gray-200 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
        Sign up with Google
      </Button>
    </form>
  );
});

export default function SignupPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Create Account</h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Join millions planning their perfect Indian wedding
            </p>
          </div>

          {/* Main Card */}
          <div className="relative">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl blur opacity-75" />
            
            {/* Card Content */}
            <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">
              <SignupForm />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Login
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
