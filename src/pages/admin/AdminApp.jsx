import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from '../../lib/admin/auth';
import { ToastProvider } from '../../lib/admin/Toast';
import AdminLogin   from './AdminLogin';
import AdminLayout  from './AdminLayout';
import Dashboard    from './Dashboard';
import HomepageEditor from './HomepageEditor';
import BlogManager  from './BlogManager';
import DeployPanel  from './DeployPanel';

/**
 * AdminApp — full admin SPA, wrapped in its own ToastProvider.
 * Mounted at /admin/* in App.jsx, outside the main site Layout.
 */
export default function AdminApp() {
  const [loggedIn, setLoggedIn] = useState(auth.isLoggedIn());

  if (!loggedIn) {
    return (
      <ToastProvider>
        <AdminLogin onLogin={() => setLoggedIn(true)} />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index                element={<Dashboard />} />
          <Route path="homepage"      element={<HomepageEditor />} />
          <Route path="blog"          element={<BlogManager lang="en" />} />
          <Route path="blog-bn"       element={<BlogManager lang="bn" />} />
          <Route path="deploy"        element={<DeployPanel />} />
          {/* Catch all unknown admin routes */}
          <Route path="*"             element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
