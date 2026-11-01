import { User } from 'lucide-react';
import type { Instructor } from '@/shared/api';

export interface ProductDetailsInstructorProps {
  instructor: Instructor;
}

export function ProductDetailsInstructor({ instructor }: ProductDetailsInstructorProps) {
  return (
    <div className="flex items-start gap-4 p-4 border border-border rounded-md bg-surface-raised">
      <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center text-ink-muted shrink-0">
        <User className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-caption text-primary font-semibold">Автор & Ведущий</span>
        <h4 className="font-display font-bold text-ink text-base">{instructor.name}</h4>
        <span className="text-caption text-ink-muted">{instructor.role}</span>
        {instructor.bio && (
          <p className="text-caption text-ink-muted mt-1 leading-relaxed">
            {instructor.bio}
          </p>
        )}
      </div>
    </div>
  );
}
