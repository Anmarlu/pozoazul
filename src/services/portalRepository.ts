import type { CircularItem, NewsFilterParams, NewsItem, SchoolEvent } from '../types/portal';

export interface PortalRepository {
  getNews(params?: NewsFilterParams, signal?: AbortSignal): Promise<NewsItem[]>;
  getNewsBySlug(slug: string, signal?: AbortSignal): Promise<NewsItem | null>;
  getEvents(signal?: AbortSignal): Promise<SchoolEvent[]>;
  getCirculars(signal?: AbortSignal): Promise<CircularItem[]>;
}
