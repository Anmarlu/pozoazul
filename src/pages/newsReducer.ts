import type { CircularItem, NewsCategory, NewsItem, SchoolEvent } from '../types/portal';

export type NewsTab = 'noticias' | 'eventos' | 'circulares';
export type CategoryFilter = NewsCategory | 'todas';

export interface NewsEventsState {
  activeTab: NewsTab;
  category: CategoryFilter;
  query: string;
  status: 'loading' | 'success' | 'error';
  news: NewsItem[];
  events: SchoolEvent[];
  circulars: CircularItem[];
  errorMessage: string;
  reloadToken: number;
}

export type NewsEventsAction =
  | { type: 'SET_TAB'; tab: NewsTab }
  | { type: 'SET_CATEGORY'; category: CategoryFilter }
  | { type: 'SET_QUERY'; query: string }
  | { type: 'RESET_FILTERS' }
  | { type: 'RETRY' }
  | { type: 'FETCH_START' }
  | {
      type: 'FETCH_SUCCESS';
      payload: {
        news: NewsItem[];
        events: SchoolEvent[];
        circulars: CircularItem[];
      };
    }
  | { type: 'FETCH_ERROR'; message: string };

export function createInitialNewsState(initialTab: NewsTab = 'noticias'): NewsEventsState {
  return {
    activeTab: initialTab,
    category: 'todas',
    query: '',
    status: 'loading',
    news: [],
    events: [],
    circulars: [],
    errorMessage: '',
    reloadToken: 0,
  };
}

export function newsEventsReducer(
  state: NewsEventsState,
  action: NewsEventsAction,
): NewsEventsState {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.tab };
    case 'SET_CATEGORY':
      return { ...state, category: action.category };
    case 'SET_QUERY':
      return { ...state, query: action.query };
    case 'RESET_FILTERS':
      return { ...state, category: 'todas', query: '' };
    case 'RETRY':
      return { ...state, reloadToken: state.reloadToken + 1 };
    case 'FETCH_START':
      return { ...state, status: 'loading', errorMessage: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        status: 'success',
        news: action.payload.news,
        events: action.payload.events,
        circulars: action.payload.circulars,
        errorMessage: '',
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        status: 'error',
        errorMessage: action.message,
      };
  }
}
