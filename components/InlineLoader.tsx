'use client';

import React from 'react';

interface InlineLoaderProps {
  message?: string;
}

export default function InlineLoader({ message = 'AI is analyzing your North America sales' }: InlineLoaderProps) {
  return (
    <div className="flex items-center gap-2 text-text-secondary text-sm py-2">
      <span>{message}</span>
      <div className="flex gap-1">
        <span className="animate-bounce-dots" style={{ animationDelay: '0ms' }}>.</span>
        <span className="animate-bounce-dots" style={{ animationDelay: '150ms' }}>.</span>
        <span className="animate-bounce-dots" style={{ animationDelay: '300ms' }}>.</span>
      </div>
    </div>
  );
}
