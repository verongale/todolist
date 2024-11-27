import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Nav from './nav';
import reportWebVitals from './reportWebVitals';
import "./index.css";  // Importa il file CSS di Tailwind

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <Nav />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
