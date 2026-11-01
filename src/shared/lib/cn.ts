import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

export const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        'surface',
        'surface-raised',
        'surface-sunken',
        'ink',
        'ink-muted',
        'border',
        'primary',
        'on-primary',
        'accent',
        'on-accent',
        'type-consult',
        'success',
        'warning',
        'danger',
        'info',
        'scrim',
      ],
    },
    classGroups: {
      'font-size': [
        {
          text: ['display', 'h2', 'title', 'price', 'body', 'caption', 'eyebrow'],
        },
      ],
      'text-color': [
        {
          text: [
            'surface',
            'surface-raised',
            'surface-sunken',
            'ink',
            'ink-muted',
            'border',
            'primary',
            'on-primary',
            'accent',
            'on-accent',
            'type-consult',
            'success',
            'warning',
            'danger',
            'info',
            'scrim',
          ],
        },
      ],
      'max-w': ['max-w-page'],
      duration: ['duration-fast', 'duration-base'],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}
