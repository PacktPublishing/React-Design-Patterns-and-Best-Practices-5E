import { useState, useEffect } from 'react';
import { config } from '@/config/environment';

interface FeatureFlags {
  newDashboard: boolean;
  experimentalEditor: boolean;
  advancedAnalytics: boolean;
}

interface FeatureFlagResult {
  flags: FeatureFlags;
  hasError: boolean;
}

function buildFallbackFlags(): FeatureFlags {
  return {
    newDashboard: config.features.enableBetaFeatures,
    experimentalEditor: config.features.enableBetaFeatures,
    advancedAnalytics: config.features.enableAnalytics,
  };
}

export function useFeatureFlags(): FeatureFlagResult {
  const [flags, setFlags] = useState<FeatureFlags>({
    newDashboard: false,
    experimentalEditor: false,
    advancedAnalytics: false,
  });
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function fetchFlags() {
      try {
        const response = await fetch(`${config.apiUrl}/feature-flags`);
        if (!response.ok) {
          throw new Error(`Failed to fetch feature flags: ${response.status}`);
        }

        const data = (await response.json()) as FeatureFlags;
        setFlags(data);
        setHasError(false);
      } catch (error) {
        console.error('Failed to fetch feature flags:', error);
        setFlags(buildFallbackFlags());
        setHasError(true);
      }
    }

    fetchFlags();
  }, []);

  return { flags, hasError };
}
