import { useCallback, useEffect, useState } from 'react';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';

type Route = 'dashboard' | 'settings';

function getCurrentRoute(): Route {
  if (typeof window === 'undefined') {
    return 'dashboard';
  }

  return window.location.pathname === '/settings' ? 'settings' : 'dashboard';
}

export function App() {
  const { flags, hasError } = useFeatureFlags();
  const [route, setRoute] = useState<Route>(() => getCurrentRoute());

  useEffect(() => {
    function handlePopState() {
      setRoute(getCurrentRoute());
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((nextRoute: Route) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (nextRoute === 'settings') {
      window.history.pushState({}, '', '/settings');
    } else {
      window.history.pushState({}, '', '/');
    }

    setRoute(nextRoute);
  }, []);

  return (
    <div>
      <header>
        <h1 data-testid="dashboard-title">{route === 'settings' ? 'Settings' : 'Dashboard'}</h1>
        <nav>
          <button data-testid="nav-dashboard" onClick={() => navigateTo('dashboard')}>
            Dashboard
          </button>
          <button data-testid="nav-settings" onClick={() => navigateTo('settings')}>
            Settings
          </button>
        </nav>
      </header>

      {route === 'dashboard' ? (
        <>
          <section>
            {[1, 2, 3, 4].map((metric) => (
              <article key={metric} data-testid="metric-card">
                <h2>Metric {metric}</h2>
                <p>{metric * 42}</p>
              </article>
            ))}
          </section>
          {flags.advancedAnalytics ? (
            <div>Analytics enabled</div>
          ) : hasError ? (
            <div data-testid="error-message">Error loading metrics</div>
          ) : (
            <div data-testid="beta-message">Analytics disabled for this environment</div>
          )}
        </>
      ) : (
        <main>
          <h2>Application settings</h2>
          <p>Adjust feature flags and notification preferences.</p>
        </main>
      )}
    </div>
  );
}
