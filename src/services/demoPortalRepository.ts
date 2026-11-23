import { DEMO_CIRCULARS, DEMO_EVENTS, DEMO_NEWS } from '../mocks/demoData';
import type { CircularItem, NewsFilterParams, NewsItem, SchoolEvent } from '../types/portal';
import type { PortalRepository } from './portalRepository';

// Adaptador fallback en memoria para despliegues estáticos sin middleware /api/*
export class DemoPortalRepository implements PortalRepository {
  async getNews(params?: NewsFilterParams): Promise<NewsItem[]> {
    const query = params?.query?.trim().toLowerCase();
    return DEMO_NEWS.filter((item) => {
      if (params?.category && item.category !== params.category) return false;
      if (
        query &&
        !item.title.toLowerCase().includes(query) &&
        !item.summary.toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });
  }

  async getNewsBySlug(slug: string): Promise<NewsItem | null> {
    return DEMO_NEWS.find((item) => item.slug === slug) ?? null;
  }

  async getEvents(): Promise<SchoolEvent[]> {
    return DEMO_EVENTS;
  }

  async getCirculars(): Promise<CircularItem[]> {
    return DEMO_CIRCULARS;
  }
}
