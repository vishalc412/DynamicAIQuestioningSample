'use client';

import React from 'react';

interface BrainAnimationProps {
  mode: 'idle' | 'thinking';
}

export default function BrainAnimation({ mode }: BrainAnimationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl ${
          mode === 'thinking' ? 'animate-pulse-glow-thinking' : 'animate-pulse-glow'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Brain SVG */}
      <div className="relative z-10">
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={mode === 'thinking' ? 'animate-pulse' : ''}
        >
          {/* Brain outline with neural connections */}
          <g opacity="0.9">
            {/* Left hemisphere */}
            <path
              d="M80 60C60 60 45 75 45 95C45 105 48 114 54 121C48 128 45 137 45 147C45 167 60 182 80 182C85 182 90 181 94 179"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Right hemisphere */}
            <path
              d="M160 60C180 60 195 75 195 95C195 105 192 114 186 121C192 128 195 137 195 147C195 167 180 182 160 182C155 182 150 181 146 179"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Neural connections */}
            <g opacity={mode === 'thinking' ? '0.8' : '0.4'}>
              <circle cx="70" cy="100" r="4" fill="#4ade80" className={mode === 'thinking' ? 'animate-pulse' : ''} />
              <circle cx="170" cy="100" r="4" fill="#4ade80" className={mode === 'thinking' ? 'animate-pulse' : ''} style={{ animationDelay: '200ms' }} />
              <circle cx="120" cy="80" r="4" fill="#38bdf8" className={mode === 'thinking' ? 'animate-pulse' : ''} style={{ animationDelay: '400ms' }} />
              <circle cx="90" cy="140" r="4" fill="#4ade80" className={mode === 'thinking' ? 'animate-pulse' : ''} style={{ animationDelay: '100ms' }} />
              <circle cx="150" cy="140" r="4" fill="#38bdf8" className={mode === 'thinking' ? 'animate-pulse' : ''} style={{ animationDelay: '300ms' }} />

              {/* Connection lines */}
              <line x1="70" y1="100" x2="120" y2="80" stroke="#4ade80" strokeWidth="1.5" opacity="0.3" />
              <line x1="170" y1="100" x2="120" y2="80" stroke="#38bdf8" strokeWidth="1.5" opacity="0.3" />
              <line x1="90" y1="140" x2="150" y2="140" stroke="#4ade80" strokeWidth="1.5" opacity="0.3" />
            </g>

            {/* Center connection */}
            <path
              d="M94 179C100 185 110 189 120 189C130 189 140 185 146 179"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="45" y1="60" x2="195" y2="182">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="gradient2" x1="94" y1="179" x2="146" y2="189">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
