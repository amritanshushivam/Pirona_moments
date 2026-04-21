'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Butterfly {
  id: number;
  delay: number;
  duration: number;
  startX: number;
  startY: number;
}

export function ButterflyEffect() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    const generateButterflies = () => {
      const butterflyArray = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: Math.random() * 3,
        duration: 12 + Math.random() * 8,
        startX: Math.random() * 100,
        startY: Math.random() * 40,
      }));
      setButterflies(butterflyArray);
    };

    generateButterflies();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {butterflies.map((butterfly) => (
        <motion.div
          key={butterfly.id}
          className="absolute"
          initial={{
            x: `${butterfly.startX}%`,
            y: `${butterfly.startY}%`,
            opacity: 0,
          }}
          animate={{
            x: [
              `${butterfly.startX}%`,
              `${butterfly.startX + 50}%`,
              `${butterfly.startX - 50}%`,
              `${butterfly.startX + 30}%`,
              `${butterfly.startX}%`,
            ],
            y: [
              `${butterfly.startY}%`,
              `${butterfly.startY - 100}%`,
              `${butterfly.startY - 150}%`,
              `${butterfly.startY - 200}%`,
              `${butterfly.startY - 250}%`,
            ],
            opacity: [0, 0.8, 0.9, 0.85, 0],
          }}
          transition={{
            duration: butterfly.duration,
            delay: butterfly.delay,
            ease: 'easeInOut',
            times: [0, 0.1, 0.5, 0.9, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {/* Butterfly SVG */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl filter brightness-110"
          >
            <defs>
              <linearGradient id={`gradient-${butterfly.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
            </defs>
            {/* Left Wings */}
            <motion.path
              d="M 10 20 Q 5 10 8 5 Q 12 8 12 15 Q 10 18 10 20"
              fill={`url(#gradient-${butterfly.id})`}
              animate={{
                d: [
                  'M 10 20 Q 5 10 8 5 Q 12 8 12 15 Q 10 18 10 20',
                  'M 10 20 Q 3 12 6 6 Q 13 10 13 18 Q 10 20 10 20',
                  'M 10 20 Q 5 10 8 5 Q 12 8 12 15 Q 10 18 10 20',
                ],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            <motion.path
              d="M 10 20 Q 5 30 8 35 Q 12 32 12 25 Q 10 22 10 20"
              fill={`url(#gradient-${butterfly.id})`}
              animate={{
                d: [
                  'M 10 20 Q 5 30 8 35 Q 12 32 12 25 Q 10 22 10 20',
                  'M 10 20 Q 3 28 6 34 Q 13 30 13 22 Q 10 20 10 20',
                  'M 10 20 Q 5 30 8 35 Q 12 32 12 25 Q 10 22 10 20',
                ],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            {/* Right Wings */}
            <motion.path
              d="M 30 20 Q 35 10 32 5 Q 28 8 28 15 Q 30 18 30 20"
              fill={`url(#gradient-${butterfly.id})`}
              animate={{
                d: [
                  'M 30 20 Q 35 10 32 5 Q 28 8 28 15 Q 30 18 30 20',
                  'M 30 20 Q 37 12 34 6 Q 27 10 27 18 Q 30 20 30 20',
                  'M 30 20 Q 35 10 32 5 Q 28 8 28 15 Q 30 18 30 20',
                ],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            <motion.path
              d="M 30 20 Q 35 30 32 35 Q 28 32 28 25 Q 30 22 30 20"
              fill={`url(#gradient-${butterfly.id})`}
              animate={{
                d: [
                  'M 30 20 Q 35 30 32 35 Q 28 32 28 25 Q 30 22 30 20',
                  'M 30 20 Q 37 28 34 34 Q 27 30 27 22 Q 30 20 30 20',
                  'M 30 20 Q 35 30 32 35 Q 28 32 28 25 Q 30 22 30 20',
                ],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
            {/* Body */}
            <circle cx="20" cy="20" r="3" fill="#be185d" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
