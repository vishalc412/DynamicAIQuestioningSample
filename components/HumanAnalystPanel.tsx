'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardState } from '@/types/wizard';

interface HumanAnalystPanelProps {
  mode: 'idle' | 'thinking';
  state: WizardState;
}

export default function HumanAnalystPanel({ mode, state }: HumanAnalystPanelProps) {
  const [currentActivity, setCurrentActivity] = useState('');
  const [progress, setProgress] = useState(0);
  const [ping, setPing] = useState(12);

  // Get context-aware activity message
  useEffect(() => {
    if (mode === 'thinking') {
      if (state.deepDiveDimension) {
        setCurrentActivity(`Let me deep dive into ${state.deepDiveDimension} for you...`);
      } else if (state.kpiType) {
        const activities = [
          `Crunching ${state.kpiType} numbers for you...`,
          `Analyzing ${state.region} market trends...`,
          `Finding insights in your data...`,
          `Preparing recommendations...`,
        ];
        let currentIndex = 0;
        setCurrentActivity(activities[0]);

        const interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % activities.length;
          setCurrentActivity(activities[currentIndex]);
        }, 2000);

        return () => clearInterval(interval);
      } else {
        setCurrentActivity('Getting everything ready for you...');
      }
    } else {
      setCurrentActivity(`Ready to help you, ${state.name}!`);
    }
  }, [mode, state.kpiType, state.region, state.deepDiveDimension, state.name]);

  // Simulate progress bar
  useEffect(() => {
    if (mode === 'thinking') {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 15;
        });
      }, 400);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [mode]);

  // Simulate ping
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 20) + 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Determine which product to highlight based on KPI
  const getHighlightedProduct = () => {
    if (!state.kpiType) return null;
    if (state.kpiType.toLowerCase().includes('beverage') || state.kpiType.toLowerCase().includes('drink')) {
      return 'pepsi';
    }
    if (state.kpiType.toLowerCase().includes('snack') || state.kpiType.toLowerCase().includes('chip')) {
      return 'lays';
    }
    return 'all';
  };

  const highlightedProduct = getHighlightedProduct();

  return (
    <div className="flex-[0_0_32%] h-full bg-gradient-to-br from-[#0a0f1e] via-[#151824] to-[#0a0f1e] rounded-3xl border border-border-soft/30 shadow-2xl flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-accent-primary blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-accent-secondary blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Analyst Profile */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          {/* Professional Avatar with Animation */}
          <div className="relative">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary p-0.5 shadow-lg"
              animate={mode === 'thinking' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-2xl bg-app-panel flex items-center justify-center">
                <svg className="w-7 h-7 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </motion.div>
            {/* Active Indicator */}
            <motion.div
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-app-panel ${
                mode === 'thinking' ? 'bg-accent-primary' : 'bg-accent-secondary'
              }`}
              animate={{ scale: mode === 'thinking' ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-text-primary">Smarty</h3>
            <p className="text-xs text-text-muted">Your AI Sales Assistant</p>
          </div>

          {/* Ping Indicator */}
          <div className="px-2 py-1 bg-app-bg/50 backdrop-blur-sm rounded-lg border border-border-soft/30">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary animate-pulse"></div>
              <span className="text-[10px] text-text-muted">{ping}ms</span>
            </div>
          </div>
        </div>

        {/* Current Activity with Typing Effect */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentActivity}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-3 py-2.5 bg-app-bg/50 backdrop-blur-sm rounded-xl border border-border-soft/30 mb-3"
          >
            <div className="flex items-start gap-2">
              <motion.div
                animate={mode === 'thinking' ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="w-4 h-4 text-accent-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
              <div className="flex-1">
                <p className="text-xs text-text-secondary leading-relaxed">{currentActivity}</p>
                {mode === 'thinking' && (
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-accent-primary rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        {mode === 'thinking' && progress > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-3"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-text-muted">Processing</span>
              <span className="text-[10px] text-accent-primary font-semibold">{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <div className="h-1.5 bg-app-bg/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Context Tags */}
        {(state.region || state.kpiType) && (
          <div className="flex flex-wrap gap-2">
            {state.region && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 bg-accent-primary/10 border border-accent-primary/30 rounded-lg text-[10px] text-accent-primary font-semibold flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {state.region}
              </motion.div>
            )}
            {state.kpiType && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="px-2 py-1 bg-accent-secondary/10 border border-accent-secondary/30 rounded-lg text-[10px] text-accent-secondary font-semibold flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {state.kpiType.slice(0, 12)}...
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* FMCG Products Showcase - Context Aware */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-6">
        <div className="relative w-full max-w-[240px] h-[200px]">
          {/* Pepsi Can */}
          <motion.div
            className={`absolute top-0 left-6 w-14 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-xl border ${
              highlightedProduct === 'pepsi' ? 'border-blue-300' : 'border-blue-400/30'
            }`}
            animate={
              mode === 'thinking' || highlightedProduct === 'pepsi'
                ? { y: [0, -12, 0], rotate: [-2, 3, -2], scale: highlightedProduct === 'pepsi' ? [1, 1.1, 1] : [1, 1.05, 1] }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">P</span>
              </div>
            </div>
            <div className="absolute top-2 right-1.5 w-3 h-6 bg-white/30 rounded-full blur-sm transform rotate-45"></div>
            {highlightedProduct === 'pepsi' && (
              <motion.div
                className="absolute inset-0 bg-blue-400/30 rounded-lg"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Lays Bag */}
          <motion.div
            className={`absolute top-6 right-6 w-18 h-24 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-xl border ${
              highlightedProduct === 'lays' ? 'border-yellow-200' : 'border-yellow-300/30'
            }`}
            animate={
              mode === 'thinking' || highlightedProduct === 'lays'
                ? { y: [0, -10, 0], rotate: [2, -3, 2], scale: highlightedProduct === 'lays' ? [1, 1.1, 1] : [1, 1.05, 1] }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-9 h-9 mx-auto rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center mb-0.5">
                  <span className="text-yellow-900 text-[10px] font-bold">L</span>
                </div>
                <div className="text-[7px] text-yellow-900 font-bold">LAYS</div>
              </div>
            </div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-3 left-2 right-2 h-0.5 bg-white/50 rounded-full"></div>
              <div className="absolute top-6 left-2 right-2 h-0.5 bg-white/50 rounded-full"></div>
              <div className="absolute top-9 left-2 right-2 h-0.5 bg-white/50 rounded-full"></div>
            </div>
            {highlightedProduct === 'lays' && (
              <motion.div
                className="absolute inset-0 bg-yellow-300/30 rounded-2xl"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.div>

          {/* Doritos Bag */}
          <motion.div
            className="absolute bottom-0 left-10 w-16 h-22 bg-gradient-to-br from-orange-500 via-red-500 to-red-600 rounded-2xl shadow-xl border border-red-400/30 transform -rotate-6"
            animate={
              mode === 'thinking'
                ? { y: [0, -8, 0], rotate: [-6, -12, -6] }
                : { y: 0, rotate: -6 }
            }
            transition={{ duration: 3.2, repeat: Infinity, delay: 0.8 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">D</span>
              </div>
            </div>
          </motion.div>

          {/* Center glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-accent-primary/10 rounded-full blur-2xl"
            animate={{ scale: mode === 'thinking' ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Floating particles */}
          {mode === 'thinking' && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-accent-primary/50 rounded-full"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${25 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Live Stats */}
      <div className="relative z-10 space-y-2.5">
        <div className="flex items-center gap-2 text-text-muted text-[10px]">
          <motion.div
            animate={{ rotate: mode === 'thinking' ? 360 : 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <span>Live FMCG Analytics Engine</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-2 py-1.5 bg-app-bg/30 backdrop-blur-sm rounded-lg border border-accent-primary/20"
          >
            <div className="text-accent-primary text-sm font-bold">
              {mode === 'thinking' ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ...
                </motion.span>
              ) : (
                '98%'
              )}
            </div>
            <div className="text-text-muted text-[9px]">Accuracy</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-2 py-1.5 bg-app-bg/30 backdrop-blur-sm rounded-lg border border-accent-secondary/20"
          >
            <div className="text-accent-secondary text-sm font-bold">{ping}ms</div>
            <div className="text-text-muted text-[9px]">Latency</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-2 py-1.5 bg-app-bg/30 backdrop-blur-sm rounded-lg border border-purple-400/20"
          >
            <div className="text-purple-400 text-sm font-bold flex items-center gap-1">
              <motion.div
                className="w-1 h-1 bg-purple-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              AI
            </div>
            <div className="text-text-muted text-[9px]">Assistant</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
