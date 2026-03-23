'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const invitationTemplates = [
  {
    id: 1,
    name: 'Classic Elegance',
    couple: 'Isha & Vikram',
    date: '15 December 2024',
    time: '7:00 PM',
    venue: 'The Grand Ballroom, New Delhi',
    gradientFrom: 'from-primary',
    gradientTo: 'to-peach-100',
    description: 'Timeless elegance with traditional Indian wedding vibes',
    details: {
      venue: 'The Grand Ballroom, Connaught Place, New Delhi',
      phone: '+91 XXXXX XXXXX',
      email: 'contact@thegrandballroom.com',
      dresscode: 'Ethnic Wear / Formal',
      accommodations: 'Nearby 5-star hotels available',
    },
  },
  {
    id: 2,
    name: 'Modern Minimalist',
    couple: 'Priya & Arjun',
    date: '22 January 2025',
    time: '6:30 PM',
    venue: 'The Ritz Carlton, Mumbai',
    gradientFrom: 'from-accent',
    gradientTo: 'to-yellow-100',
    description: 'Contemporary design with modern wedding aesthetics',
    details: {
      venue: 'The Ritz Carlton, Bandra, Mumbai',
      phone: '+91 XXXXX XXXXX',
      email: 'events@ritzcarlton.com',
      dresscode: 'Semi-formal / Cocktail',
      accommodations: '5-star hotel rooms reserved',
    },
  },
  {
    id: 3,
    name: 'Traditional Gold',
    couple: 'Divya & Vikram',
    date: '8 February 2025',
    time: '5:00 PM',
    venue: 'Taj Palace, Jaipur',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-orange-200',
    description: 'Regal grandeur with traditional gold theme',
    details: {
      venue: 'Taj Palace Heritage Resort, Jaipur',
      phone: '+91 XXXXX XXXXX',
      email: 'weddings@tajpalace.com',
      dresscode: 'Traditional wear (Gold preferred)',
      accommodations: 'On-site resort stay included',
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function EInvitationsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const selected = invitationTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container px-4 md:px-6">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16 md:mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-4">
                Beautiful E-Invitations
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                Create stunning digital invitations for your wedding guests. Choose from our premium templates and customize to perfection.
              </p>
            </motion.div>

            {/* Invitation Cards Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {invitationTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <Card className="overflow-hidden shadow-premium hover:shadow-premium-lg transition-all h-full flex flex-col">
                    {/* Template Preview */}
                    <div className={`bg-gradient-to-br ${template.gradientFrom} ${template.gradientTo} p-8 md:p-12 text-white relative overflow-hidden min-h-64 flex flex-col justify-center items-center`}>
                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

                      <div className="relative z-10 text-center">
                        <p className="text-sm md:text-base font-body mb-2 opacity-90">Request the honour of your presence at the wedding of</p>
                        <h3 className="text-2xl md:text-3xl font-headline font-bold mb-4">
                          {template.couple}
                        </h3>
                        <p className="text-white/80">{template.date}</p>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <h4 className="text-xl md:text-2xl font-headline font-bold text-foreground mb-2">
                        {template.name}
                      </h4>
                      <p className="text-sm md:text-base text-muted-foreground font-body mb-4">
                        {template.description}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground/70 font-semibold mb-6 flex-1">
                        📍 {template.venue}
                      </p>

                      {/* View/Edit Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <Button
                          className="flex-1"
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          View Invitation
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => alert(`Customization form for ${template.name} coming soon!`)}
                        >
                          Customize
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Full Invitation Preview Modal */}
        <AnimatePresence>
          {selectedTemplate && selected && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTemplate(null)}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Invitation Card Full View */}
                <div className={`bg-gradient-to-br ${selected.gradientFrom} ${selected.gradientTo} p-12 text-white relative overflow-hidden min-h-96 flex flex-col justify-between`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20" />

                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="inline-block mb-4 px-6 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                        <p className="text-sm font-body">Together with their families</p>
                      </div>
                      <h2 className="text-5xl font-headline font-bold mb-6">
                        {selected.couple}
                      </h2>
                      <p className="text-lg font-body mb-2">request the honour of your presence at their</p>
                      <p className="text-2xl font-headline font-semibold">Wedding Celebration</p>
                    </div>

                    <div className="space-y-4 text-center text-white/90 font-body">
                      <div>
                        <p className="text-sm opacity-80">on</p>
                        <p className="text-xl font-semibold">{selected.date}</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80">at</p>
                        <p className="text-lg font-semibold">{selected.time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 border-t border-white/20 pt-6 mt-8">
                    <div className="text-center space-y-2">
                      <p className="font-semibold">{selected.details.venue}</p>
                      <p className="text-sm opacity-90">{selected.details.phone}</p>
                      <p className="text-sm opacity-90">{selected.details.email}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-headline font-bold text-lg mb-2 text-primary">📍 Venue</h3>
                      <p className="text-muted-foreground font-body">{selected.details.venue}</p>
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-lg mb-2 text-primary">👗 Dress Code</h3>
                      <p className="text-muted-foreground font-body">{selected.details.dresscode}</p>
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-lg mb-2 text-primary">🏨 Accommodations</h3>
                      <p className="text-muted-foreground font-body">{selected.details.accommodations}</p>
                    </div>

                    <div>
                      <h3 className="font-headline font-bold text-lg mb-2 text-primary">📞 Contact</h3>
                      <p className="text-muted-foreground font-body">{selected.details.phone}</p>
                      <p className="text-muted-foreground font-body">{selected.details.email}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-8 pt-8 border-t">
                    <Button className="flex-1">
                      RSVP Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Share
                    </Button>
                    <Button variant="ghost" className="flex-1" onClick={() => setSelectedTemplate(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
