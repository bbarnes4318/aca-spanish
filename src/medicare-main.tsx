import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MedicareApp from './MedicareApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MedicareApp />
  </StrictMode>
);

