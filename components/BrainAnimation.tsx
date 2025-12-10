'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BrainAnimationProps {
  mode: 'idle' | 'thinking';
}

export default function BrainAnimation({ mode }: BrainAnimationProps) {
  const isThinking = mode === 'thinking';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: isThinking ? [1, 1.2, 1] : [1, 1.1, 1],
          opacity: isThinking ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: isThinking ? 1.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border-2"
        style={{
          borderColor: 'rgba(74, 222, 128, 0.3)',
        }}
        animate={{
          scale: isThinking ? [1, 1.15, 1] : [1, 1.08, 1],
          rotate: isThinking ? 360 : 0,
        }}
        transition={{
          scale: {
            duration: isThinking ? 2 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
          rotate: {
            duration: isThinking ? 8 : 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      />

      {/* Neural network nodes container */}
      <div className="relative w-40 h-40">
        {/* Central core */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
            boxShadow: '0 0 30px rgba(74, 222, 128, 0.6)',
          }}
          animate={{
            scale: isThinking ? [1, 1.2, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: isThinking ? 0.8 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Orbiting nodes */}
        {[0, 60, 120, 180, 240, 300].map((angle, index) => {
          const radius = 60;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={index}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: -6,
                marginTop: -6,
                background: index % 2 === 0 ? '#4ade80' : '#38bdf8',
                boxShadow: `0 0 10px ${index % 2 === 0 ? 'rgba(74, 222, 128, 0.8)' : 'rgba(56, 189, 248, 0.8)'}`,
              }}
              animate={{
                x: [x, x * 1.2, x],
                y: [y, y * 1.2, y],
                scale: isThinking ? [1, 1.5, 1] : [1, 1.2, 1],
                opacity: isThinking ? [0.6, 1, 0.6] : [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: isThinking ? 1 : 2,
                delay: index * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Connection lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {[0, 60, 120, 180, 240, 300].map((angle, index) => {
            const radius = 60;
            const x = Math.cos((angle * Math.PI) / 180) * radius + 80;
            const y = Math.sin((angle * Math.PI) / 180) * radius + 80;

            return (
              <motion.line
                key={index}
                x1="80"
                y1="80"
                x2={x}
                y2={y}
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isThinking ? [0, 1, 0] : [0.5, 1, 0.5],
                  opacity: isThinking ? [0.3, 0.7, 0.3] : [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: isThinking ? 1.5 : 3,
                  delay: index * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </svg>

        {/* Particles */}
        {isThinking && (
          <>
            {[...Array(12)].map((_, index) => {
              const angle = (index * 30 * Math.PI) / 180;
              const distance = 30 + Math.random() * 40;

              return (
                <motion.div
                  key={`particle-${index}`}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    background: index % 3 === 0 ? '#4ade80' : '#38bdf8',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: index * 0.1,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Status text */}
      <motion.div
        className="absolute bottom-0 text-center"
        animate={{
          opacity: isThinking ? [0.7, 1, 0.7] : 0.5,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <p className="text-accent-primary text-sm font-medium">
          {isThinking ? 'AI Analyzing...' : 'AI Ready'}
        </p>
      </motion.div>
    </div>
  );
}
