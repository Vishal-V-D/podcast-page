import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './pages/authcontext.jsx';

// Enable React Router v7 future flags (optional)
window.__react_router_future__ = window.__react_router_future__ || {};
window.__react_router_future__.v7_startTransition = true;
window.__react_router_future__.v7_relativeSplatPath = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
   <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
