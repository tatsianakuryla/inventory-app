import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '');
  const apiUrl = environment.VITE_API_URL ?? 'https://localhost:3000';
  const target = apiUrl.replace(/\/api$/, '');

  return {
    plugins: [react(), mkcert()],
    server: {
      host: 'localhost',
      port: 5173,
      https: {},
      proxy: {
        '/api': { target, changeOrigin: true, secure: false },
      },
    },
  };
});
