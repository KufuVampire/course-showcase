import { BookOpen } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface LogoProps {
  showSubtitle?: boolean;
  className?: string;
  asLink?: boolean;
}

export function Logo({ showSubtitle = false, className, asLink = true }: LogoProps) {
  const content = (
    <>
      <div className="w-8 h-8 rounded-md bg-primary text-[#14181f] flex items-center justify-center font-display font-bold text-base shadow-xs shrink-0 group-hover:opacity-90 transition-opacity">
        <BookOpen className="w-4 h-4 text-[#14181f]" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-display font-bold text-ink tracking-tight text-base sm:text-lg leading-none truncate">
          Практикум.PRO
        </span>
        {showSubtitle && (
          <span className="text-caption text-ink-muted leading-tight truncate hidden xs:inline mt-0.5">
            Образовательные программы
          </span>
        )}
      </div>
    </>
  );

  if (asLink) {
    return (
      <a href="/" className={cn('flex items-center gap-2 group min-w-0 shrink', className)}>
        {content}
      </a>
    );
  }

  return (
    <div className={cn('flex items-center gap-2 group min-w-0 shrink', className)}>
      {content}
    </div>
  );
}
