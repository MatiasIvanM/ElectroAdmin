import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(async () => {
  const reactPlugin = (await import('@vitejs/plugin-react')).default;
  return {
    plugins: [reactPlugin()],
    base: process.env.BASE_PATH ?? '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
