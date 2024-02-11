import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from '../src/views/LandingPage.tsx';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

