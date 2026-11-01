import { useState } from 'react';
import { ArrowRight, CheckCircle2, Compass, ListOrdered } from 'lucide-react';
import { Button } from '@/shared/ui';

type QuizGoal = 'architecture' | 'designSystem' | 'career';

interface TrackQuizResult {
  title: string;
  duration: string;
  format: string;
  artifact: string;
  catalogHash: string;
}

const quizRecommendations: Record<QuizGoal, TrackQuizResult> = {
  architecture: {
    title: 'Архитектура React & TypeScript',
    duration: '4 недели · 40 часов',
    format: 'Практикум + 4 личных ревью Pull Request',
    artifact: 'Production-ready архитектура приложения на FSD 2.1 с TanStack Query',
    catalogHash: '/#catalog',
  },
  designSystem: {
    title: 'Дизайн-системы и Tailwind v4',
    duration: '1 день · 8 часов',
    format: 'Интенсивный воркшоп + разбор токенов',
    artifact: 'Готовая семантическая система дизайн-токенов (@theme) без arbitrary-классов',
    catalogHash: '/#catalog',
  },
  career: {
    title: 'Консультация: Разбор резюме и пет-проекта',
    duration: '1.5 часа созвона + неделя асинхронного ревью',
    format: 'Индивидуальный аудит 1-на-1 со Staff-инженером',
    artifact: 'План исправления архитектурных уязвимостей и стратегия прохождения техсобеседований',
    catalogHash: '/#catalog',
  },
};

const processSteps = [
  {
    step: '01',
    title: 'Выбор программы и трека',
    desc: 'Определите цель через квиз или каталог. Выберите глубокий практикум, воркшоп или консультацию.',
  },
  {
    step: '02',
    title: 'Оформление и мгновенный доступ',
    desc: 'Оплата картой, СБП или рассрочка 0%. Кабинет и репозитории открываются сразу.',
  },
  {
    step: '03',
    title: 'Решение боевых задач',
    desc: 'Пишете код в личном форке репозитория, проектируете слои и отправляете PR на проверку.',
  },
  {
    step: '04',
    title: 'Ревью от Staff и защита',
    desc: 'Получаете построчный разбор от наставника, дорабатываете архитектуру и получаете сертификат.',
  },
];

export function ProcessSection() {
  const [mode, setMode] = useState<'quiz' | 'steps'>('quiz');

  // Quiz state
  const [level, setLevel] = useState<'middle' | 'senior'>('middle');
  const [goal, setGoal] = useState<QuizGoal>('architecture');

  const recommendation = quizRecommendations[goal];

  return (
    <section
      id="process"
      className="scroll-mt-20 py-16 md:py-24 bg-surface-raised border-b border-border"
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 flex flex-col gap-10">
        {/* Section Header with Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-caption font-medium text-primary">
              Траектория обучения
            </span>
            <h2 className="font-display text-h2 font-semibold text-ink leading-tight">
              Как проходит обучение и защита решений
            </h2>
            <p className="text-body text-ink-muted leading-relaxed">
              Пройдите короткий опрос для подбора оптимального трека или изучите пошаговый процесс.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1 rounded-md bg-surface-sunken border border-border shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setMode('quiz')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-caption font-medium transition-colors cursor-pointer ${
                mode === 'quiz'
                  ? 'bg-surface-raised text-ink shadow-xs border border-border/80'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-accent" />
              <span>Квиз: подбор трека</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('steps')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-caption font-medium transition-colors cursor-pointer ${
                mode === 'steps'
                  ? 'bg-surface-raised text-ink shadow-xs border border-border/80'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 text-primary" />
              <span>Пошаговый процесс</span>
            </button>
          </div>
        </div>

        {/* MODE 1: QUIZ TRACK SELECTOR */}
        {mode === 'quiz' ? (
          <div className="p-6 sm:p-8 rounded-lg border border-border bg-surface-sunken/40 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question 1: Grade */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-primary font-medium">Шаг 1 из 2</span>
                <label className="font-display font-semibold text-base text-ink">
                  Ваш текущий грейд:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setLevel('middle')}
                    className={`p-3 text-left rounded-md border text-caption font-medium transition-colors cursor-pointer ${
                      level === 'middle'
                        ? 'bg-surface-raised border-primary text-primary ring-1 ring-primary'
                        : 'bg-surface border-border text-ink hover:bg-surface-sunken'
                    }`}
                  >
                    <span className="block font-semibold">Junior+ / Middle</span>
                    <span className="text-xs text-ink-muted mt-0.5 block">Хочу сильные базовые паттерны</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLevel('senior')}
                    className={`p-3 text-left rounded-md border text-caption font-medium transition-colors cursor-pointer ${
                      level === 'senior'
                        ? 'bg-surface-raised border-primary text-primary ring-1 ring-primary'
                        : 'bg-surface border-border text-ink hover:bg-surface-sunken'
                    }`}
                  >
                    <span className="block font-semibold">Middle+ / Senior</span>
                    <span className="text-xs text-ink-muted mt-0.5 block">Фокус на Staff-архитектуру</span>
                  </button>
                </div>
              </div>

              {/* Question 2: Goal */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-primary font-medium">Шаг 2 из 2</span>
                <label className="font-display font-semibold text-base text-ink">
                  Главный приоритет:
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'architecture', title: 'Архитектура FSD, чистота слоёв и TanStack Query' },
                    { id: 'designSystem', title: 'Дизайн-системы на Tailwind v4 и семантические токены' },
                    { id: 'career', title: 'Аудит пет-проекта и подготовка к собеседованиям' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGoal(opt.id as typeof goal)}
                      className={`p-2.5 px-3.5 text-left rounded-md border text-caption font-medium transition-colors cursor-pointer flex items-center justify-between ${
                        goal === opt.id
                          ? 'bg-surface-raised border-primary text-primary ring-1 ring-primary'
                          : 'bg-surface border-border text-ink hover:bg-surface-sunken'
                      }`}
                    >
                      <span>{opt.title}</span>
                      {goal === opt.id && <CheckCircle2 className="w-4 h-4 text-primary shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Result Banner */}
            <div className="p-5 sm:p-6 rounded-md bg-surface-raised border border-border/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded-sm bg-accent/20 text-ink border border-accent/40 font-medium">
                    Рекомендованный трек
                  </span>
                  <span className="text-xs text-ink-muted font-mono">{recommendation.duration}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-ink">
                  {recommendation.title}
                </h3>
                <p className="text-caption text-ink-muted leading-relaxed max-w-xl">
                  <strong className="text-ink">Артефакт:</strong> {recommendation.artifact}
                </p>
              </div>

              <Button
                href={recommendation.catalogHash}
                variant="accent"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shrink-0 w-full sm:w-auto"
              >
                Смотреть в каталоге
              </Button>
            </div>
          </div>
        ) : (
          /* MODE 2: STEP-BY-STEP TIMELINE */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <div
                key={item.title}
                className="p-5 rounded-lg border border-border bg-surface-raised flex flex-col gap-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-primary px-2 py-0.5 rounded-sm bg-primary/10 border border-primary/20">
                    Этап {item.step}
                  </span>
                  {idx < processSteps.length - 1 && (
                    <span className="text-xs text-ink-muted/50 hidden lg:inline font-mono">→</span>
                  )}
                </div>
                <h3 className="font-display font-semibold text-base text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-caption text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
