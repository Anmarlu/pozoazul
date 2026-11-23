export type TextScale = 'standard' | 'large' | 'xlarge';
export type ContrastMode = 'standard' | 'high';

export interface InstitutionMeta {
  officialName: string;
  shortName: string;
  daneCode: string;
  location: string;
  department: string;
  country: string;
  facebookUrl: string;
  tagline: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export type NewsCategory = 'institucional' | 'academico' | 'agroempresarial' | 'comunidad';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: NewsCategory;
  publishedAt: string; // ISO 8601 (YYYY-MM-DD)
}

export type EventAudience = 'estudiantes' | 'acudientes' | 'docentes' | 'comunidad';

export interface SchoolEvent {
  id: string;
  title: string;
  date: string; // ISO 8601 (YYYY-MM-DD)
  timeLabel: string;
  location: string;
  audience: EventAudience;
  description: string;
}

export interface CircularItem {
  id: string;
  code: string;
  title: string;
  publishedAt: string; // ISO 8601 (YYYY-MM-DD)
  audience: string;
  summary: string;
  fileSizeLabel: string;
}

export interface NewsFilterParams {
  category?: NewsCategory;
  query?: string;
}

export interface ApiError {
  code: string;
  message: string;
  status?: number;
}
