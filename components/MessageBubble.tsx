'use client';

import React from 'react';
import { Message } from '@/types/wizard';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isSystem = message.type === 'system';

  return (
    <div
      className={`animate-slide-up p-5 rounded-2xl max-w-2xl shadow-lg ${
        isSystem
          ? 'bg-gradient-to-br from-app-chat-system to-app-panel border border-border-soft/50'
          : 'bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/30 ml-auto'
      }`}
    >
      {isSystem && (
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-xs font-semibold text-accent-primary">AI Assistant</span>
        </div>
      )}
      <p className={`text-base leading-relaxed ${isSystem ? 'text-text-primary' : 'text-text-primary'}`}>
        {message.content}
      </p>
    </div>
  );
}
