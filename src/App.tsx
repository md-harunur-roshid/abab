/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { SiteDataProvider } from './contexts/SiteDataContext';

import { DepartmentDetailPage } from './pages/DepartmentDetailPage';
import { HomePage } from './pages/HomePage';
import { MasalaArchivePage } from './pages/MasalaArchivePage';
import { MasalaDetailPage } from './pages/MasalaDetailPage';
import { AdmissionPage } from './pages/AdmissionPage'; // AdmissionPage ইমপোর্ট করা হলো

const AppRouterView: React.FC = () => {
  const { pathname, navigate } = useNavigation();
  const { adminUser, loading } = useAuth();

  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';

  useEffect(() => {
    if (!loading && !adminUser && normalizedPath === '/admin') {
      navigate('/admin/login', { replace: true });
    }
  }, [loading, adminUser, normalizedPath, navigate]);

  
  if (normalizedPath === '/admissionFee') {
    return <AdmissionPage />;
  }

  if (normalizedPath === '/masala') {
    return <MasalaArchivePage />;
  }

  const masalaMatch = normalizedPath.match(/^\/masala\/([^/]+)$/);
  if (masalaMatch) {
    return <MasalaDetailPage masalaId={decodeURIComponent(masalaMatch[1])} />;
  }

  const deptMatch = normalizedPath.match(/^\/departments\/([^/]+)$/);
  if (deptMatch) {
    return <DepartmentDetailPage slug={decodeURIComponent(deptMatch[1])} />;
  }

  return <HomePage />;
};

export default function App() {
  return (
    <AuthProvider>
      <SiteDataProvider>
        <NavigationProvider>
          <AppRouterView />
        </NavigationProvider>
      </SiteDataProvider>
    </AuthProvider>
  );
}