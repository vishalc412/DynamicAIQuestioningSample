'use client';

import React, { useState, useRef, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  placeholder = "Ask a question or change persona...",
  disabled = false
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-app-panel/95 to-app-chat-system/95 backdrop-blur-lg border-t border-border-soft/50 shadow-2xl">
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="relative flex items-center gap-3">
          {/* Input field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full px-6 py-4 bg-app-bg/50 border border-border-soft/50 rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {message.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">
                Press Enter ↵
              </div>
            )}
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="group px-6 py-4 gradient-accent rounded-2xl text-white font-semibold shadow-lg hover:shadow-accent-primary/50 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
          >
            <span>Send</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-text-muted">Quick actions:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setMessage('Change my persona')}
              className="px-3 py-1.5 text-xs bg-chip-bg border border-border-soft/50 text-text-secondary rounded-lg hover:bg-chip-active/50 hover:border-accent-primary/30 transition-all duration-200"
            >
              Change Persona
            </button>
            <button
              onClick={() => setMessage('Show me different metrics')}
              className="px-3 py-1.5 text-xs bg-chip-bg border border-border-soft/50 text-text-secondary rounded-lg hover:bg-chip-active/50 hover:border-accent-primary/30 transition-all duration-200"
            >
              Different Metrics
            </button>
            <button
              onClick={() => setMessage('Explain the trends')}
              className="px-3 py-1.5 text-xs bg-chip-bg border border-border-soft/50 text-text-secondary rounded-lg hover:bg-chip-active/50 hover:border-accent-primary/30 transition-all duration-200"
            >
              Explain Trends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
