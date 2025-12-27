/// <reference types="vite/client" />

interface Window {
  Calendly: {
    initPopupWidget: (options: { url: string }) => void;
  };
}

