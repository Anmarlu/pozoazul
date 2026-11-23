import { BrowserRouter } from 'react-router-dom';
import { PortalPreferencesProvider } from '../context/PortalPreferencesContext';
import { AppRoutes } from './router';

export function App() {
  return (
    <PortalPreferencesProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PortalPreferencesProvider>
  );
}
