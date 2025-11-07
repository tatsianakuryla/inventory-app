import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '');
  const apiUrl = environment.VITE_API_URL || 'https://localhost:3000/api';
  const target = apiUrl.replace(/\/api$/, '');

  return {
    plugins: [react()],
    server: {
      host: 'localhost',
      port: 5173,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, './certificates/localhost+2-key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, './certificates/localhost+2.pem')),
      },
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
