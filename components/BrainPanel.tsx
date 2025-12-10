'use client';

import React from 'react';
import BrainAnimation from './BrainAnimation';

interface BrainPanelProps {
  mode: 'idle' | 'thinking';
}

export default function BrainPanel({ mode }: BrainPanelProps) {
  return (
    <div className="flex-[0_0_40%] h-screen gradient-brain-bg flex items-center justify-center p-8">
      <div className="w-full max-w-md h-96">
        <BrainAnimation mode={mode} />
      </div>
    </div>
  );
}
