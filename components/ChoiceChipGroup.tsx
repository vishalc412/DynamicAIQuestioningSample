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
              px-5 py-3 rounded-xl text-sm font-medium
              transition-all duration-150 ease-out
              hover:scale-102 hover:border-accent-primary/40
              ${
                isSelected
                  ? 'bg-chip-active border-2 border-accent-primary text-accent-primary'
                  : 'bg-chip-bg border border-border-soft text-text-primary hover:bg-chip-active/50'
              }
            `}
          >
            {choice.icon && <span className="mr-2">{choice.icon}</span>}
            {choice.label}
            {isSelected && <span className="ml-2">✓</span>}
          </button>
        );
      })}
    </div>
  );
}
