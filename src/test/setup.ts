import '@testing-library/jest-dom/vitest';

// Stub liviano para jsdom (evita aviso "Not implemented: window.scrollTo")
window.scrollTo = () => {};
