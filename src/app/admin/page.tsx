'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, memo, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3, Home, Users, Store, Ticket, TrendingUp, Settings, LogOut, Search, 
  Eye, Trash2, Edit, Check, X, AlertCircle, Download, Filter, ArrowUp, ArrowDown,
  Mail, Phone, MapPin, Star, DollarSign, Calendar, Clock, MessageSquare, CheckCircle,
  Menu, X as CloseIcon
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample Data
const revenueData = [
  { month: 'Jan', revenue: 8.5, platform: 2.5 },
  { month: 'Feb', revenue: 12.3, platform: 3.2 },
  { month: 'Mar', revenue: 15.8, platform: 4.1 },
  { month: 'Apr', revenue: 18.2, platform: 5.3 },
  { month: 'May', revenue: 22.5, platform: 6.8 },
  { month: 'Jun', revenue: 28.9, platform: 8.2 },
];

const allVendors = [
  { id: 1, name: 'Elegant Events Delhi', owner: 'Rohan Sharma', email: 'rohan@events.com', phone: '+91 98765 43210', city: 'Delhi', category: 'Decoration, Catering', bookings: 142, revenue: 9.98, rating: 4.8, status: 'Verified', verified: true, commission: 0.15 },
  { id: 2, name: 'Royal Wedding Planners', owner: 'Priya Verma', email: 'priya@royal.com', phone: '+91 87654 32109', city: 'Mumbai', category: 'Event Planning', bookings: 98, revenue: 7.45, rating: 4.7, status: 'Verified', verified: true, commission: 0.15 },
  { id: 3, name: 'Dream Decor Studio', owner: 'Amit Patel', email: 'amit@dreamdecor.com', phone: '+91 76543 21098', city: 'Bangalore', category: 'Decoration', bookings: 67, revenue: 5.32, rating: 4.5, status: 'Pending', verified: false, commission: 0.15 },
  { id: 4, name: 'DJ Masters', owner: 'Sanjay Kumar', email: 'sanjay@djmasters.com', phone: '+91 65432 10987', city: 'Hyderabad', category: 'DJ Services', bookings: 156, revenue: 11.23, rating: 4.9, status: 'Verified', verified: true, commission: 0.15 },
  { id: 5, name: 'Photography Pro', owner: 'Neha Singh', email: 'neha@photopro.com', phone: '+91 54321 09876', city: 'Pune', category: 'Photography', bookings: 89, revenue: 6.78, rating: 4.4, status: 'Suspended', verified: true, commission: 0.15 },
];

const allUsers = [
  { id: 1, name: 'Rajesh Sharma', email: 'rajesh@email.com', phone: '+91 9876543210', joinDate: '2024-01-15', bookings: 5, spent: 2.5, city: 'Delhi', status: 'Active' },
  { id: 2, name: 'Ananya Gupta', email: 'ananya@email.com', phone: '+91 8765432109', joinDate: '2024-02-20', bookings: 3, spent: 1.8, city: 'Mumbai', status: 'Active' },
  { id: 3, name: 'Vikram Patel', email: 'vikram@email.com', phone: '+91 7654321098', joinDate: '2024-03-10', bookings: 8, spent: 4.2, city: 'Bangalore', status: 'Active' },
  { id: 4, name: 'Pooja Reddy', email: 'pooja@email.com', phone: '+91 6543210987', joinDate: '2024-01-05', bookings: 2, spent: 1.2, city: 'Hyderabad', status: 'Inactive' },
  { id: 5, name: 'Arjun Nair', email: 'arjun@email.com', phone: '+91 5432109876', joinDate: '2024-04-12', bookings: 12, spent: 6.5, city: 'Pune', status: 'Active' },
];

const tickets = [
  { id: 1, title: 'Vendor verification issue', fromName: 'Amit Patel', fromEmail: 'amit@dreamdecor.com', type: 'Vendor Support', category: 'Verification', status: 'Open', priority: 'High', date: '2024-06-28', messages: 3 },
  { id: 2, title: 'Booking cancellation request', fromName: 'Rajesh Sharma', fromEmail: 'rajesh@email.com', type: 'Customer Support', category: 'Bookings', status: 'In Progress', priority: 'Medium', date: '2024-06-27', messages: 5 },
  { id: 3, title: 'Payment issue resolved', fromName: 'Ananya Gupta', fromEmail: 'ananya@email.com', type: 'Customer Support', category: 'Payments', status: 'Closed', priority: 'Low', date: '2024-06-26', messages: 2 },
  { id: 4, title: 'Technical bug in dashboard', fromName: 'Rohan Sharma', fromEmail: 'rohan@events.com', type: 'Vendor Support', category: 'Technical', status: 'Open', priority: 'Critical', date: '2024-06-28', messages: 1 },
  { id: 5, title: 'Commission structure question', fromName: 'Priya Verma', fromEmail: 'priya@royal.com', type: 'Vendor Support', category: 'Billing', status: 'In Progress', priority: 'Medium', date: '2024-06-27', messages: 4 },
];

