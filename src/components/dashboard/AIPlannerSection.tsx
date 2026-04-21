'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wand2, Lightbulb, CheckSquare, Clock, Users, Sparkles } from 'lucide-react';

const aiFeatures = [
  {
    icon: Wand2,
    title: 'Build My Wedding Plan',
    description: 'Create a personalized wedding plan based on your preferences',
    color: 'from-blue-400 to-blue-600',
    action: 'Start Planning'
  },
  {
    icon: Lightbulb,
    title: 'Suggest Budget Package',
    description: 'Get AI-recommended budget packages tailored to your needs',
    color: 'from-amber-400 to-amber-600',
    action: 'View Options'
  },
  {
    icon: CheckSquare,
    title: 'Create Guest Checklist',
    description: 'Generate a complete guest management checklist',
    color: 'from-green-400 to-green-600',
    action: 'Create Now'
  },
  {
    icon: Clock,
    title: 'Build Event Timeline',
    description: 'Get a detailed timeline for your wedding events',
    color: 'from-purple-400 to-purple-600',
    action: 'Generate'
  },
  {
    icon: Users,
    title: 'Find Best Vendors',
    description: 'Discover top-rated vendors matching your budget',
    color: 'from-pink-400 to-pink-600',
    action: 'Explore'
  },
  {
    icon: Sparkles,
    title: 'Recommended Next Steps',
    description: 'Get AI suggestions for your next actions',
    color: 'from-rose-400 to-rose-600',
    action: 'Discover'
  },
];

export function AIPlannerSection() {
  return (
    <motion.div
      className="backdrop-blur-md bg-gradient-to-br from-white/70 to-purple-50/40 border border-white/60 rounded-3xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mb-4">
            <Wand2 className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">AI Wedding Planner Dashboard</h2>
          <p className="text-lg text-gray-600">Your Personalized AI Wedding Planner</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white border border-gray-100 group cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Header with Icon */}
                <div className={`relative h-28 bg-gradient-to-br ${feature.color} flex items-center justify-center overflow-hidden`}>
                  <motion.div
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Icon className="h-14 w-14 text-white relative z-10 group-hover:scale-110 transition-transform" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 text-justify">{feature.description}</p>
                  
                  <Button
                    className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg text-white font-semibold py-2 px-4 rounded-lg transition-all cursor-pointer`}
                    onClick={() => alert(`${feature.title} feature coming soon!`)}
                  >
                    {feature.action}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recommendation Card */}
        <motion.div
          className="mt-8 backdrop-blur-sm bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-blue-200 rounded-2xl p-6 flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-purple-600">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">AI Recommendation</h3>
            <p className="text-sm text-gray-600 mt-1">Perfect Favor Idea: Custom Seed Packets 🌱</p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg cursor-pointer"
            onClick={() => alert('Exploring AI recommendations!')}
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
