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

const AdminLoginForm = memo(function AdminLoginForm() {
  const router = useRouter();
  const { adminLogin } = useAuth();
  const [role, setRole] = useState<'admin' | 'vendor' | ''>('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
  }, [role, userId, password, adminLogin, router]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-500/15 border border-red-500/30 p-4 text-sm text-red-400 backdrop-blur-sm animate-pulse">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-semibold text-gray-200 block">Select Role</Label>
        <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'vendor')}>
          <SelectTrigger id="role" className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all backdrop-blur-sm">
            <SelectValue placeholder="Choose your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="vendor">Vendor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="id" className="text-sm font-semibold text-gray-200 block">User ID / Email</Label>
        <Input
          id="id"
          type="text"
          placeholder="admin@example.com"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-slate-700/80 transition-all duration-300 backdrop-blur-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-gray-200">Password</Label>
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
    </form>
  );
});

export default function AdminLoginPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Admin & Vendor</h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Manage your business and grow your wedding venture
            </p>
          </div>

          {/* Main Card */}
          <div className="relative">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl blur opacity-75" />
            
            {/* Card Content */}
            <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">
              <AdminLoginForm />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-400">
            Are you a customer?{' '}
            <Link href="/auth/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Login here
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
