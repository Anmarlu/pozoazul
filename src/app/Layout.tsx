import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AccessibilityRail } from '../components/layout/AccessibilityRail';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';

export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // Restaura el scroll al inicio en cada cambio de ruta SPA
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-surface-canvas text-ink-primary">
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido principal
      </a>

      <Header />
      <AccessibilityRail />

      {/* ponytail: branch <main> padding by route instead of duplicating a full-bleed layout wrapper */}
      <main
        id="contenido-principal"
        tabIndex={-1}
        className={
          isHome
            ? 'w-full flex-1 outline-none'
            : 'mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 outline-none sm:px-6 lg:px-8'
        }
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
