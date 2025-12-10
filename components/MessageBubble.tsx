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
          <span className="text-accent-primary">🤖</span>
          <span className="text-xs font-semibold text-accent-primary">AI Assistant</span>
        </div>
      )}
      <p className={`text-base leading-relaxed ${isSystem ? 'text-text-primary' : 'text-text-primary'}`}>
        {message.content}
      </p>
    </div>
  );
}
