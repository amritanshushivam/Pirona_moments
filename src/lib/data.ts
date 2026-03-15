import type { LucideIcon } from 'lucide-react';
import { Utensils, Disc, Tent, Camera, Mic, Gem, Bus, Building2, UserCheck, Handshake, Briefcase, Sparkles, Scale } from 'lucide-react';

export type Service = {
  name: string;
  icon: LucideIcon;
  description: string;
};

export type Vendor = {
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  reviews: number;
  priceRange: string;
  isVerified: boolean;
  profileImageId: string;
  portfolioImageIds: string[];
  packages: { name: string; price: string; description: string }[];
  profileDescription: string;
  pastBehavior: string;
};

export type Testimonial = {
    name: string;
    event: string;
    quote: string;
    imageId: string;
};

export type RealWedding = {
    couple: string;
    location: string;
    imageId: string;
};

export type Deal = {
    title: string;
    vendorId: string;
    price: string;
    originalPrice: string;
    discount: string;
    imageId: string;
}

export const services: Service[] = [
  { name: 'Catering', icon: Utensils, description: 'Delicious food for your special day.' },
  { name: 'DJ & Music', icon: Disc, description: 'Get the party started with the best music.' },
  { name: 'Tent & Decoration', icon: Tent, description: 'Beautiful tents and decorations.' },
  { name: 'Photography', icon: Camera, description: 'Capture your precious moments.' },
  { name: 'Venue Booking', icon: Building2, description: 'Find the perfect venue for your wedding.' },
  { name: 'Bridal Makeup', icon: Gem, description: 'Look your best on your wedding day.' },
  { name: 'Band & Dhol', icon: Mic, description: 'Traditional music for your wedding.' },
  { name: 'Transportation', icon: Bus, description: 'Convenient transport for your guests.' },
  { name: 'Event Managers', icon: Briefcase, description: 'Professional planning for a stress-free wedding.' },
  { name: 'Pandit G', icon: UserCheck, description: 'Conduct your wedding rituals with grace.' },
  { name: 'Entertainment', icon: Sparkles, description: 'Live shows, dancers, and more.' },
  { name: 'Dowry-Free Initiative', icon: Handshake, description: 'Support our cause for dowry-free weddings.' },
];

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'Royal Catering',
    location: 'Delhi',
    service: 'Catering',
    rating: 4.8,
    reviews: 120,
    priceRange: '₹800 - ₹2500/plate',
    isVerified: true,
    profileImageId: 'vendor-profile-1',
    portfolioImageIds: ['vendor-catering-1', 'deal-2'],
    packages: [
        { name: 'Silver', price: '₹800/plate', description: 'Basic menu with 10 dishes.' },
        { name: 'Gold', price: '₹1500/plate', description: 'Premium menu with 20 dishes and live counters.' },
        { name: 'Platinum', price: '₹2500/plate', description: 'Exotic menu with 30+ dishes, international cuisine.' },
    ],
    profileDescription: 'Royal Catering has been serving exquisite culinary experiences for weddings for over a decade. We specialize in authentic Indian cuisine and innovative global dishes.',
    pastBehavior: 'Completed 50+ bookings in the last year with overwhelmingly positive feedback. Known for punctuality and food quality. One dispute was raised 6 months ago regarding menu changes, which was resolved with a partial refund.'
  },
  {
    id: '2',
    name: 'DJ Sunny',
    location: 'Mumbai',
    service: 'DJ & Music',
    rating: 4.9,
    reviews: 250,
    priceRange: '₹25,000 - ₹1,00,000',
    isVerified: true,
    profileImageId: 'vendor-profile-2',
    portfolioImageIds: ['vendor-dj-1'],
    packages: [
        { name: 'Standard', price: '₹25,000', description: '4-hour set with standard sound system.' },
        { name: 'Premium', price: '₹50,000', description: '6-hour set, premium sound, and lighting.' },
        { name: 'Ultimate Party', price: '₹1,00,000', description: 'Full night, LED wall, and special effects.' },
    ],
    profileDescription: 'DJ Sunny is one of Mumbai\'s top wedding DJs, known for his electrifying mixes and ability to read the crowd. He ensures a packed dance floor.',
    pastBehavior: 'Highly sought-after vendor with a perfect track record for the past 2 years. All bookings completed successfully. Consistently praised for professionalism and energy.'
  },
  {
    id: '3',
    name: 'Dream Decorators',
    location: 'Bangalore',
    service: 'Tent & Decoration',
    rating: 4.7,
    reviews: 95,
    priceRange: '₹1,00,000 - ₹10,00,000',
    isVerified: false,
    profileImageId: 'vendor-profile-1',
    portfolioImageIds: ['vendor-decor-1', 'vendor-decor-2', 'deal-1'],
    packages: [
        { name: 'Elegant', price: '₹1,00,000', description: 'Stage, entrance, and basic floral decor.' },
        { name: 'Royal', price: '₹5,00,000', description: 'Themed decor, premium lighting, and props.' },
        { name: 'Extravaganza', price: '₹10,00,000', description: 'Custom-designed set with imported flowers and structures.' },
    ],
    profileDescription: 'Dream Decorators turns your wedding venue into a fairytale setting. We offer bespoke decoration services to match your vision and budget.',
    pastBehavior: 'Recent new vendor. Has 5 bookings. Profile shows very low prices for premium packages compared to market rate. Reviews seem generic. Several recent inquiries but low conversion to booking.'
  },
   {
    id: '4',
    name: 'Shutter Stories',
    location: 'Jaipur',
    service: 'Photography',
    rating: 4.9,
    reviews: 180,
    priceRange: '₹80,000 - ₹3,00,000',
    isVerified: true,
    profileImageId: 'vendor-profile-2',
    portfolioImageIds: ['vendor-photo-1', 'deal-3'],
    packages: [
        { name: 'Candid Moments', price: '₹80,000', description: 'Candid photography for one day.' },
        { name: 'Full Coverage', price: '₹1,50,000', description: 'Candid + Traditional photo & video for two days.' },
        { name: 'Cinematic Wedding', price: '₹3,00,000', description: 'Full coverage with drone and a cinematic wedding film.' },
    ],
    profileDescription: 'We don\'t just take photos, we tell stories. Shutter Stories is a team of passionate photographers and cinematographers dedicated to capturing the soul of your wedding.',
    pastBehavior: 'Excellent reputation. All past clients have praised the quality of their work and their team\'s professionalism. No disputes or cancellations in the last 18 months.'
  },
];

