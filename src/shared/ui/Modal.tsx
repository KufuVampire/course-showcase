import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  ariaLabel?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthStyles = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-2xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  ariaLabel,
  description,
  children,
  maxWidth = 'md',
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  // Dialog open/close & body scroll-lock
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : undefined}
      aria-label={!title ? ariaLabel || 'Диалоговое окно' : undefined}
      aria-describedby={description ? descId : undefined}
      onClick={handleBackdropClick}
      className={cn(
        'w-full max-h-[90vh] bg-surface-raised border border-border rounded-lg shadow-pop p-0 m-auto text-ink outline-none backdrop:bg-scrim/60 backdrop:backdrop-blur-xs flex flex-col overflow-hidden max-sm:h-full max-sm:max-h-screen max-sm:rounded-none max-sm:m-0 max-sm:w-screen',
        maxWidthStyles[maxWidth]
      )}
    >
      {/* Sticky Modal Header */}
      <div className="sticky top-0 z-10 bg-surface-raised border-b border-border/70 p-6 md:p-8 pb-4 flex items-start justify-between gap-4 shrink-0">
        <div className="flex flex-col gap-1 min-w-0 pr-2">
          {title && (
            <h2
              id={titleId}
              className="font-display text-h2 text-ink font-semibold break-words leading-tight"
            >
              {title}
            </h2>
          )}
          {description && (
            <p id={descId} className="text-caption text-ink-muted">
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-md text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors cursor-pointer shrink-0"
          aria-label="Закрыть модальное окно"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content Body */}
      <div className="p-6 md:p-8 pt-4 overflow-y-auto scrollbar-custom flex-1">{children}</div>
    </dialog>
  );
}