// Tab Components - Memoized for Performance
const DashboardTab = memo(function DashboardTab() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Platform Overview & Key Metrics</p>
        </div>
        <Button variant="outline" className="md:w-auto w-full"><Download className="w-4 h-4 mr-2" />Export Report</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-2xl md:text-3xl font-bold">₹105.92L</p>
              <div className="flex items-center gap-1 text-green-600 text-xs md:text-sm mt-2">
                <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                <span>+28% this month</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 md:w-12 md:h-12 text-blue-300" />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Platform Commission</p>
              <p className="text-2xl md:text-3xl font-bold">₹30.21L</p>
              <div className="flex items-center gap-1 text-green-600 text-xs md:text-sm mt-2">
                <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                <span>+32% this month</span>
              </div>
            </div>
            <BarChart3 className="w-8 h-8 md:w-12 md:h-12 text-purple-300" />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Active Vendors</p>
              <p className="text-2xl md:text-3xl font-bold">247</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">12 pending verification</p>
            </div>
            <Store className="w-8 h-8 md:w-12 md:h-12 text-green-300" />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Active Users</p>
              <p className="text-2xl md:text-3xl font-bold">5,432</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">+234 this week</p>
            </div>
            <Users className="w-8 h-8 md:w-12 md:h-12 text-orange-300" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
          <h3 className="text-base md:text-lg font-bold mb-4">Revenue Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Total Revenue (L)" />
              <Line type="monotone" dataKey="platform" stroke="#f59e0b" strokeWidth={2} name="Commission (L)" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-base md:text-lg font-bold mb-4">Quick Stats</h3>
          <div className="space-y-2 md:space-y-3">
            <div className="flex justify-between items-center p-2 md:p-3 bg-blue-50 rounded-lg text-sm md:text-base">
              <span className="text-xs md:text-sm font-semibold">Total Bookings</span>
              <span className="text-xl md:text-2xl font-bold text-blue-600">8,547</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-green-50 rounded-lg text-sm md:text-base">
              <span className="text-xs md:text-sm font-semibold">Satisfied Customers</span>
              <span className="text-xl md:text-2xl font-bold text-green-600">4,890</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-purple-50 rounded-lg text-sm md:text-base">
              <span className="text-xs md:text-sm font-semibold">Avg Rating</span>
              <span className="text-xl md:text-2xl font-bold text-purple-600">4.7/5</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-orange-50 rounded-lg text-sm md:text-base">
              <span className="text-xs md:text-sm font-semibold">Open Tickets</span>
              <span className="text-xl md:text-2xl font-bold text-orange-600">24</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-base md:text-lg font-bold mb-4">Recent Activity</h3>
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center justify-between p-2 md:p-3 border-l-4 border-green-500 bg-green-50">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm md:text-base">New Vendor Verified</p>
              <p className="text-xs md:text-sm text-muted-foreground truncate">DJ Masters joined the platform</p>
            </div>
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 ml-2" />
          </div>
          <div className="flex items-center justify-between p-2 md:p-3 border-l-4 border-blue-500 bg-blue-50">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm md:text-base">₹2.5L Booking Completed</p>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Sharma Wedding event successfully concluded</p>
            </div>
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0 ml-2" />
          </div>
          <div className="flex items-center justify-between p-2 md:p-3 border-l-4 border-orange-500 bg-orange-50">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm md:text-base">Support Ticket Opened</p>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Technical issue reported - High Priority</p>
            </div>
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0 ml-2" />
          </div>
        </div>
      </Card>
    </div>
  );
});

