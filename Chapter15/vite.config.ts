import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';

const shouldAnalyze = process.env.ANALYZE === 'true';

const featureFlagsResponse = JSON.stringify({
  newDashboard: true,
  experimentalEditor: false,
  advancedAnalytics: true,
});

const mockFeatureFlagsPlugin: PluginOption = {
  name: 'mock-feature-flags-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/feature-flags', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(featureFlagsResponse);
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/feature-flags', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(featureFlagsResponse);
    });
  },
};

const plugins: PluginOption[] = [react(), mockFeatureFlagsPlugin];

if (shouldAnalyze) {
  plugins.push(
    visualizer({
      filename: 'bundle-report.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    }),
  );
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
