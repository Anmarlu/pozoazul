import { DemoPortalRepository } from './demoPortalRepository';
import { HttpPortalRepository } from './httpPortalRepository';
import type { PortalRepository } from './portalRepository';

const useDemoFallback = import.meta.env.VITE_DATA_SOURCE === 'demo';

export const portalRepository: PortalRepository = useDemoFallback
  ? new DemoPortalRepository()
  : new HttpPortalRepository();

export type { PortalRepository };
