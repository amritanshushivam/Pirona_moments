'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, Globe, Save, Edit2, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function VendorProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Premium Catering Services',
    owner: 'Raj Kumar',
    email: 'raj@pcs.com',
    phone: '+91 98765 43210',
    location: 'New Delhi, India',
    website: 'www.premiumcatering.com',
    description: 'Professional catering service with 10+ years of experience in wedding ceremonies.',
    yearsInBusiness: '10',
    totalEvents: '250',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Profile</h1>
          <p className="text-gray-600">Manage your business information and portfolio</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white gap-2"
        >
          <Edit2 className="h-4 w-4" />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 h-32" />

        <div className="px-8 pb-8">
          {/* Profile Avatar Section */}
          <div className="flex items-end gap-6 mb-8 pt-6">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 border-4 border-white flex items-center justify-center font-bold text-4xl text-rose-600">
              {formData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{formData.name}</h2>
              <p className="text-gray-600">Owner: {formData.owner}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-4 border border-blue-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <p className="text-sm font-medium text-gray-600">Years in Business</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{formData.yearsInBusiness}+</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-4 border border-green-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-gray-600">Events Completed</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{formData.totalEvents}+</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl p-4 border border-yellow-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⭐</span>
                <p className="text-sm font-medium text-gray-600">Client Rating</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">4.8</p>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name</Label>
                <Input
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label className="block text-sm font-semibold text-gray-700 mb-2">Business Description</Label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:bg-gray-100"
                rows={4}
              />
            </div>

            {isEditing && (
              <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
