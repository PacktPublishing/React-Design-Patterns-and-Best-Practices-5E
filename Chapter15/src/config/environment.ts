export interface EnvironmentConfig {
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    enableAnalytics: boolean;
    enableBetaFeatures: boolean;
    debugMode: boolean;
  };
  analytics: {
    googleAnalyticsId?: string;
    sentryDsn?: string;
  };
}

function getEnvironmentConfig(): EnvironmentConfig {
  const env = process.env.REACT_APP_ENVIRONMENT || 'development';

  const baseConfig: EnvironmentConfig = {
    apiUrl: process.env.REACT_APP_API_URL || '/api',
    environment: env as EnvironmentConfig['environment'],
    features: {
      enableAnalytics: env === 'production',
      enableBetaFeatures: env !== 'production',
      debugMode: env === 'development',
    },
    analytics: {},
  };

  if (env === 'production') {
    baseConfig.analytics.googleAnalyticsId = process.env.REACT_APP_GA_ID;
    baseConfig.analytics.sentryDsn = process.env.REACT_APP_SENTRY_DSN;
  }

  return baseConfig;
}

export const config = getEnvironmentConfig();
