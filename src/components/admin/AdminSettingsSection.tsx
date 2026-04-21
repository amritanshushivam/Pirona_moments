'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Lock, Globe, Save } from 'lucide-react';
import { useState } from 'react';

export function AdminSettingsSection() {
  const [isEditing, setIsEditing] = useState(false);

  const settings = [
    {
      id: 1,
      icon: Bell,
      title: 'Notifications',
      description: 'Receive email alerts for important events',
      enabled: true,
    },
    {
      id: 2,
      icon: Lock,
      title: 'Security',
      description: 'Manage security settings and permissions',
      enabled: true,
    },
    {
      id: 3,
      icon: Globe,
      title: 'API Access',
      description: 'Manage API keys and integrations',
      enabled: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400">Manage system and admin settings</p>
      </div>

      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">General Settings</CardTitle>
              <Button
                size="sm"
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className="cursor-pointer"
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Platform Name</Label>
                <Input
                  readOnly={!isEditing}
                  defaultValue="Pirona"
                  className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Platform Email</Label>
                <Input
                  readOnly={!isEditing}
                  defaultValue="support@pirona.com"
                  className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Support Phone</Label>
                <Input
                  readOnly={!isEditing}
                  defaultValue="+91 9876543210"
                  className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Commission Rate (%)</Label>
                <Input
                  readOnly={!isEditing}
                  defaultValue="12"
                  className="bg-slate-700 border-slate-600 text-white disabled:opacity-50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feature Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Features & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.map((setting) => {
              const Icon = setting.icon;
              return (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-6 w-6 text-slate-400 mt-1" />
                    <div>
                      <p className="font-medium text-white">{setting.title}</p>
                      <p className="text-sm text-slate-400">{setting.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    setting.enabled
                      ? 'bg-green-400/20 text-green-300'
                      : 'bg-slate-600/20 text-slate-400'
                  }`}>
                    {setting.enabled ? 'Enabled' : 'Disabled'}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-300">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-red-300/80">
              These actions cannot be undone. Please be careful.
            </p>
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              onClick={() => alert('Clear all analytics data')}
            >
              Clear Analytics Data
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
