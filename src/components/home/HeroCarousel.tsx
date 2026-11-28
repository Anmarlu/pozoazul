import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface HeroSlide {
  id: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'sede-principal',
    src: '/images/hero-sede-principal.webp',
    alt: 'Fachada y entrada principal de la Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul con estudiantes',
    caption: 'Sede principal — Corregimiento de Pozo Azul, San Pablo, Bolívar',
    objectPosition: 'object-center',
  },
  {
    id: 'comunidad-educativa',
    src: '/images/hero-comunidad-educativa.webp',
    alt: 'Estudiantes en uniforme y docentes de la IETA Pozo Azul reunidos en jornada institucional',
    caption: 'Comunidad educativa — Estudiantes y docentes en jornada institucional',
    objectPosition: 'object-[50%_40%]',
  },
];

const AUTOPLAY_INTERVAL_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

/**
 * Carrusel institucional a pantalla completa para la página de inicio.
 * Usa transiciones CSS compositadas (opacity + transform) sin librerías externas.
 */
export function HeroCarousel() {
  // ponytail: native state + compositor CSS transitions instead of adding a carousel library
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const slideCount = HERO_SLIDES.length;
  const activeSlide = HERO_SLIDES[activeIndex];

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibility = () => {
      setIsTabHidden(document.visibilityState === 'hidden');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (isPaused || isTabHidden) return;
    const timer = window.setTimeout(goToNext, AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, goToNext, isPaused, isTabHidden]);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) goToNext();
      else goToPrev();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrev();
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Galería institucional IETA Pozo Azul"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      className="on-dark relative flex min-h-[calc(100dvh-6.75rem)] w-full touch-pan-y flex-col justify-end overflow-hidden bg-[#0b1933]"
    >
      {/* Capas fotográficas superpuestas con transición compositada (opacity + scale) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <img
              key={slide.id}
              src={slide.src}
              alt={slide.alt}
              width={1280}
              height={720}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              className={[
                'absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500',
                slide.objectPosition,
                isActive ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0',
              ].join(' ')}
              style={{ transitionTimingFunction: 'var(--ease-out)' }}
            />
          );
        })}

        {/* Velo direccional para legibilidad WCAG sobre fotografía en móvil y escritorio */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08142b]/95 via-[#0b1c3d]/60 to-[#08142b]/25 lg:bg-gradient-to-r lg:from-[#08142b]/88 lg:via-[#0b1c3d]/45 lg:to-transparent" />
      </div>

      {/* Contenido institucional y controles inferiores */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-8 pt-24 pr-14 sm:px-6 sm:pb-10 sm:pr-16 lg:px-8 lg:pb-12">
        <div className="max-w-3xl">
          <h1 className="m-0 max-w-[20ch] text-3xl font-semibold leading-[1.1] text-ink-on-dark sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
            Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul
          </h1>
          <p className="mt-4 max-w-[58ch] text-sm text-ink-on-dark-muted sm:text-base lg:text-lg">
            Establecimiento educativo oficial (DANE 213670000200) ubicado en el corregimiento de
            Pozo Azul, San Pablo, Sur de Bolívar. Un espacio centralizado para que acudientes,
            estudiantes y docentes consulten información escolar sin desplazamientos innecesarios.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/plataformas"
              className="btn-pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-surface-elevated px-5 text-sm font-semibold text-brand-primary no-underline hover:bg-surface-tinted"
            >
              <span>Acceder a plataformas</span>
              <ArrowRight className="h-4 w-4 text-brand-primary" aria-hidden="true" />
            </Link>
            <Link
              to="/oferta-academica"
              className="btn-pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 bg-[#08142b]/55 px-5 text-sm font-semibold text-ink-on-dark no-underline backdrop-blur-xs hover:bg-[#08142b]/80"
            >
              <BookOpen className="h-4 w-4 text-accent-sky" aria-hidden="true" />
              <span>Conocer la oferta académica</span>
            </Link>
          </div>
        </div>

        {/* Barra de estado y navegación del carrusel */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            aria-live={isPaused ? 'polite' : 'off'}
            className="m-0 flex flex-wrap items-center gap-2 text-xs text-ink-on-dark-muted sm:text-sm"
          >
            <span className="font-semibold text-accent-sky tabular-nums">
              {activeIndex + 1} / {slideCount}
            </span>
            <span aria-hidden="true">·</span>
            <span>{activeSlide.caption}</span>
          </p>

          <div className="flex items-center gap-2" role="group" aria-label="Controles del carrusel">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Imagen anterior"
              className="btn-pressable inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 bg-[#08142b]/65 text-ink-on-dark hover:bg-[#08142b]/90"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-1.5 px-1">
              {HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Ir a imagen ${index + 1} de ${slideCount}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="btn-pressable inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2"
                  >
                    <span
                      className={[
                        'block h-2 rounded-full transition-[width,background-color] duration-200',
                        isActive ? 'w-7 bg-accent-sky' : 'w-2.5 bg-white/40',
                      ].join(' ')}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Imagen siguiente"
              className="btn-pressable inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 bg-[#08142b]/65 text-ink-on-dark hover:bg-[#08142b]/90"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Reanudar carrusel' : 'Pausar carrusel'}
              aria-pressed={isPaused}
              className="btn-pressable inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 bg-[#08142b]/65 text-ink-on-dark hover:bg-[#08142b]/90"
            >
              {isPaused ? (
                <Play className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
