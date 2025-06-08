// src/App.jsx   ← or src/AppRouter.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PendingApproval from './pages/PendingApproval';
import Mainpage from './mainpage';

import { getAuth } from 'firebase/auth';
import UserAuth from './pages/userauth';

// Simple protected route
function ProtectedRoute({ children }) {
  const user = getAuth().currentUser;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<UserAuth />} />

      <Route
        path="/homepage"
        element={
          <ProtectedRoute>
            <Mainpage />
          </ProtectedRoute>
        }
      />

      <Route path="/pending" element={<PendingApproval />} />

      {/* Catch-all → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
