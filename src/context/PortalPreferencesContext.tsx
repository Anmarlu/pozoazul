import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ContrastMode, InstitutionMeta, TextScale } from '../types/portal';

const STORAGE_KEY = 'pozoazul:preferences';
const TEXT_SCALES: TextScale[] = ['standard', 'large', 'xlarge'];

const INSTITUTION_META: InstitutionMeta = {
  officialName: 'Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul',
  shortName: 'IETAE Pozo Azul',
  daneCode: '213670000200',
  location: 'Corregimiento Pozo Azul, San Pablo',
  department: 'Sur de Bolívar',
  country: 'Colombia',
  facebookUrl: 'https://www.facebook.com/IEpozoazul/',
  tagline:
    'Establecimiento educativo oficial de Calendario A con formación técnica agropecuaria y empresarial al servicio de la comunidad rural del Sur de Bolívar.',
};

interface StoredPreferences {
  textScale: TextScale;
  contrast: ContrastMode;
}

export interface PortalPreferencesValue {
  institution: InstitutionMeta;
  textScale: TextScale;
  contrast: ContrastMode;
  canIncreaseText: boolean;
  canDecreaseText: boolean;
  increaseTextScale: () => void;
  decreaseTextScale: () => void;
  toggleTextScale: () => void;
  toggleContrast: () => void;
  resetPreferences: () => void;
}

const PortalPreferencesContext = createContext<PortalPreferencesValue | null>(null);

// ponytail: lectura segura de localStorage sin librería externa de persistencia
function readStoredPreferences(): StoredPreferences {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { textScale: 'standard', contrast: 'standard' };
    const parsed = JSON.parse(raw) as Partial<StoredPreferences>;
    const validScale = TEXT_SCALES.includes(parsed.textScale as TextScale)
      ? (parsed.textScale as TextScale)
      : 'standard';
    return {
      textScale: validScale,
      contrast: parsed.contrast === 'high' ? 'high' : 'standard',
    };
  } catch {
    return { textScale: 'standard', contrast: 'standard' };
  }
}

export function PortalPreferencesProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<StoredPreferences>(readStoredPreferences);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.textScale = prefs.textScale;
    root.dataset.contrast = prefs.contrast;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignora restricciones de almacenamiento en navegación privada
    }
  }, [prefs]);

  const currentIndex = TEXT_SCALES.indexOf(prefs.textScale);

  const value: PortalPreferencesValue = {
    institution: INSTITUTION_META,
    textScale: prefs.textScale,
    contrast: prefs.contrast,
    canIncreaseText: currentIndex < TEXT_SCALES.length - 1,
    canDecreaseText: currentIndex > 0,
    increaseTextScale: () =>
      setPrefs((prev) => {
        const idx = TEXT_SCALES.indexOf(prev.textScale);
        return { ...prev, textScale: TEXT_SCALES[Math.min(idx + 1, TEXT_SCALES.length - 1)] };
      }),
    decreaseTextScale: () =>
      setPrefs((prev) => {
        const idx = TEXT_SCALES.indexOf(prev.textScale);
        return { ...prev, textScale: TEXT_SCALES[Math.max(idx - 1, 0)] };
      }),
    toggleTextScale: () =>
      setPrefs((prev) => ({
        ...prev,
        textScale: prev.textScale === 'standard' ? 'large' : 'standard',
      })),
    toggleContrast: () =>
      setPrefs((prev) => ({
        ...prev,
        contrast: prev.contrast === 'standard' ? 'high' : 'standard',
      })),
    resetPreferences: () => setPrefs({ textScale: 'standard', contrast: 'standard' }),
  };

  return (
    <PortalPreferencesContext.Provider value={value}>
      {children}
    </PortalPreferencesContext.Provider>
  );
}

export function usePortalPreferences(): PortalPreferencesValue {
  const ctx = useContext(PortalPreferencesContext);
  if (!ctx) {
    throw new Error('usePortalPreferences debe usarse dentro de PortalPreferencesProvider');
  }
  return ctx;
}
