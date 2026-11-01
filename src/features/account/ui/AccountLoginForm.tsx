import type { FormEvent } from 'react';
import { Button, Field } from '@/shared/ui';

export interface AccountLoginFormProps {
  email: string;
  name: string;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
}

export function AccountLoginForm({
  email,
  name,
  onEmailChange,
  onNameChange,
  onSubmit,
  isSubmitting,
}: AccountLoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Field
        label="Email"
        placeholder="name@example.com"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        autoComplete="email"
        hint="Для быстрого теста можно ввести любой email"
      />

      <Field
        label="Ваше имя (необязательно)"
        placeholder="Иван"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        autoComplete="name"
      />

      <Button type="submit" variant="primary" size="md" fullWidth isLoading={isSubmitting}>
        Войти в кабинет
      </Button>

      <p className="text-caption text-ink-muted text-center leading-relaxed">
        Поскольку сейчас работает моковый бэкенд, вход выполняется моментально без пароля.
      </p>
    </form>
  );
}
