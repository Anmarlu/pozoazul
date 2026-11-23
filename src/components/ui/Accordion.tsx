import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className="divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-elevated">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-btn-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id}>
            <h3 className="m-0 font-sans text-base font-semibold">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="hover-surface flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-ink-primary transition-[background-color] duration-150"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-brand-primary transition-transform duration-150"
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transitionTimingFunction: 'var(--ease-out)',
                  }}
                  aria-hidden="true"
                />
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:text-base"
              >
                <p className="m-0 max-w-[68ch]">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
