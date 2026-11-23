const MONTHS_LONG = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const MONTHS_SHORT = [
  'ENE',
  'FEB',
  'MAR',
  'ABR',
  'MAY',
  'JUN',
  'JUL',
  'AGO',
  'SEP',
  'OCT',
  'NOV',
  'DIC',
];

function parseIsoParts(isoDate: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return { year, month, day };
}

// ponytail: parseo directo YYYY-MM-DD para evitar desfases de zona horaria UTC en es-CO
export function formatDateLong(isoDate: string): string {
  const parts = parseIsoParts(isoDate);
  if (!parts) return isoDate;
  return `${parts.day} de ${MONTHS_LONG[parts.month - 1]} de ${parts.year}`;
}

export function formatEventBadge(isoDate: string): { day: string; monthShort: string } {
  const parts = parseIsoParts(isoDate);
  if (!parts) return { day: '--', monthShort: '---' };
  return {
    day: String(parts.day).padStart(2, '0'),
    monthShort: MONTHS_SHORT[parts.month - 1],
  };
}
