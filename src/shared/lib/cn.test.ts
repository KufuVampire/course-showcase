import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn (extendTailwindMerge)', () => {
  it('не съедает text-caption при наличии text-ink-muted', () => {
    expect(cn('text-caption', 'text-ink-muted')).toBe('text-caption text-ink-muted');
  });

  it('корректно переопределяет кастомные размеры шрифта', () => {
    expect(cn('text-caption', 'text-body')).toBe('text-body');
  });

  it('корректно переопределяет кастомные цвета текста', () => {
    expect(cn('text-ink', 'text-ink-muted')).toBe('text-ink-muted');
  });

  it('корректно мержит max-w-page с другим max-w', () => {
    expect(cn('max-w-page', 'max-w-md')).toBe('max-w-md');
  });

  it('корректно мержит duration-fast и duration-base', () => {
    expect(cn('duration-fast', 'duration-base')).toBe('duration-base');
  });

  it('корректно мержит фоновые цвета семантических токенов', () => {
    expect(cn('bg-surface', 'bg-surface-raised')).toBe('bg-surface-raised');
  });
});
