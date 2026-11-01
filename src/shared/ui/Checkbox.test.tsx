// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Checkbox } from './Checkbox';

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe('Checkbox component', () => {
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
  });

  it('отображает лейбл и связывает input c label через id', () => {
    act(() => {
      root.render(<Checkbox label="Согласен с условиями" />);
    });

    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const label = container.querySelector('label') as HTMLLabelElement;

    expect(input).not.toBeNull();
    expect(label).not.toBeNull();
    expect(label.getAttribute('for')).toBe(input.id);
    expect(label.textContent).toContain('Согласен с условиями');
  });

  it('вызывает onChange при клике и переключает состояние', () => {
    const handleChange = vi.fn();

    act(() => {
      root.render(<Checkbox label="Принять оферту" onChange={handleChange} />);
    });

    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(false);

    act(() => {
      input.click();
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.checked).toBe(true);
  });

  it('отображает ошибку и выставляет aria-invalid', () => {
    act(() => {
      root.render(<Checkbox label="Чекбокс" error="Обязательное поле" />);
    });

    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.getAttribute('aria-invalid')).toBe('true');

    const alert = container.querySelector('[role="alert"]');
    expect(alert).not.toBeNull();
    expect(alert?.textContent).toBe('Обязательное поле');
  });
});
