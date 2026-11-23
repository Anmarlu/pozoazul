import axios from 'axios';
import type { ApiError } from '../types/portal';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
});

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isCancel(error)) {
    return {
      code: 'CANCELLED',
      message: 'La consulta fue cancelada.',
    };
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 404) {
      return {
        code: 'NOT_FOUND',
        status,
        message: 'No encontramos la información solicitada.',
      };
    }
    if (status && status >= 500) {
      return {
        code: 'SERVER_ERROR',
        status,
        message: 'El servicio presentó un inconveniente temporal. Intenta nuevamente en unos segundos.',
      };
    }
    return {
      code: error.code ?? 'NETWORK_ERROR',
      status,
      message: 'No fue posible conectar con el servicio. Verifica tu conexión e intenta de nuevo.',
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'Ocurrió un error inesperado al cargar la información.',
  };
}
