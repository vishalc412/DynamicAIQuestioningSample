'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HumanAnalystPanelProps {
  mode: 'idle' | 'thinking';
}

export default function HumanAnalystPanel({ mode }: HumanAnalystPanelProps) {
  return (
    <div className="flex-[0_0_32%] h-full bg-gradient-to-br from-[#0a0f1e] via-[#151824] to-[#0a0f1e] rounded-3xl border border-border-soft/30 shadow-2xl flex flex-col justify-between p-8 relative overflow-hidden">
      {/* Background FMCG Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-accent-primary blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-accent-secondary blur-3xl"></div>
      </div>

      {/* Analyst Profile */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          {/* Professional Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary p-0.5 shadow-lg">
              <div className="w-full h-full rounded-2xl bg-app-panel flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            {mode === 'thinking' && (
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-primary rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-text-primary">Saurabh Sharma</h3>
            <p className="text-sm text-text-muted">NAM Sales Analyst</p>
          </div>
        </div>

        {/* Status */}
        <div className="px-4 py-3 bg-app-bg/50 backdrop-blur-sm rounded-xl border border-border-soft/30">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${mode === 'thinking' ? 'bg-accent-primary animate-pulse' : 'bg-accent-secondary'}`}></div>
            <span className="text-sm text-text-secondary">
              {mode === 'thinking' ? 'Analyzing data...' : 'Ready to help'}
            </span>
          </div>
        </div>
      </div>

      {/* FMCG Products Showcase */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[280px]">
          {/* Product Stack Animation */}
          <motion.div
            className="relative"
            animate={mode === 'thinking' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Pepsi Can */}
            <motion.div
              className="absolute top-0 left-8 w-16 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-xl border border-blue-400/30"
              animate={mode === 'thinking' ? { y: [0, -10, 0], rotate: [-2, 2, -2] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
              </div>
              {/* Shine effect */}
              <div className="absolute top-2 right-2 w-4 h-8 bg-white/30 rounded-full blur-sm transform rotate-45"></div>
            </motion.div>

            {/* Lays Bag */}
            <motion.div
              className="absolute top-8 right-8 w-20 h-28 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-xl border border-yellow-300/30"
              animate={mode === 'thinking' ? { y: [0, -8, 0], rotate: [2, -2, 2] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-1">
                    <span className="text-yellow-900 text-xs font-bold">L</span>
                  </div>
                  <div className="text-[8px] text-yellow-900 font-bold">LAYS</div>
                </div>
              </div>
              {/* Crinkle effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-2 right-2 h-1 bg-white/50 rounded-full"></div>
                <div className="absolute top-8 left-2 right-2 h-1 bg-white/50 rounded-full"></div>
                <div className="absolute top-12 left-2 right-2 h-1 bg-white/50 rounded-full"></div>
              </div>
            </motion.div>

            {/* Doritos Bag */}
            <motion.div
              className="absolute bottom-0 left-12 w-18 h-26 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-2xl shadow-xl border border-red-400/30 transform -rotate-6"
              animate={mode === 'thinking' ? { y: [0, -6, 0], rotate: [-6, -10, -6] } : {}}
              transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">D</span>
                </div>
              </div>
            </motion.div>

            {/* Center glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-primary/10 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Floating particles when thinking */}
          {mode === 'thinking' && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-accent-primary/50 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Insights Summary */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2 text-text-muted text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Real-time FMCG Analytics</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="px-3 py-2 bg-app-bg/30 backdrop-blur-sm rounded-lg border border-accent-primary/20">
            <div className="text-accent-primary text-lg font-bold">North</div>
            <div className="text-text-muted text-xs">America</div>
          </div>
          <div className="px-3 py-2 bg-app-bg/30 backdrop-blur-sm rounded-lg border border-accent-secondary/20">
            <div className="text-accent-secondary text-lg font-bold">Sales</div>
            <div className="text-text-muted text-xs">Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );
}
