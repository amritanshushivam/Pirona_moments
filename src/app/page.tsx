'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';

// Lazy load heavy components for better performance
const Packages = dynamic(() => import('@/components/sections/Packages').then(mod => ({ default: mod.Packages })), {
  loading: () => <div className="h-64 md:h-96 bg-secondary/30 animate-pulse" />,
  ssr: true,
});

const RealWeddings = dynamic(() => import('@/components/sections/RealWeddings').then(mod => ({ default: mod.RealWeddings })), {
  loading: () => <div className="h-64 md:h-96 bg-background animate-pulse" />,
  ssr: true,
});

const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="h-64 md:h-96 bg-secondary/30 animate-pulse" />,
  ssr: true,
});

const DigitalInvitations = dynamic(() => import('@/components/sections/DigitalInvitations').then(mod => ({ default: mod.DigitalInvitations })), {
  loading: () => <div className="h-64 md:h-96 bg-background animate-pulse" />,
  ssr: true,
});

const MapSection = dynamic(() => import('@/components/sections/MapSection').then(mod => ({ default: mod.MapSection })), {
  loading: () => <div className="h-96 bg-secondary/30 animate-pulse" />,
  ssr: true,
});

const CookieConsent = dynamic(() => import('@/components/sections/CookieConsent').then(mod => ({ default: mod.CookieConsent })), {
  ssr: false,
});

const ChatbotUI = dynamic(() => import('@/components/sections/ChatbotUI').then(mod => ({ default: mod.ChatbotUI })), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Services Section */}
        <Services />

        {/* Trending Packages */}
        <Packages />

        {/* Real Weddings */}
        <RealWeddings />

        {/* Testimonials */}
        <Testimonials />

        {/* Digital Invitations */}
        <DigitalInvitations />

        {/* Map Section */}
        <MapSection />
      </main>

      <Footer />

      {/* Floating Components */}
      <CookieConsent />
      <ChatbotUI />
    </div>
  );
}

