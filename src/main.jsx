import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const container = document.getElementById('root');
const hasPrerendered = !!document.getElementById('prerendered-content');

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// If pre-rendered content exists inside #root, hydrate (adopt the DOM).
// Otherwise fall back to createRoot (dev server, no prerender run yet).
if (hasPrerendered) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

