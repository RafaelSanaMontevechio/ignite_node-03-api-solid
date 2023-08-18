import { defineConfig } from 'vitest/config';
import tsconsfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconsfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
  },
});
