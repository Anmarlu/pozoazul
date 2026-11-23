import type { ReactNode } from 'react';
import { Contrast, RotateCcw } from 'lucide-react';
import { usePortalPreferences } from '../../context/PortalPreferencesContext';

interface RailButtonProps {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
  active?: boolean;
  children: ReactNode;
}

function RailButton({
  label,
  onClick,
  pressed,
  disabled = false,
  active = false,
  children,
}: RailButtonProps) {
  return (
    <div className="group relative flex items-center justify-end">
      {/* Etiqueta desplegable hacia la izquierda (solo transform + opacity) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-brand-primary px-3 py-1.5 text-xs font-semibold text-ink-on-dark opacity-0 shadow-md transition-[transform,opacity] duration-150 translate-x-1.5 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
        style={{ transitionTimingFunction: 'var(--ease-out)' }}
      >
        {label}
      </span>

      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-pressed={pressed}
        disabled={disabled}
        className={[
          'btn-pressable flex h-10 w-10 items-center justify-center rounded-md border text-sm font-bold shadow-xs transition-[transform,background-color,color,opacity] duration-150 sm:h-11 sm:w-11',
          active
            ? 'border-accent-sky bg-accent-sky text-ink-primary'
            : 'border-white/15 bg-surface-elevated text-brand-primary',
          disabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer',
        ].join(' ')}
      >
        {children}
      </button>
    </div>
  );
}

export function AccessibilityRail() {
  const {
    contrast,
    textScale,
    canIncreaseText,
    canDecreaseText,
    toggleContrast,
    increaseTextScale,
    decreaseTextScale,
    resetPreferences,
  } = usePortalPreferences();

  const hasCustomPrefs = contrast === 'high' || textScale !== 'standard';

  return (
    <aside
      aria-label="Barra de herramientas de accesibilidad"
      className="on-dark fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-xl border border-r-0 border-white/15 bg-brand-primary p-1.5 shadow-lg sm:p-2"
    >
      <div className="flex flex-col gap-1.5">
        <RailButton
          label={contrast === 'high' ? 'Contraste normal' : 'Alto contraste'}
          onClick={toggleContrast}
          pressed={contrast === 'high'}
          active={contrast === 'high'}
        >
          <Contrast className="h-5 w-5" aria-hidden="true" />
        </RailButton>

        <RailButton
          label="Aumentar letra"
          onClick={increaseTextScale}
          disabled={!canIncreaseText}
          active={textScale !== 'standard'}
        >
          <span className="leading-none tracking-tight" aria-hidden="true">
            A<sup className="text-[10px] font-bold">+</sup>
          </span>
        </RailButton>

        <RailButton
          label="Reducir letra"
          onClick={decreaseTextScale}
          disabled={!canDecreaseText}
        >
          <span className="leading-none tracking-tight text-xs" aria-hidden="true">
            A<span className="ml-0.5 text-[11px] font-bold">−</span>
          </span>
        </RailButton>

        <RailButton
          label="Restablecer vista"
          onClick={resetPreferences}
          disabled={!hasCustomPrefs}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
        </RailButton>
      </div>
    </aside>
  );
}
