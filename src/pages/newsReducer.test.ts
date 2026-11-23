import { DEMO_CIRCULARS, DEMO_EVENTS, DEMO_NEWS } from '../mocks/demoData';
import { createInitialNewsState, newsEventsReducer } from './newsReducer';

describe('newsEventsReducer (useReducer)', () => {
  it('actualiza pestaña, categoría, búsqueda y restablece filtros', () => {
    let state = createInitialNewsState('noticias');

    state = newsEventsReducer(state, { type: 'SET_TAB', tab: 'circulares' });
    expect(state.activeTab).toBe('circulares');

    state = newsEventsReducer(state, { type: 'SET_CATEGORY', category: 'agroempresarial' });
    state = newsEventsReducer(state, { type: 'SET_QUERY', query: 'huerta' });
    expect(state.category).toBe('agroempresarial');
    expect(state.query).toBe('huerta');

    state = newsEventsReducer(state, { type: 'RESET_FILTERS' });
    expect(state.category).toBe('todas');
    expect(state.query).toBe('');
  });

  it('gestiona transiciones de carga, éxito, error y reintento', () => {
    let state = createInitialNewsState();

    state = newsEventsReducer(state, { type: 'FETCH_ERROR', message: 'Error de red' });
    expect(state.status).toBe('error');
    expect(state.errorMessage).toBe('Error de red');

    state = newsEventsReducer(state, { type: 'RETRY' });
    expect(state.reloadToken).toBe(1);

    state = newsEventsReducer(state, { type: 'FETCH_START' });
    expect(state.status).toBe('loading');
    expect(state.errorMessage).toBe('');

    state = newsEventsReducer(state, {
      type: 'FETCH_SUCCESS',
      payload: { news: DEMO_NEWS, events: DEMO_EVENTS, circulars: DEMO_CIRCULARS },
    });
    expect(state.status).toBe('success');
    expect(state.news).toHaveLength(DEMO_NEWS.length);
    expect(state.events).toHaveLength(DEMO_EVENTS.length);
    expect(state.circulars).toHaveLength(DEMO_CIRCULARS.length);
  });
});
