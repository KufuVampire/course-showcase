import { useState, useRef, useEffect, useId, type KeyboardEvent } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function Select({ options, value, onChange, ariaLabel, className = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((o) => o.value === value)
    )
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const typeaheadRef = useRef({ buffer: '', timeout: 0 });

  const id = useId();
  const listboxId = `${id}-listbox`;

  const selectedOption = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    const idx = options.findIndex((o) => o.value === value);
    if (idx !== -1) setFocusedIndex(idx);
  }, [value, options]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Scroll active option into view
  useEffect(() => {
    if (isOpen && listboxRef.current) {
      const activeEl = listboxRef.current.children[focusedIndex] as HTMLElement | undefined;
      activeEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, focusedIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape') {
      if (isOpen) {
        e.stopPropagation();
        e.preventDefault();
        setIsOpen(false);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      }
      return;
    }

    if (e.key === 'Home') {
      e.preventDefault();
      if (isOpen) setFocusedIndex(0);
      return;
    }

    if (e.key === 'End') {
      e.preventDefault();
      if (isOpen) setFocusedIndex(options.length - 1);
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        const opt = options[focusedIndex];
        if (opt) {
          onChange(opt.value);
          setIsOpen(false);
        }
      } else {
        setIsOpen(true);
      }
      return;
    }

    // Type-ahead
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const char = e.key.toLowerCase();
      window.clearTimeout(typeaheadRef.current.timeout);
      typeaheadRef.current.buffer += char;
      typeaheadRef.current.timeout = window.setTimeout(() => {
        typeaheadRef.current.buffer = '';
      }, 500);

      const searchStr = typeaheadRef.current.buffer;
      const matchIdx = options.findIndex((o) => o.label.toLowerCase().startsWith(searchStr));
      if (matchIdx !== -1) {
        setFocusedIndex(matchIdx);
        if (!isOpen) {
          onChange(options[matchIdx]!.value);
        }
      }
    }
  };

  const handleSelectOption = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && focusedIndex >= 0 && options[focusedIndex]
            ? `${listboxId}-option-${options[focusedIndex]!.value}`
            : undefined
        }
        aria-label={ariaLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full h-11 bg-surface-raised border border-border rounded-md text-caption py-2.5 px-3.5 text-ink flex items-center justify-between gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary cursor-pointer select-none transition-colors text-left',
          isOpen ? 'border-primary ring-1 ring-primary' : ''
        )}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-ink-muted shrink-0 transition-transform duration-fast',
            isOpen ? 'rotate-180 text-primary' : ''
          )}
        />
      </button>

      {isOpen && (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-label={ariaLabel}
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface-raised p-1 text-caption shadow-pop border border-border outline-none scrollbar-custom select-dropdown-enter"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isFocused = idx === focusedIndex;

            return (
              <li
                key={opt.value}
                id={`${listboxId}-option-${opt.value}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectOption(opt.value)}
                onMouseEnter={() => setFocusedIndex(idx)}
                className={cn(
                  'relative flex items-center justify-between py-2 px-3 rounded-sm cursor-pointer select-none transition-colors',
                  isFocused ? 'bg-surface-sunken text-ink' : 'text-ink-muted hover:text-ink',
                  isSelected ? 'font-semibold text-primary' : ''
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
