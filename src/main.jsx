import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
<<<<<<< HEAD
=======
import { AuthProvider } from './pages/authcontext.jsx';
>>>>>>> 44625a2 (new)

// Enable React Router v7 future flags (optional)
window.__react_router_future__ = window.__react_router_future__ || {};
window.__react_router_future__.v7_startTransition = true;
window.__react_router_future__.v7_relativeSplatPath = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <App />
=======
   <AuthProvider>
      <App />
    </AuthProvider>
>>>>>>> 44625a2 (new)
    </BrowserRouter>
  </React.StrictMode>
);
