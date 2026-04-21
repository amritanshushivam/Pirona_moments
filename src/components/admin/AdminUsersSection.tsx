'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export function AdminUsersSection() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', joinDate: '2024-01-15', status: 'active' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 87654 32109', joinDate: '2024-02-20', status: 'active' },
    { id: 3, name: 'Ananya Patel', email: 'ananya@example.com', phone: '+91 76543 21098', joinDate: '2024-03-10', status: 'inactive' },
    { id: 4, name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 65432 10987', joinDate: '2024-03-22', status: 'active' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
        <p className="text-slate-400">Manage customer accounts and permissions</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-slate-800 border-slate-700 text-white"
        />
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">All Users</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900/50">
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Phone</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Join Date</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-slate-300 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-white">{user.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Phone className="h-4 w-4" />
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{user.joinDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === 'active' 
                            ? 'bg-green-400/20 text-green-300'
                            : 'bg-slate-600/20 text-slate-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:bg-red-400/20"
                          onClick={() => alert('Delete user: ' + user.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
