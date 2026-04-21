'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp, Calendar, CheckCircle, DollarSign, Download, Star, Settings, Package, AlertCircle,
  Home, User, Briefcase, ImageIcon, Shield, HelpCircle, LogOut, Search,
  Upload, Edit, Trash2, Plus, Award, Activity, PieChart as ChartPie, ArrowUp, ArrowDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample Data
const earningsData = [
  { month: 'Jan', earnings: 0.5 },
  { month: 'Feb', earnings: 0.8 },
  { month: 'Mar', earnings: 1.2 },
  { month: 'Apr', earnings: 1.0 },
  { month: 'May', earnings: 1.5 },
  { month: 'Jun', earnings: 1.98 },
];

const bookingTrendData = [
  { month: 'Jan', bookings: 25 },
  { month: 'Feb', bookings: 28 },
  { month: 'Mar', bookings: 16 },
  { month: 'Apr', bookings: 22 },
  { month: 'May', bookings: 30 },
  { month: 'Jun', bookings: 13 },
];

const packages = [
  { id: 1, name: 'Basic Mandap Setup', price: '₹15,000', rating: 4.5, bookings: 28, status: 'Approved', statusColor: 'bg-green-100 text-green-800' },
  { id: 2, name: 'Premium Royal Mandap', price: '₹35,000', rating: 4.8, bookings: 45, status: 'Approved', statusColor: 'bg-green-100 text-green-800' },
  { id: 3, name: 'Luxury Catering', price: '₹50,000', rating: 4.9, bookings: 69, status: 'Approved', statusColor: 'bg-green-100 text-green-800' },
];

const upcomingBookings = [
  { id: 1, clientName: 'Sharma Family', eventType: 'Wedding', date: 'Jul 15, 2024', budget: '₹5,00,000', status: 'Confirmed', contact: '+91 98765 12345' },
  { id: 2, clientName: 'Gupta Family', eventType: 'Engagement', date: 'Jul 20, 2024', budget: '₹3,00,000', status: 'Confirmed', contact: '+91 87654 32109' },
  { id: 3, clientName: 'Patel Family', eventType: 'Sangeet', date: 'Jul 25, 2024', budget: '₹2,00,000', status: 'Pending', contact: '+91 76543 21098' },
];

const portfolioItems = [
  { id: 1, type: 'Decoration', title: 'Diamond Mandap Setup', image: 'decoration-1.jpg', featured: true, bookings: 28 },
  { id: 2, type: 'Catering', title: 'Luxury Catering', image: 'catering-1.jpg', featured: true, bookings: 45 },
  { id: 3, type: 'DJ', title: 'DJ Setup with Light', image: 'dj-1.jpg', featured: true, bookings: 69 },
  { id: 4, type: 'Photography', title: 'Wedding Photography', image: 'photo-1.jpg', featured: false, bookings: 32 },
  { id: 5, type: 'Makeup', title: 'Bridal Makeup', image: 'makeup-1.jpg', featured: false, bookings: 51 },
];

const paymentHistory = [
  { date: '30 Jun 2024', amount: '₹2,30,000', method: 'NEFT', status: 'Paid' },
  { date: '27 Jun 2024', amount: '₹2,15,000', method: 'NEFT', status: 'Paid' },
  { date: '20 Jun 2024', amount: '₹1,60,000', method: 'NEFT', status: 'Paid' },
  { date: '16 Jun 2024', amount: '₹1,75,000', method: 'NEFT', status: 'Paid' },
  { date: '15 Jun 2024', amount: '₹2,75,000', method: 'NEFT', status: 'Pending' },
];

const reviews = [
  { id: 1, clientName: 'Priya Sharma', rating: 5, text: 'Excellent service! The mandap decoration was stunning and perfectly executed.', date: 'Jun 28, 2024' },
  { id: 2, clientName: 'Rajesh Gupta', rating: 5, text: 'Perfect catering service. All guests were very satisfied with the food quality.', date: 'Jun 25, 2024' },
  { id: 3, clientName: 'Neha Patel', rating: 4, text: 'Good service, minor delay but overall great experience and satisfied with work.', date: 'Jun 22, 2024' },
];

