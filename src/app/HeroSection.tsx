import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-18 md:pb-24 border-b border-border bg-surface-raised overflow-hidden">
      <div className="max-w-page mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Quiet status eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-sunken border border-border text-caption text-ink font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              <span>Инженерные практикумы и&nbsp;код-ревью</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-display font-semibold text-ink tracking-tight mb-5 text-balance">
              Архитектура систем и&nbsp;код-ревью уровня Staff
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-body text-ink-muted leading-relaxed mb-8 max-w-xl text-pretty">
              Сфокусированные программы по&nbsp;Feature-Sliced Design, современным дизайн-системам
              и&nbsp;чистоте слоёв. Без растянутых лекций: проектирование, разбор реального кода
              и&nbsp;защита решений.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Button
                href="/#catalog"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Выбрать программу
              </Button>

              <Button href="/#benefits" variant="outline" size="lg">
                Как устроено обучение
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Visual — Real Staff Code Review Artifact */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-lg border border-border bg-surface shadow-card overflow-hidden">
              {/* Terminal / Code Editor Header */}
              <div className="px-4 py-3 border-b border-border bg-surface-sunken/60 flex items-center justify-between gap-3 text-caption">
                <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="ml-2 text-ink">PR #48 · refactor/fsd-layer-contracts</span>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded-sm bg-success/15 text-success border border-success/30 font-medium">
                  ✓ Review passed
                </span>
              </div>

              {/* Code Diff Presentation */}
              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed overflow-x-auto bg-surface-raised scrollbar-custom">
                <div className="text-ink-muted mb-2 font-sans font-medium text-caption">
                  src/features/catalog/model/useCatalog.ts
                </div>

                <div className="flex flex-col gap-1 text-ink">
                  {/* Monolithic old code */}
                  <div className="text-danger/90 bg-danger/10 px-2 py-1 rounded-sm line-through">
                    - const [items, setItems] = useState([]); useEffect(&#123; fetchCatalog()... &#125;)
                  </div>

                  {/* Clean FSD query code */}
                  <div className="text-secondary bg-secondary/10 px-2 py-1 rounded-sm font-medium">
                    + const &#123; data: products, status &#125; = useCatalogQuery(filters);
                  </div>
                  <div className="text-secondary bg-secondary/10 px-2 py-1 rounded-sm font-medium">
                    + const updateFilters = useCatalogFiltersSync();
                  </div>
                </div>

                {/* Staff Review Comment Box */}
                <div className="mt-4 p-3.5 rounded-md border border-border bg-surface-sunken/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[10px]">
                        S
                      </span>
                      <span className="font-medium text-ink">Staff Reviewer</span>
                      <span className="text-ink-muted">@infrastructure</span>
                    </div>
                    <span className="text-ink-muted font-mono">14&nbsp;мин назад</span>
                  </div>
                  <p className="font-sans text-caption text-ink-muted leading-relaxed text-pretty">
                    Отличная декомпозиция. Серверное состояние изолировано в&nbsp;TanStack Query, фильтры синхронизированы через URL, циклические зависимости отсутствуют. В&nbsp;продакшн.
                  </p>
                </div>
              </div>

              {/* Meta spec strip */}
              <div className="px-4 py-2.5 border-t border-border bg-surface-sunken/40 flex items-center justify-between text-xs font-mono text-ink-muted">
                <span>Stack: TypeScript 5.8 · React 19 · FSD 2.1</span>
                <span className="text-secondary font-medium">0 cycles detected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
