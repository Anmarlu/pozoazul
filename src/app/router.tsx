import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { StatusState } from '../components/ui/StatusState';
import { AcademicOfferPage } from '../pages/AcademicOfferPage';
import { ContactPage } from '../pages/ContactPage';
import { HomePage } from '../pages/HomePage';
import { InstitutionPage } from '../pages/InstitutionPage';
import { NewsDetailPage } from '../pages/NewsDetailPage';
import { NewsEventsPage } from '../pages/NewsEventsPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PlatformsPage } from '../pages/PlatformsPage';
import { ProceduresPage } from '../pages/ProceduresPage';

const ApiDocsPage = lazy(() => import('../pages/ApiDocsPage'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="institucion" element={<InstitutionPage />} />
        <Route path="oferta-academica" element={<AcademicOfferPage />} />
        <Route path="noticias" element={<NewsEventsPage />} />
        <Route path="noticias/:slug" element={<NewsDetailPage />} />
        <Route path="tramites" element={<ProceduresPage />} />
        <Route path="plataformas" element={<PlatformsPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route
          path="api-docs"
          element={
            <Suspense
              fallback={
                <StatusState
                  status="loading"
                  message="Cargando documentación interactiva OpenAPI / Swagger..."
                />
              }
            >
              <ApiDocsPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
