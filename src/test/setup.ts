import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

window.scrollTo = () => {};

// Polyfill in-memory localStorage for Node 22 / Vitest
const storageStore: Record<string, string> = {};
const storageMock = {
  getItem: (key: string) => storageStore[key] || null,
  setItem: (key: string, value: string) => {
    storageStore[key] = value.toString();
  },
  removeItem: (key: string) => {
    delete storageStore[key];
  },
  clear: () => {
    for (const key of Object.keys(storageStore)) {
      delete storageStore[key];
    }
  },
  get length() {
    return Object.keys(storageStore).length;
  },
  key: (i: number) => Object.keys(storageStore)[i] || null,
};

Object.defineProperty(window, "localStorage", {
  value: storageMock,
  writable: true,
  configurable: true,
});

