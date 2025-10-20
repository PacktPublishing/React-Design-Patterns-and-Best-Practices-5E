describe('environment configuration', () => {
  const ORIGINAL_ENV = { ...process.env };

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    jest.resetModules();
  });

  it('provides sensible defaults for development', async () => {
    delete process.env.REACT_APP_ENVIRONMENT;
    delete process.env.REACT_APP_API_URL;

    const module = await import('./environment');
    const { config } = module;

    expect(config.environment).toBe('development');
    expect(config.apiUrl).toBe('/api');
    expect(config.features.debugMode).toBe(true);
  });

  it('enables analytics when running in production', async () => {
    process.env.REACT_APP_ENVIRONMENT = 'production';
    process.env.REACT_APP_API_URL = 'https://api.example.com';
    process.env.REACT_APP_GA_ID = 'GA-123';
    process.env.REACT_APP_SENTRY_DSN = 'dsn';

    const module = await import('./environment');
    const { config } = module;

    expect(config.environment).toBe('production');
    expect(config.apiUrl).toBe('https://api.example.com');
    expect(config.features.enableAnalytics).toBe(true);
    expect(config.analytics.googleAnalyticsId).toBe('GA-123');
    expect(config.analytics.sentryDsn).toBe('dsn');
  });
});
