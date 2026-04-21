'use client';

import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function VendorReviewsSection() {
  const reviews = [
    { id: 1, client: 'Raj Kumar', event: 'Wedding Reception', rating: 5, date: 'Apr 15, 2026', text: 'Exceptional catering service! The food was delicious and the staff was very professional. Highly recommended!' },
    { id: 2, client: 'Priya Singh', event: 'Sangeet Ceremony', rating: 5, date: 'Apr 10, 2026', text: 'Amazing decoration work. The venue looked absolutely stunning. Thank you for making our event special!' },
    { id: 3, client: 'Amit Patel', event: 'Engagement Party', rating: 4, date: 'Apr 5, 2026', text: 'Great service overall. Minor delays but the team was quick to fix it. Would recommend.' },
    { id: 4, client: 'Anushka Sharma', event: 'Wedding Ceremony', rating: 5, date: 'Mar 28, 2026', text: 'Outstanding work! The entertainment was perfect, kept all guests engaged throughout the event.' },
  ];

  const stats = [
    { label: 'Average Rating', value: '4.8', icon: '⭐' },
    { label: 'Total Reviews', value: '95', icon: '💬' },
    { label: 'Positive Reviews', value: '92%', icon: '👍' },
    { label: 'Response Rate', value: '100%', icon: '📞' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
        <p className="text-gray-600">See what your clients say about you</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl p-6 border border-yellow-200 text-center"
          >
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Recent Reviews</h2>
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{review.client}</h3>
                <p className="text-sm text-gray-600">{review.event} • {review.date}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star key={i + review.rating} className="h-4 w-4 text-gray-300" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4">{review.text}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <ThumbsUp className="h-3 w-3" />
                Helpful
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <MessageSquare className="h-3 w-3" />
                Reply
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
