declare module 'swagger-ui-dist/swagger-ui-es-bundle' {
  interface SwaggerUIConfig {
    url?: string;
    domNode?: HTMLElement | null;
    deepLinking?: boolean;
    docExpansion?: 'list' | 'full' | 'none';
    defaultModelsExpandDepth?: number;
  }

  const SwaggerUIBundle: (config: SwaggerUIConfig) => unknown;
  export default SwaggerUIBundle;
}
