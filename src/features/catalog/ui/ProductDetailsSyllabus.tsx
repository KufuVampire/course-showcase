import type { SyllabusItem } from '@/shared/api';

export interface ProductDetailsSyllabusProps {
  syllabus?: SyllabusItem[];
}

export function ProductDetailsSyllabus({ syllabus }: ProductDetailsSyllabusProps) {
  if (!syllabus || syllabus.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display font-semibold text-ink text-lg">Программа обучения</h3>
      <div className="flex flex-col gap-3">
        {syllabus.map((item) => (
          <div
            key={item.title}
            className="p-3.5 bg-surface-sunken/60 border border-border/70 rounded-md"
          >
            <span className="font-semibold text-ink text-caption block mb-1.5">
              {item.title}
            </span>
            <ul className="flex flex-col gap-1 pl-4">
              {item.topics.map((t) => (
                <li key={t} className="text-caption text-ink-muted list-disc">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
