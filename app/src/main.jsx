import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')  // Dette er service worker-filen generert av PWA plugin-en
      .then((registration) => {
        console.log('Service Worker registrert med suksess:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registrering mislyktes:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);