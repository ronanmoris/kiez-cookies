import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Resolve the @/* alias from tsconfig.json.
  resolve: { tsconfigPaths: true },
  test: {
    // Pure domain functions only for now; switch to 'jsdom' (plus @testing-library/react) when testing components.
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
  },
});
