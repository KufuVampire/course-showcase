import { useEffect, type RefObject } from 'react';

let lockCount = 0;
let originalHtmlOverflow = '';
let originalBodyOverflow = '';
let originalBodyPaddingRight = '';

export function lockScroll() {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    originalHtmlOverflow = document.documentElement.style.overflow;
    originalBodyOverflow = document.body.style.overflow;
    originalBodyPaddingRight = document.body.style.paddingRight;

    if (typeof window !== 'undefined') {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }
  lockCount++;
}

export function unlockScroll() {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.style.overflow = originalHtmlOverflow;
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.paddingRight = originalBodyPaddingRight;
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
}

export function getScrollLockCount() {
  return lockCount;
}

export function resetScrollLockForTest() {
  lockCount = 0;
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
}

export function useScrollLock(isOpen: boolean, dialogRef: RefObject<HTMLDialogElement | null>) {
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    lockScroll();

    if (typeof window === 'undefined') {
      return () => {
        unlockScroll();
      };
    }

    const handleWindowWheel = (e: WheelEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const scrollable = dialog.querySelector<HTMLElement>('[data-modal-body="true"]');
      if (!scrollable || !scrollable.contains(e.target as Node)) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollable;
      const isAtTop = scrollTop <= 0 && e.deltaY < 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (isAtTop || isAtBottom) {
        e.preventDefault();
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const scrollable = dialog.querySelector<HTMLElement>('[data-modal-body="true"]');
      if (!scrollable || !scrollable.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      unlockScroll();
    };
  }, [isOpen, dialogRef]);
}
