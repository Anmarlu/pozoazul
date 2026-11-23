import axios from 'axios';
import type { CircularItem, NewsFilterParams, NewsItem, SchoolEvent } from '../types/portal';
import { httpClient, normalizeApiError } from './httpClient';
import type { PortalRepository } from './portalRepository';

export class HttpPortalRepository implements PortalRepository {
  async getNews(params?: NewsFilterParams, signal?: AbortSignal): Promise<NewsItem[]> {
    try {
      const response = await httpClient.get<NewsItem[]>('/news', {
        params: {
          category: params?.category || undefined,
          query: params?.query?.trim() || undefined,
        },
        signal,
      });
      return response.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }

  async getNewsBySlug(slug: string, signal?: AbortSignal): Promise<NewsItem | null> {
    try {
      const response = await httpClient.get<NewsItem>(`/news/${encodeURIComponent(slug)}`, {
        signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw normalizeApiError(error);
    }
  }

  async getEvents(signal?: AbortSignal): Promise<SchoolEvent[]> {
    try {
      const response = await httpClient.get<SchoolEvent[]>('/events', { signal });
      return response.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }

  async getCirculars(signal?: AbortSignal): Promise<CircularItem[]> {
    try {
      const response = await httpClient.get<CircularItem[]>('/circulars', { signal });
      return response.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }
}