// Tab Components
function DashboardTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview</p>
        </div>
        <Badge className="bg-amber-100 text-amber-800">Pirona Trust Seal ✓</Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
              <p className="text-3xl font-bold">142</p>
              <div className="flex items-center gap-1 text-green-600 text-sm mt-2">
                <ArrowUp className="w-4 h-4" />
                <span>+12% vs last month</span>
              </div>
            </div>
            <Calendar className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
              <p className="text-3xl font-bold">₹9.98L</p>
              <div className="flex items-center gap-1 text-green-600 text-sm mt-2">
                <ArrowUp className="w-4 h-4" />
                <span>+₹30k this week</span>
              </div>
            </div>
            <DollarSign className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Rating</p>
              <p className="text-3xl font-bold">4.8/5</p>
              <p className="text-yellow-600 text-sm mt-2">Based on 142 reviews</p>
            </div>
            <Star className="w-12 h-12 text-yellow-500 opacity-20" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Packages</p>
              <p className="text-3xl font-bold">3</p>
              <p className="text-blue-600 text-sm mt-2">All approved ✓</p>
            </div>
            <Package className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-bold mb-4">Monthly Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value) => `₹${value}L`} />
              <Line type="monotone" dataKey="earnings" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Booking Trend Chart */}
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-bold mb-4">Monthly Booking Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="bookings" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-4">Verification Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-muted-foreground mb-1">Profile</p>
            <p className="font-bold text-green-700">92% Complete</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-muted-foreground mb-1">GST Certificate</p>
            <p className="font-bold text-green-700">✓ Verified</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-muted-foreground mb-1">PAN Card</p>
            <p className="font-bold text-green-700">✓ Verified</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-muted-foreground mb-1">Trust Score</p>
            <p className="font-bold text-green-700">98/100</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MyProfileTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-2">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <Card className="lg:col-span-2 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <h3 className="text-lg font-bold mb-6">Basic Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold block mb-2">Full Name</label>
                <input type="text" defaultValue="Rohan Sharma" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Business Name</label>
                <input type="text" defaultValue="Elegant Events Delhi" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2">Email Address</label>
              <input type="email" defaultValue="rohan.events.delhi@gmail.com" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold block mb-2">Mobile Number</label>
                <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Alternate Number</label>
                <input type="tel" defaultValue="+91 9999888777" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold block mb-2">Business Category</label>
                <select className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Wedding Decorator</option>
                  <option>Event Planner</option>
                  <option>DJ Services</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Years of Experience</label>
                <input type="number" defaultValue="8" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </div>
        </Card>

        {/* Trust Score Card */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold mb-4">Trust & Completion</h3>
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">98</p>
                <p className="text-xs text-white">/100</p>
              </div>
            </div>
            <p className="font-bold text-lg text-amber-900">Excellent</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between"><span>GST (30 pts)</span> <Badge className="bg-green-100 text-green-800">✓</Badge></p>
            <p className="flex justify-between"><span>PAN (25 pts)</span> <Badge className="bg-green-100 text-green-800">✓</Badge></p>
            <p className="flex justify-between"><span>KYC (20 pts)</span> <Badge className="bg-green-100 text-green-800">✓</Badge></p>
            <p className="flex justify-between"><span>Location (23 pts)</span> <Badge className="bg-green-100 text-green-800">✓</Badge></p>
          </div>
          <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700">Complete 100%</Button>
        </Card>
      </div>
    </div>
  );
}

function PackagesTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Services & Packages</h1>
        <Button className="bg-primary hover:bg-primary/90"><Plus className="w-4 h-4 mr-2" />Add New Package</Button>
      </div>

      {/* New Package Form */}
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-4">Create New Package</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-2">Package Name</label>
              <input type="text" placeholder="Diamond Mandap & Decor Package" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2">Description</label>
              <textarea placeholder="Describe your service..." rows={4} className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold block mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Decoration</option>
                  <option>Catering</option>
                  <option>DJ</option>
                  <option>Photography</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Price</label>
                <input type="number" placeholder="₹2,80,000" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2">Event Types Supported</label>
              <div className="flex flex-wrap gap-2">
                {['Weddings', 'Engagements', 'Pre-Weddings', 'Corporate'].map((type) => (
                  <Badge key={type} className="bg-amber-100 text-amber-800 cursor-pointer hover:bg-amber-200">{type}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold block mb-2">Upload Sample Images</label>
              <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">3-5 high-resolution images</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold block mb-2">Featured Status</label>
              <select className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="Active">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-primary hover:bg-primary/90">Save as Draft</Button>
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700">Submit for Approval</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Existing Packages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{pkg.name}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{pkg.price}</p>
              </div>
              <Badge className={pkg.statusColor}>{pkg.status}</Badge>
            </div>

            <div className="space-y-3 flex-1 bg-gray-50 p-3 rounded mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{pkg.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Bookings</span>
                <span className="font-semibold">{pkg.bookings}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm" className="flex-1"><Edit className="w-3 h-3 mr-1" />Edit</Button>
              <Button variant="outline" size="sm" className="flex-1"><Trash2 className="w-3 h-3 mr-1" />Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PortfolioUploadsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Portfolio Uploads</h1>
        <Button className="bg-primary hover:bg-primary/90"><Upload className="w-4 h-4 mr-2" />Upload Media</Button>
      </div>

      {/* Upload Area */}
      <Card className="p-8 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-primary/30" />
          <p className="text-lg font-semibold mb-2">Drag & drop your images here</p>
          <p className="text-muted-foreground mb-4">or click to browse from your device</p>
          <Button className="bg-primary hover:bg-primary/90">Browse Files</Button>
        </div>
      </Card>

      {/* Portfolio Gallery */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Your Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 h-40 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-amber-300" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Badge className="bg-amber-100 text-amber-800 mb-2">{item.type}</Badge>
                    <p className="font-bold">{item.title}</p>
                  </div>
                  {item.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.bookings} bookings</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1"><Edit className="w-3 h-3" /></Button>
                  <Button variant="outline" size="sm" className="flex-1"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookingsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-2">Bookings</h1>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Upcoming Events</h3>
          <Badge className="bg-blue-100 text-blue-800">{upcomingBookings.length} Bookings</Badge>
        </div>
      </Card>

      <div className="space-y-4">
        {upcomingBookings.map((booking) => (
          <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Client Name</p>
                <p className="font-bold">{booking.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Event Type</p>
                <p className="font-bold">{booking.eventType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Event Date</p>
                <p className="font-bold">{booking.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Budget</p>
                <p className="font-bold text-primary">{booking.budget}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {booking.status}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1 text-xs">Details</Button>
                  <Button size="sm" className="flex-1 text-xs bg-primary hover:bg-primary/90">Message</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EarningsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Earnings & Payments</h1>
        <Button variant="outline"><Download className="w-4 h-4 mr-2" />Download Report</Button>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Earnings</p>
              <p className="text-3xl font-bold">₹9,98,000</p>
              <p className="text-green-600 text-sm mt-2">All-time earnings</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-300" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Amount Paid</p>
              <p className="text-3xl font-bold">₹8,80,000</p>
              <p className="text-blue-600 text-sm mt-2">88% of total</p>
            </div>
            <CheckCircle className="w-12 h-12 text-blue-300" />
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Pending Payout</p>
              <p className="text-3xl font-bold">₹1,18,000</p>
              <p className="text-orange-600 text-sm mt-2">Next: 15 Jul 2024</p>
            </div>
            <AlertCircle className="w-12 h-12 text-orange-300" />
          </div>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-4">Recent Payouts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-semibold">Date</th>
                <th className="text-left py-3 font-semibold">Amount</th>
                <th className="text-left py-3 font-semibold">Method</th>
                <th className="text-left py-3 font-semibold">Status</th>
                <th className="text-left py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, idx) => (
                <tr key={idx} className="border-b hover:bg-secondary/50">
                  <td className="py-4">{payment.date}</td>
                  <td className="py-4 font-semibold">{payment.amount}</td>
                  <td className="py-4">{payment.method}</td>
                  <td className="py-4">
                    <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-2">Reviews & Ratings</h1>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <p className="text-sm text-muted-foreground mb-3">Average Rating</p>
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold">4.9</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              ))}
            </div>
          </div>
          <p className="text-green-600 text-sm mt-2">Excellent</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <p className="text-sm text-muted-foreground mb-3">Total Reviews</p>
          <div className="text-4xl font-bold">128</div>
          <p className="text-muted-foreground text-sm mt-2">All-time reviews</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <p className="text-sm text-muted-foreground mb-3">Positive Reviews</p>
          <div className="text-4xl font-bold">98%</div>
          <p className="text-green-600 text-sm mt-2">126 out of 128</p>
        </Card>
      </div>

      {/* Recent Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Recent Customer Reviews</h3>
        {reviews.map((review) => (
          <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-bold">{review.clientName}</p>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-4 h-4 ${i <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">{review.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function VerificationTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-2">Verification Status</h1>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-4">Verification Progress</h3>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Profile Completion</p>
            <p className="text-3xl font-bold">92%</p>
          </div>
          <div className="text-6xl font-bold text-green-600">✓</div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold">GST Certificate</p>
              <p className="text-sm text-muted-foreground">07AAACT1234F1Z1 • Verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold">PAN Card</p>
              <p className="text-sm text-muted-foreground">ABCDE1234F • Verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold">KYC Verification</p>
              <p className="text-sm text-muted-foreground">Address & ID Verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-semibold">Portfolio Images (3 more needed)</p>
              <p className="text-sm text-muted-foreground">Add 3 high-resolution portfolio images</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-4">Trust Score: 98/100</h3>
        <p className="text-muted-foreground mb-4">Your vendor profile is highly trusted by customers. Keep maintaining quality service to sustain high ratings.</p>
        <Button className="bg-primary hover:bg-primary/90 w-full">Complete Missing Documents</Button>
      </Card>
    </div>
  );
}

function SupportTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-2">Support / Help</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <HelpCircle className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-bold mb-2">FAQ</h3>
          <p className="text-muted-foreground mb-4">Find answers to common questions about using the vendor dashboard.</p>
          <Button variant="outline" className="w-full">Browse FAQ</Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <AlertCircle className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-bold mb-2">Report Issue</h3>
          <p className="text-muted-foreground mb-4">Report any technical issues or problems you're experiencing.</p>
          <Button variant="outline" className="w-full">Report Issue</Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <Download className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-bold mb-2">Documentation</h3>
          <p className="text-muted-foreground mb-4">Access complete guides and tutorials for the platform.</p>
          <Button variant="outline" className="w-full">View Docs</Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <Settings className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-bold mb-2">Settings</h3>
          <p className="text-muted-foreground mb-4">Manage your account preferences and notification settings.</p>
          <Button variant="outline" className="w-full">Go to Settings</Button>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-2">Contact Us</h3>
        <p className="text-muted-foreground mb-4">Need immediate assistance? Reach out to our support team.</p>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90">Email Support</Button>
          <Button variant="outline">Live Chat</Button>
        </div>
      </Card>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold mb-2">Settings</h1>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer hover:bg-primary/5 p-2 rounded">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-semibold">New Bookings</p>
              <p className="text-sm text-muted-foreground">Get notified when customers book your services</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:bg-primary/5 p-2 rounded">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-semibold">Messages</p>
              <p className="text-sm text-muted-foreground">Receive notifications for customer messages</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:bg-primary/5 p-2 rounded">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-semibold">Payments</p>
              <p className="text-sm text-muted-foreground">Get alerts for payment confirmations</p>
            </div>
          </label>
          <label className="flex items-center gap-3 cursor-pointer hover:bg-primary/5 p-2 rounded">
            <input type="checkbox" className="w-4 h-4" />
            <div>
              <p className="font-semibold">Promotions</p>
              <p className="text-sm text-muted-foreground">Receive marketing offers and updates</p>
            </div>
          </label>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-lg font-bold mb-4">Privacy & Security</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start"><Shield className="w-4 h-4 mr-2" />Change Password</Button>
          <Button variant="outline" className="w-full justify-start"><Shield className="w-4 h-4 mr-2" />Two-Factor Authentication</Button>
          <Button variant="outline" className="w-full justify-start"><Shield className="w-4 h-4 mr-2" />Login Activity</Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-red-50 border border-red-200">
        <h3 className="text-lg font-bold mb-4 text-red-800">Danger Zone</h3>
        <p className="text-muted-foreground mb-4">Permanent actions that cannot be undone.</p>
        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50"><AlertCircle className="w-4 h-4 mr-2" />Deactivate Account</Button>
      </Card>
    </div>
  );
}

export default function VendorDashboardPage() {
  const { user, userType, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'packages' | 'portfolio' | 'bookings' | 'earnings' | 'reviews' | 'verification' | 'support' | 'settings'>('dashboard');

  useEffect(() => {
    if (!isLoading && userType !== 'vendor') {
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

  if (userType !== 'vendor') {
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
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'packages', label: 'My Services & Packages', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio Uploads', icon: ImageIcon },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'earnings', label: 'Earnings & Payments', icon: DollarSign },
    { id: 'reviews', label: 'Reviews & Ratings', icon: Star },
    { id: 'verification', label: 'Verification Status', icon: Shield },
    { id: 'support', label: 'Support / Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const rendertab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'profile': return <MyProfileTab />;
      case 'packages': return <PackagesTab />;
      case 'portfolio': return <PortfolioUploadsTab />;
      case 'bookings': return <BookingsTab />;
      case 'earnings': return <EarningsTab />;
      case 'reviews': return <ReviewsTab />;
      case 'verification': return <VerificationTab />;
      case 'support': return <SupportTab />;
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
            <h2 className="text-lg font-bold text-amber-700">Pirona</h2>
            <p className="text-xs text-muted-foreground">Vendor Dashboard</p>
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
              {rendertab()}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-sm text-gray-600">
        <p>© 2026 Pirona • Vendor Dashboard • All Rights Reserved</p>
      </footer>
    </div>
  );
}
