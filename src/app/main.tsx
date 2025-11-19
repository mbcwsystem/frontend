import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global/index.css';

import App from './providers/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
