import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // Ensures assets load properly on Render
  plugins: [react()],
});
