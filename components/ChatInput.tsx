'use client';

import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';

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
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check if speech recognition is supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          setMessage(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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

  const toggleVoiceInput = () => {
    if (!isSupported || disabled) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setMessage('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-app-panel/98 to-app-chat-system/98 backdrop-blur-lg border-t border-border-soft/50 shadow-2xl">
      <div className="max-w-[1600px] mx-auto px-6 py-3">
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
              className="w-full px-5 py-3 bg-app-bg/50 border border-border-soft/50 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            />
            {message.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">
                Press Enter ↵
              </div>
            )}
          </div>

          {/* Voice input button */}
          {isSupported && (
            <button
              onClick={toggleVoiceInput}
              disabled={disabled}
              className={`group px-4 py-3 rounded-xl font-semibold text-sm shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${isListening
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-app-bg/50 border border-border-soft/50 text-text-primary hover:border-accent-primary/50 hover:bg-accent-primary/10'
                }`}
              title={isListening ? 'Stop recording' : 'Start voice input'}
            >
              {isListening ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  <span className="text-xs">Recording...</span>
                </>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
            </button>
          )}

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="group px-5 py-3 gradient-accent rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-accent-primary/50 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
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
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-text-muted">Quick:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setMessage('Change my persona')}
              className="px-2.5 py-1 text-xs bg-chip-bg border border-border-soft/50 text-text-secondary rounded-lg hover:bg-chip-active/50 hover:border-accent-primary/30 transition-all duration-200"
            >
              Change Persona
            </button>
            <button
              onClick={() => setMessage('Show me different metrics')}
              className="px-2.5 py-1 text-xs bg-chip-bg border border-border-soft/50 text-text-secondary rounded-lg hover:bg-chip-active/50 hover:border-accent-primary/30 transition-all duration-200"
            >
              Different Metrics
            </button>
            <button
              onClick={() => setMessage('Explain the trends')}
              className="px-2.5 py-1 text-xs bg-chip-bg border border-border-soft/50 text-text-secondary rounded-lg hover:bg-chip-active/50 hover:border-accent-primary/30 transition-all duration-200"
            >
              Explain Trends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
