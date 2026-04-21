'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, Edit2, Save, X } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  rating: number;
  price: string;
  category: string;
  contact?: string;
  location?: string;
  image?: string;
}

const defaultVendors: Vendor[] = [
  { id: '1', name: 'Ornate Petals Decor', rating: 4.5, price: '₹8,000', category: 'Decoration', contact: '+91-9876543210', location: 'Delhi' },
  { id: '2', name: 'Chef\'s Palette Catering', rating: 5.0, price: '₹12,000', category: 'Catering', contact: '+91-9876543211', location: 'Gurgaon' },
  { id: '3', name: 'Grand Marquise Ballroom', rating: 4.3, price: '₹25,000', category: 'Venue', contact: '+91-9876543212', location: 'Noida' },
  { id: '4', name: 'Aura Sound & Lights DJ', rating: 4.7, price: '₹3,500', category: 'DJ', contact: '+91-9876543213', location: 'Delhi' },
];

export function RecommendedVendorsSection() {
  const [vendors, setVendors] = useState(defaultVendors);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Vendor | null>(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('recommendedVendors');
    if (saved) {
      try {
        setVendors(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load vendors:', e);
      }
    }
  }, []);

  const handleSave = () => {
    if (editValues && editingId) {
      const updatedVendors = vendors.map(v => (v.id === editingId ? editValues : v));
      setVendors(updatedVendors);
      localStorage.setItem('recommendedVendors', JSON.stringify(updatedVendors));
      setEditingId(null);
      setSaveStatus('✓ Vendor updated!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDelete = (id: string) => {
    const updatedVendors = vendors.filter(v => v.id !== id);
    setVendors(updatedVendors);
    localStorage.setItem('recommendedVendors', JSON.stringify(updatedVendors));
    setSaveStatus('✓ Vendor removed!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <motion.div
      className="backdrop-blur-md bg-gradient-to-br from-white/70 to-orange-50/40 border border-white/60 rounded-3xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Pirona Recommended Vendors</h2>
          <div className="text-right">
            {saveStatus && <p className="text-sm font-semibold text-green-600">{saveStatus}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              className="backdrop-blur-sm bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ y: -8 }}
            >
              {editingId === vendor.id ? (
                <>
                  <input
                    type="text"
                    value={editValues?.name || ''}
                    onChange={(e) => setEditValues({ ...editValues!, name: e.target.value })}
                    className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-sm"
                    placeholder="Vendor name"
                  />
                  <input
                    type="text"
                    value={editValues?.category || ''}
                    onChange={(e) => setEditValues({ ...editValues!, category: e.target.value })}
                    className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-sm"
                    placeholder="Category"
                  />
                  <input
                    type="text"
                    value={editValues?.price || ''}
                    onChange={(e) => setEditValues({ ...editValues!, price: e.target.value })}
                    className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-sm"
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    value={editValues?.contact || ''}
                    onChange={(e) => setEditValues({ ...editValues!, contact: e.target.value })}
                    className="w-full px-2 py-1 mb-2 border border-gray-300 rounded text-sm"
                    placeholder="Contact"
                  />
                  <input
                    type="text"
                    value={editValues?.location || ''}
                    onChange={(e) => setEditValues({ ...editValues!, location: e.target.value })}
                    className="w-full px-2 py-1 mb-3 border border-gray-300 rounded text-sm"
                    placeholder="Location"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold cursor-pointer rounded flex items-center justify-center gap-1"
                    >
                      <Save className="h-3 w-3" /> Save
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white text-xs font-bold cursor-pointer rounded"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{vendor.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{vendor.category}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(vendor.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs font-bold text-gray-700 ml-1">{vendor.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                    <p className="text-2xl font-bold text-amber-700">{vendor.price}</p>
                    {vendor.contact && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Phone className="h-3 w-3 text-amber-600" />
                        {vendor.contact}
                      </div>
                    )}
                    {vendor.location && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="h-3 w-3 text-amber-600" />
                        {vendor.location}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingId(vendor.id);
                        setEditValues(vendor);
                      }}
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer rounded flex items-center justify-center gap-1"
                    >
                      <Edit2 className="h-3 w-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(vendor.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer rounded"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold cursor-pointer">
            Find Full Vendor Directory
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
