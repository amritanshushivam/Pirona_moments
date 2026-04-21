'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const reviewsData = [
  { name: 'Excellent', value: 65, icon: '⭐⭐⭐⭐⭐', color: '#f59e0b' },
  { name: 'Good', value: 20, icon: '⭐⭐⭐⭐', color: '#10b981' },
  { name: 'Average', value: 10, icon: '⭐⭐⭐', color: '#3b82f6' },
  { name: 'Poor', value: 5, icon: '⭐⭐', color: '#ef4444' },
];

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

const verificationPoints = [
  { label: 'Verification GST', points: 30 },
  { label: 'PAN', points: 25 },
  { label: 'KYC', points: 20 },
  { label: 'Portfolios', points: 25 },
];

const customerReviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    eventType: 'Wedding',
    eventDate: '20 Nov 2024',
    review: 'Absolutely stunning Mandap decor! Priya was incredibly professional and executed our vision perfectly. Highly recommended!',
    verified: true,
  },
  {
    id: 2,
    name: 'Rohan Gupta',
    rating: 4.5,
    eventType: 'Sangeet',
    eventDate: '15 Nov 2024',
    review: 'Great DJ setup and lighting. The crowd loved the music. A minor delay in soundcheck, but otherwise amazing experience.',
    verified: true,
  },
  {
    id: 3,
    name: 'Ankit Patel',
    rating: 5,
    eventType: 'Engagement',
    eventDate: '10 Nov 2024',
    review: 'Gold Catering was top-notch! The food spread was extensive and delicious. Presentation was very premium. All guests impressed.',
    verified: true,
  },
];

export function VendorReviewsRatings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold mb-2">Reviews & Ratings</h2>
        <p className="text-muted-foreground">Customer feedback and vendor metrics</p>
      </motion.div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">Overall Rating</p>
            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary">98</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
              <div className="flex items-baseline gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-green-600 font-semibold mt-3">Excellent</p>
            <p className="text-xs text-muted-foreground mt-2">Based on 120+ reviews</p>
          </Card>
        </motion.div>

        {/* Trust Dial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">Trust Dial</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-primary">92%</span>
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="mt-3 space-y-1 text-xs">
              {verificationPoints.map((point) => (
                <div key={point.label} className="flex justify-between">
                  <span>✓ {point.label}</span>
                  <span className="text-green-600">({point.points} pts)</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Profile Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">Profile Completion</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-bold text-primary">92%</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Complete your profile to unlock more features</p>
          </Card>
        </motion.div>
      </div>

      {/* Rating Distribution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Review Analytics</h3>
          <div className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={reviewsData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="value">
                  {reviewsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {reviewsData.map((review) => (
                <div key={review.name} className="text-center">
                  <p className="text-2xl">{review.icon}</p>
                  <p className="font-semibold">{review.value}%</p>
                  <p className="text-xs text-muted-foreground">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Customer Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Customer Reviews</h3>
          {customerReviews.map((review, index) => (
            <Card key={review.id} className="p-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-lg">{review.name}</p>
                      {review.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">✓ Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{review.eventType}</span>
                      <span>•</span>
                      <span>{review.eventDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(review.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm font-semibold ml-2">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">{review.review}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Reply to Review
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs gap-1">
                    <ThumbsDown className="w-3 h-3" />
                    Report Fake Review
                  </Button>
                </div>
              </motion.div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
