'use client';

import React, { useState } from 'react';

interface Choice {
  id: string;
  label: string;
  icon?: string;
}

interface ChoiceChipGroupProps {
  choices: Choice[];
  onSelect: (choiceId: string) => void;
  multiSelect?: boolean;
  className?: string;
}

export default function ChoiceChipGroup({
  choices,
  onSelect,
  multiSelect = false,
  className = ''
}: ChoiceChipGroupProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelect = (id: string) => {
    if (multiSelect) {
      const newSelected = new Set(selectedIds);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      setSelectedIds(newSelected);
    } else {
      setSelectedIds(new Set([id]));
    }
    onSelect(id);
  };

  return (
    <div className={`flex flex-wrap gap-3 animate-slide-up ${className}`}>
      {choices.map((choice) => {
        const isSelected = selectedIds.has(choice.id);
        return (
          <button
            key={choice.id}
            onClick={() => handleSelect(choice.id)}
            className={`
              group relative px-6 py-3.5 rounded-2xl text-sm font-semibold
              transition-all duration-200 ease-out
              hover:scale-105 hover:shadow-lg
              ${
                isSelected
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/30'
                  : 'bg-gradient-to-br from-chip-bg to-app-chat-system border border-border-soft/50 text-text-primary hover:border-accent-primary/40 hover:shadow-accent-primary/20'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {choice.icon && <span className="text-lg">{choice.icon}</span>}
              <span>{choice.label}</span>
              {isSelected && <span className="ml-1">✓</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