export const testimonials: Testimonial[] = [
    {
        name: 'Priya & Rohan',
        event: 'Wedding in Delhi',
        quote: 'Pirona made our wedding planning a breeze! The AI planner suggested the best vendors within our budget. Highly recommended!',
        imageId: 'testimonial-1',
    },
    {
        name: 'Anjali Sharma',
        event: 'Sister\'s Engagement, Mumbai',
        quote: 'The vendors were professional and verified. The fraud detection feature gave us so much peace of mind. Everything was seamless from booking to payment.',
        imageId: 'testimonial-2',
    },
    {
        name: 'Sameer Gupta',
        event: 'Destination Wedding, Jaipur',
        quote: 'Found our dream venue and decor team through this platform. The AR preview was a game-changer! It helped us visualize everything perfectly.',
        imageId: 'testimonial-3',
    },
    {
        name: 'Riya & Karan',
        event: 'Wedding in Bangalore',
        quote: 'The user interface is so intuitive. We planned our entire wedding from our couch. The vendor list is extensive and reliable.',
        imageId: 'testimonial-4',
    },
    {
        name: 'Aarav Mehta',
        event: 'Brother\'s Wedding, Kolkata',
        quote: 'Pirona\'s customer support is top-notch. They helped us with a last-minute change without any hassle. A truly trustworthy platform.',
        imageId: 'testimonial-5',
    },
    {
        name: 'Neha & Siddharth',
        event: 'Wedding in Chennai',
        quote: 'The deals and packages section helped us save a lot! We got a fantastic photographer at a great price. Thank you, Pirona!',
        imageId: 'testimonial-6',
    },
];

export const realWeddings: RealWedding[] = [
    {
        couple: 'Sneha & Rahul',
        location: 'Udaipur',
        imageId: 'real-wedding-1',
    },
    {
        couple: 'Meera & Arjun',
        location: 'Goa',
        imageId: 'real-wedding-2',
    },
    {
        couple: 'Aisha & Kabir',
        location: 'Kerala',
        imageId: 'real-wedding-3',
    },
    {
        couple: 'Diya & Ishaan',
        location: 'Jaipur',
        imageId: 'couple1',
    },
];

export const deals: Deal[] = [
    {
        title: 'Grand Decor Package',
        vendorId: '3',
        price: '₹4,50,000',
        originalPrice: '₹5,00,000',
        discount: '10% OFF',
        imageId: 'deal-1',
    },
    {
        title: 'Royal Feast Catering',
        vendorId: '1',
        price: '₹1,200/plate',
        originalPrice: '₹1,500/plate',
        discount: '20% OFF',
        imageId: 'deal-2',
    },
    {
        title: 'Complete Wedding Film',
        vendorId: '4',
        price: '₹2,50,000',
        originalPrice: '₹3,00,000',
        discount: '₹50k OFF',
        imageId: 'deal-3',
    },
]
