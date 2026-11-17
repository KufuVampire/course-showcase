// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Modal } from './Modal';
import { resetScrollLockForTest } from '@/shared/lib/useScrollLock';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('Modal', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    resetScrollLockForTest();
  });

  it('вызывает onClose, если браузер закрыл диалог без события cancel', () => {
    const onClose = vi.fn();
    act(() => {
      root.render(
        <Modal isOpen onClose={onClose} title="Вход">
          <p>Содержимое</p>
        </Modal>
      );
    });

    const dialog = container.querySelector('dialog');
    expect(dialog).not.toBeNull();

    act(() => {
      dialog?.dispatchEvent(new Event('close'));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('вызывает onClose по Escape (событие cancel) и не даёт браузеру закрыть диалог самому', () => {
    const onClose = vi.fn();
    act(() => {
      root.render(
        <Modal isOpen onClose={onClose} title="Вход">
          <p>Содержимое</p>
        </Modal>
      );
    });

    const cancel = new Event('cancel', { cancelable: true });
    act(() => {
      container.querySelector('dialog')?.dispatchEvent(cancel);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(cancel.defaultPrevented).toBe(true);
  });

  it('показывается только в открытом состоянии', () => {
    act(() => {
      root.render(
        <Modal isOpen onClose={() => {}} title="Вход">
          <p>Содержимое</p>
        </Modal>
      );
    });

    const className = container.querySelector('dialog')?.className ?? '';
    expect(className).toContain('open:flex');
    expect(className.split(' ')).not.toContain('flex');
  });
});
