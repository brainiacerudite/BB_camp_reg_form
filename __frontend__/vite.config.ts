// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Accessing the environment variable using process.env
const baseUrl = process.env.VITE_BASE_URL;

export default defineConfig({
  base: baseUrl,
  plugins: [react()],
});
