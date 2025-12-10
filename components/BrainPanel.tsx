'use client';

import React from 'react';
import BrainAnimation from './BrainAnimation';

interface BrainPanelProps {
  mode: 'idle' | 'thinking';
}

export default function BrainPanel({ mode }: BrainPanelProps) {
  return (
    <div className="flex-[0_0_42%] h-full gradient-brain-bg rounded-3xl border border-border-soft/30 shadow-2xl flex items-center justify-center p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center">
        <BrainAnimation mode={mode} />
      </div>
    </div>
  );
}
