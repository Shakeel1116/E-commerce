import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // Correct for Render's static site setup
  plugins: [react()],
  build: {
    outDir: 'dist', // Explicitly set output directory
  }
});