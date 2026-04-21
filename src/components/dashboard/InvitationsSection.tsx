'use client';

import { motion } from 'framer-motion';
import { Mail, Heart, Download, Plus, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function InvitationsSection() {
  const invitations = [
    {
      id: 1,
      name: 'Digital Invitation 1',
      date: 'Dec 15, 2024',
      sent: 500,
      opened: 420,
      responded: 380,
      status: 'Active',
      type: 'Digital',
      color: 'from-purple-100 to-purple-50',
    },
    {
      id: 2,
      name: 'Wedding Ceremony Invite',
      date: 'Dec 20, 2024',
      sent: 480,
      opened: 350,
      responded: 300,
      status: 'Pending',
      type: 'E-card',
      color: 'from-blue-100 to-blue-50',
    },
    {
      id: 3,
      name: 'Reception Card',
      date: 'Dec 22, 2024',
      sent: 450,
      opened: 280,
      responded: 240,
      status: 'Draft',
      type: 'Digital',
      color: 'from-pink-100 to-pink-50',
    },
  ];

  const templates = [
    { id: 1, name: 'Floral Elegance', image: '🌸', category: 'Modern' },
    { id: 2, name: 'Traditional Gold', image: '✨', category: 'Classic' },
    { id: 3, name: 'Minimalist Chic', image: '🎨', category: 'Modern' },
    { id: 4, name: 'Bollywood Vibes', image: '🎬', category: 'Fun' },
    { id: 5, name: 'Romantic Sunset', image: '🌅', category: 'Romantic' },
    { id: 6, name: 'Ethnic Fusion', image: '🎭', category: 'Traditional' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Invitations</h1>
          <p className="text-gray-600">Create and manage your digital and physical invitations</p>
        </div>
        <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Invitation
        </Button>
      </div>

      {/* Active Invitations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Mail className="h-6 w-6 text-rose-600" />
          Your Invitations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invitations.map((invite, idx) => (
            <motion.div
              key={invite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${invite.color} rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{invite.name}</h3>
                  <p className="text-sm text-gray-600">{invite.date}</p>
                </div>
                <Badge className={`${
                  invite.status === 'Active'
                    ? 'bg-green-200 text-green-800'
                    : invite.status === 'Pending'
                      ? 'bg-amber-200 text-amber-800'
                      : 'bg-gray-200 text-gray-800'
                }`}>
                  {invite.status}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Sent</span>
                  <span className="font-bold text-gray-900">{invite.sent}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Opened</span>
                  <span className="font-bold text-gray-900">{invite.opened} ({((invite.opened / invite.sent) * 100).toFixed(0)}%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">Responded</span>
                  <span className="font-bold text-gray-900">{invite.responded} ({((invite.responded / invite.sent) * 100).toFixed(0)}%)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Invitation Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-600" />
          Invitation Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                {template.image}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{template.category}</p>
                <Button size="sm" className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white">
                  Use Template
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Invitation Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-green-500 pl-4">
            <p className="text-sm text-gray-600 mb-1">Total Sent</p>
            <p className="text-3xl font-bold text-gray-900">1,430</p>
            <p className="text-xs text-gray-600 mt-1">across all invitations</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-600 mb-1">Open Rate</p>
            <p className="text-3xl font-bold text-gray-900">72%</p>
            <p className="text-xs text-gray-600 mt-1">1,050 opened</p>
          </div>
          <div className="border-l-4 border-rose-500 pl-4">
            <p className="text-sm text-gray-600 mb-1">Response Rate</p>
            <p className="text-3xl font-bold text-gray-900">64%</p>
            <p className="text-xs text-gray-600 mt-1">920 responded</p>
          </div>
        </div>
      </motion.div>

      {/* Digital Invitation Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Digital Invitation Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: '🎨', title: 'Customizable Design', desc: 'Choose from 100+ templates' },
            { icon: '📊', title: 'Analytics Tracking', desc: 'Monitor opens and responses' },
            { icon: '📱', title: 'Mobile Optimized', desc: 'Perfect on all devices' },
            { icon: '🔐', title: 'Guest Database', desc: 'Manage all guest information' },
            { icon: '💌', title: 'Email Integration', desc: 'Send directly via email' },
            { icon: '🎯', title: 'RSVP Management', desc: 'Track confirmations easily' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              className="flex gap-3"
            >
              <div className="text-2xl">{feature.icon}</div>
              <div>
                <p className="font-semibold text-gray-900">{feature.title}</p>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