const VendorsTab = memo(function VendorsTab() {
  const [search, setSearch] = useState('');
  const filteredVendors = useMemo(() => allVendors.filter(v => v.name.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">All Vendors</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto"><Filter className="w-4 h-4 mr-2" />Filter</Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-gray-50 border-b sticky top-0">
            <tr>
              <th className="text-left px-3 md:px-6 py-3 font-semibold">Vendor</th>
              <th className="text-left px-3 md:px-6 py-3 font-semibold hidden sm:table-cell">Owner</th>
              <th className="text-left px-3 md:px-6 py-3 font-semibold hidden md:table-cell">Email</th>
              <th className="text-center px-3 md:px-6 py-3 font-semibold">Bookings</th>
              <th className="text-right px-3 md:px-6 py-3 font-semibold">Revenue</th>
              <th className="text-center px-3 md:px-6 py-3 font-semibold hidden lg:table-cell">Rating</th>
              <th className="text-left px-3 md:px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-3 md:px-6 py-3">
                  <div>
                    <p className="font-semibold text-sm line-clamp-1">{vendor.name}</p>
                    <Badge className={
                      vendor.status === 'Verified' ? 'bg-green-100 text-green-800 text-xs mt-1' :
                      vendor.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 text-xs mt-1' :
                      'bg-red-100 text-red-800 text-xs mt-1'
                    }>
                      {vendor.status}
                    </Badge>
                  </div>
                </td>
                <td className="px-3 md:px-6 py-3 hidden sm:table-cell text-xs md:text-sm">{vendor.owner}</td>
                <td className="px-3 md:px-6 py-3 hidden md:table-cell text-xs">{vendor.email}</td>
                <td className="px-3 md:px-6 py-3 text-center font-semibold text-sm">{vendor.bookings}</td>
                <td className="px-3 md:px-6 py-3 text-right font-semibold text-sm">₹{vendor.revenue}L</td>
                <td className="px-3 md:px-6 py-3 text-center hidden lg:table-cell">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-sm">{vendor.rating}</span>
                  </div>
                </td>
                <td className="px-3 md:px-6 py-3 flex gap-1">
                  <Button variant="ghost" size="sm" className="p-1 h-auto"><Eye className="w-3 h-3 md:w-4 md:h-4" /></Button>
                  <Button variant="ghost" size="sm" className="p-1 h-auto hidden sm:inline-flex"><Edit className="w-3 h-3 md:w-4 md:h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

function UsersTab() {
  const [search, setSearch] = useState('');
  const filteredUsers = allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">All Users</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filter</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-semibold">User Name</th>
              <th className="text-left px-6 py-3 font-semibold">Email</th>
              <th className="text-left px-6 py-3 font-semibold">Phone</th>
              <th className="text-left px-6 py-3 font-semibold">City</th>
              <th className="text-left px-6 py-3 font-semibold">Joined</th>
              <th className="text-left px-6 py-3 font-semibold">Bookings</th>
              <th className="text-left px-6 py-3 font-semibold">Spent</th>
              <th className="text-left px-6 py-3 font-semibold">Status</th>
              <th className="text-left px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{user.name}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.phone}</td>
                <td className="px-6 py-3">{user.city}</td>
                <td className="px-6 py-3">{user.joinDate}</td>
                <td className="px-6 py-3 font-semibold">{user.bookings}</td>
                <td className="px-6 py-3 font-semibold">₹{user.spent}L</td>
                <td className="px-6 py-3">
                  <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-3 flex gap-2">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm"><MessageSquare className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TicketsTab() {
  const [search, setSearch] = useState('');
  const filteredTickets = tickets.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const getStatusColor = (status: string) => {
    if (status === 'Open') return 'bg-red-100 text-red-800';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'Critical') return 'bg-red-100 text-red-800';
    if (priority === 'High') return 'bg-orange-100 text-orange-800';
    if (priority === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Support Tickets</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button variant="outline"><Filter className="w-4 h-4 mr-2" />Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Open Tickets</p>
          <p className="text-3xl font-bold text-red-600">14</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-3xl font-bold text-blue-600">8</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Closed</p>
          <p className="text-3xl font-bold text-green-600">234</p>
        </Card>
      </div>

      <div className="space-y-3">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
              <div>
                <p className="font-bold">{ticket.title}</p>
                <p className="text-sm text-muted-foreground">{ticket.fromName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-semibold">{ticket.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-semibold">{ticket.type}</p>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90"><Check className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RevenueTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Revenue Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
          <p className="text-sm text-muted-foreground mb-2">All-Time Revenue</p>
          <p className="text-3xl font-bold">₹105.92L</p>
          <p className="text-green-600 text-sm mt-2">+12% YoY growth</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <p className="text-sm text-muted-foreground mb-2">Platform Commission (15%)</p>
          <p className="text-3xl font-bold">₹15.89L</p>
          <p className="text-muted-foreground text-sm mt-2">Last 30 days</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
          <p className="text-sm text-muted-foreground mb-2">Vendor Payouts</p>
          <p className="text-3xl font-bold">₹90.03L</p>
          <p className="text-muted-foreground text-sm mt-2">Total paid to vendors</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50">
          <p className="text-sm text-muted-foreground mb-2">Avg Booking Value</p>
          <p className="text-3xl font-bold">₹12,400</p>
          <p className="text-green-600 text-sm mt-2">+8% from last month</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4">Revenue Breakdown (Last 12 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}L`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Total Revenue" />
              <Line type="monotone" dataKey="platform" stroke="#f59e0b" strokeWidth={2} name="Commission" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4">Revenue by Vendor Category</h3>
          <div className="space-y-3">
            {[
              { category: 'Decoration', revenue: 28.5, percent: 27 },
              { category: 'Catering', revenue: 24.3, percent: 23 },
              { category: 'Photography', revenue: 18.9, percent: 18 },
              { category: 'DJ Services', revenue: 16.2, percent: 15 },
              { category: 'Event Planning', revenue: 18.0, percent: 17 },
            ].map((item) => (
              <div key={item.category} className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-semibold mb-1">{item.category}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold">₹{item.revenue}L</p>
                  <p className="text-xs text-muted-foreground">{item.percent}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Revenue Vendors */}
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-bold mb-4">Top 10 Revenue-Generating Vendors</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 font-semibold">Rank</th>
                <th className="text-left px-6 py-3 font-semibold">Vendor Name</th>
                <th className="text-left px-6 py-3 font-semibold">Bookings</th>
                <th className="text-left px-6 py-3 font-semibold">Revenue</th>
                <th className="text-left px-6 py-3 font-semibold">Commission</th>
                <th className="text-left px-6 py-3 font-semibold">Growth</th>
              </tr>
            </thead>
            <tbody>
              {allVendors.sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((vendor, idx) => (
                <tr key={vendor.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-bold text-lg">{idx + 1}</td>
                  <td className="px-6 py-3 font-semibold">{vendor.name}</td>
                  <td className="px-6 py-3">{vendor.bookings}</td>
                  <td className="px-6 py-3 font-bold">₹{vendor.revenue}L</td>
                  <td className="px-6 py-3">₹{(vendor.revenue * vendor.commission).toFixed(2)}L</td>
                  <td className="px-6 py-3 text-green-600 font-semibold">+18%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Admin Settings</h1>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-bold mb-4">Commission Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold block mb-2">Default Commission Rate (%)</label>
            <input type="number" defaultValue="15" className="w-full px-4 py-2 border border-input rounded-lg" />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-2">Minimum Booking Value (₹)</label>
            <input type="number" defaultValue="5000" className="w-full px-4 py-2 border border-input rounded-lg" />
          </div>
          <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-bold mb-4">Platform Controls</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-primary/5 rounded">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Allow new vendor registrations</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-primary/5 rounded">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Enable user bookings</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 hover:bg-primary/5 rounded">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Allow vendor payouts</span>
          </label>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow bg-red-50 border border-red-200">
        <h3 className="text-lg font-bold mb-4 text-red-800">Danger Zone</h3>
        <p className="text-muted-foreground mb-4">Irreversible actions</p>
        <div className="space-y-2">
          <Button variant="outline" className="border-red-300 text-red-600 w-full">Clear Cache</Button>
          <Button variant="outline" className="border-red-300 text-red-600 w-full">Reset Statistics</Button>
        </div>
      </Card>
    </div>
  );
}

export default function AdminComprehensivePage() {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vendors' | 'users' | 'tickets' | 'revenue' | 'settings'>('dashboard');

  useEffect(() => {
    if (!isLoading && userType !== 'admin') {
      router.push('/');
    }
  }, [userType, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (userType !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <Button onClick={() => router.push('/')} className="cursor-pointer">Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'vendors', label: 'All Vendors', icon: Store },
    { id: 'users', label: 'All Users', icon: Users },
    { id: 'tickets', label: 'Support Tickets', icon: Ticket },
    { id: 'revenue', label: 'Revenue Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'vendors': return <VendorsTab />;
      case 'users': return <UsersTab />;
      case 'tickets': return <TicketsTab />;
      case 'revenue': return <RevenueTab />;
      case 'settings': return <SettingsTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 shadow-sm overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-amber-700">Pirona Admin</h2>
            <p className="text-xs text-muted-foreground">Control Panel</p>
          </div>

          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-primary/10 text-primary font-semibold border-l-4 border-primary'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 mt-4">
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8 w-full">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTab()}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-sm text-gray-600">
        <p>© 2026 Pirona Admin Panel • All Rights Reserved</p>
      </footer>
    </div>
  );
}
