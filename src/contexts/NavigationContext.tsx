import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface NavigationState {
  pathname: string;
  hash: string;
}

interface NavigateOptions {
  replace?: boolean;
}

interface NavigationContextValue {
  pathname: string;
  hash: string;
  navigate: (to: string, options?: NavigateOptions) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

function parseDestination(to: string): NavigationState {
  const cleaned = to.trim() || '/';
  if (cleaned.startsWith('#')) {
    return { pathname: '/', hash: cleaned };
  }
  const hashIdx = cleaned.indexOf('#');
  if (hashIdx >= 0) {
    const pathPart = cleaned.slice(0, hashIdx) || '/';
    const hashPart = cleaned.slice(hashIdx);
    return { pathname: pathPart.startsWith('/') ? pathPart : `/${pathPart}`, hash: hashPart };
  }
  return {
    pathname: cleaned.startsWith('/') ? cleaned : `/${cleaned}`,
    hash: '',
  };
}

function readBrowserLocation(): NavigationState {
  if (typeof window === 'undefined') {
    return { pathname: '/', hash: '' };
  }
  return {
    pathname: window.location.pathname || '/',
    hash: window.location.hash || '',
  };
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<NavigationState>(readBrowserLocation);

  useEffect(() => {
    const handlePopState = () => {
      setState(readBrowserLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    const next = parseDestination(to);
    const fullUrl = `${next.pathname}${next.hash}`;
    try {
      if (options?.replace) {
        window.history.replaceState(null, '', fullUrl);
      } else {
        window.history.pushState(null, '', fullUrl);
      }
    } catch {
      // Fallback safely if sandboxed iframe restricts history
    }
    setState(next);

    if (next.hash) {
      const targetId = next.hash.replace(/^#/, '');
      window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <NavigationContext.Provider value={{ pathname: state.pathname, hash: state.hash, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used inside NavigationProvider');
  }
  return ctx;
}

interface AppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

export const AppLink: React.FC<AppLinkProps> = ({ to, onClick, children, ...rest }) => {
  const { navigate } = useNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
