import React, { createContext, useCallback, useContext, useState } from 'react';
import type { AdminUserProfile, AdminUserRecord } from '../types/cms';
import {
  ADMIN_MODULES,
  canAccessModule,
  type AdminModuleKey,
  type AdminRole,
} from '../utils/institutionalRules';

interface AuthContextValue {
  adminUser: AdminUserProfile | null;
  loading: boolean;
  authError: string | null;
  signInAsDemoRole: (role: AdminRole, adminUsers?: AdminUserRecord[]) => boolean;
  signInWithCredentials: (
    email: string,
    password: string,
    adminUsers?: AdminUserRecord[]
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
  hasModuleAccess: (moduleKey: AdminModuleKey) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_DEFAULT_PROFILES: Record<AdminRole, Omit<AdminUserProfile, 'permittedModules'>> = {
  super_admin: {
    id: 1,
    uid: 'demo-super-admin',
    email: 'admin@asma-madrasa.org',
    fullName: 'মুহতামিম ও সুপার অ্যাডমিন',
    role: 'super_admin',
  },
  content_admin: {
    id: 2,
    uid: 'demo-content-admin',
    email: 'content@asma-madrasa.org',
    fullName: 'উস্তাযাহ ফাতেমা (কনটেন্ট অ্যাডমিন)',
    role: 'content_admin',
  },
  admission_admin: {
    id: 3,
    uid: 'demo-admission-admin',
    email: 'admission@asma-madrasa.org',
    fullName: 'মাওলানা আব্দুল্লাহ (ভর্তি অ্যাডমিন)',
    role: 'admission_admin',
  },
  qa_admin: {
    id: 4,
    uid: 'demo-qa-admin',
    email: 'mufti@asma-madrasa.org',
    fullName: 'মুফতি জুবায়ের (মাসআলা বিভাগ)',
    role: 'qa_admin',
  },
  communication_admin: {
    id: 5,
    uid: 'demo-comm-admin',
    email: 'support@asma-madrasa.org',
    fullName: 'যোগাযোগ ও চ্যাট প্রতিনিধি',
    role: 'communication_admin',
  },
};

function buildProfile(base: Omit<AdminUserProfile, 'permittedModules'>): AdminUserProfile {
  return {
    ...base,
    permittedModules: ADMIN_MODULES.filter((mod) => canAccessModule(base.role, mod)),
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUserProfile | null>(null);
  const [loading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const signInAsDemoRole = useCallback(
    (role: AdminRole, adminUsers?: AdminUserRecord[]) => {
      setAuthError(null);
      const matched = adminUsers?.find((u) => u.role === role && u.isActive);
      const base = matched
        ? {
            id: matched.id,
            uid: matched.uid,
            email: matched.email,
            fullName: matched.fullName,
            role: matched.role,
          }
        : DEMO_DEFAULT_PROFILES[role];

      setAdminUser(buildProfile(base));
      return true;
    },
    []
  );

  const signInWithCredentials = useCallback(
    async (email: string, password: string, adminUsers?: AdminUserRecord[]) => {
      setAuthError(null);
      const trimmedEmail = email.trim().toLowerCase();
      if (!trimmedEmail || !password.trim()) {
        setAuthError('অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড উভয়ই লিখুন।');
        return false;
      }

      const pool = adminUsers?.length
        ? adminUsers
        : Object.values(DEMO_DEFAULT_PROFILES).map((p) => ({
            ...p,
            isActive: true,
          }));

      const matched = pool.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (!matched) {
        setAuthError('এই ইমেইলটি ডেমো তালিকায় পাওয়া যায়নি। দ্রুত লগইন বাটন বা admin@asma-madrasa.org ব্যবহার করুন।');
        return false;
      }
      if (!matched.isActive) {
        setAuthError('এই অ্যাডমিন অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় করা আছে।');
        return false;
      }
      if (password !== 'demo1234' && password.length < 4) {
        setAuthError('অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন (ডেমো পাসওয়ার্ড: demo1234)।');
        return false;
      }

      setAdminUser(
        buildProfile({
          id: matched.id,
          uid: matched.uid,
          email: matched.email,
          fullName: matched.fullName,
          role: matched.role,
        })
      );
      return true;
    },
    []
  );

  const signOut = useCallback(async () => {
    setAdminUser(null);
    setAuthError(null);
  }, []);

  const hasModuleAccess = useCallback(
    (moduleKey: AdminModuleKey) => {
      if (!adminUser) return false;
      return adminUser.permittedModules.includes(moduleKey);
    },
    [adminUser]
  );

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        loading,
        authError,
        signInAsDemoRole,
        signInWithCredentials,
        signOut,
        hasModuleAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
