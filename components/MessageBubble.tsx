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
      className={`animate-slide-up p-4 rounded-2xl max-w-2xl ${
        isSystem
          ? 'bg-app-chat-system border border-border-soft'
          : 'bg-app-chat-user border border-accent-primary/20 ml-auto'
      }`}
    >
      <p className={`text-base ${isSystem ? 'text-text-primary' : 'text-text-primary'}`}>
        {message.content}
      </p>
    </div>
  );
}
