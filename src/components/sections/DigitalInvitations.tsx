'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const invitationTemplates = [
  {
    id: 1,
    name: 'Classic Elegance',
    couple: 'Isha & Vikram',
    date: '15 Dec, 2024',
    color: 'from-primary to-peach-100',
  },
  {
    id: 2,
    name: 'Modern Minimalist',
    couple: 'Priya & Arjun',
    date: '22 Jan, 2025',
    color: 'from-accent to-yellow-100',
  },
  {
    id: 3,
    name: 'Traditional Gold',
    couple: 'Divya & Vikram',
    date: '08 Feb, 2025',
    color: 'from-yellow-400 to-orange-200',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function DigitalInvitations() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-4">
            Digital Invitations
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
            Design stunning wedding invitations in minutes with our AI-powered templates
          </p>
        </motion.div>

        {/* Invitation Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {invitationTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              variants={itemVariants}
              whileHover={{ y: -8, rotateY: 5 }}
              className="group"
            >
              <Card className="h-full overflow-hidden shadow-premium hover:shadow-premium-lg transition-all perspective">
                {/* Card Preview */}
                <motion.div
                  className={`h-80 bg-gradient-to-br ${template.color} relative overflow-hidden p-8 flex flex-col justify-between`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

                  {/* Content */}
                  <div className="relative z-10">
                    <p className="text-sm text-white/70 font-body">You are cordially invited</p>
                  </div>

                  <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-headline font-bold text-white mb-2">
                      {template.couple}
                    </h3>
                    <p className="text-white/90 font-body text-lg font-medium">
                      {template.date}
                    </p>
                  </div>

                  <div className="relative z-10">
                    <p className="text-sm text-white/70 font-body text-center">
                      Celebrating love, tradition & joy
                    </p>
                  </div>
                </motion.div>

                {/* Card Footer */}
                <div className="p-6 text-center">
                  <h4 className="font-headline font-semibold text-foreground mb-2">
                    {template.name}
                  </h4>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full font-body font-semibold cursor-pointer"
                      onClick={() => window.location.href = '/e-invitations'}
                    >
                      View
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="font-body font-semibold px-8 bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => window.location.href = '/e-invitations'}
          >
            Create Your Invitation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
