import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // Ensures assets load properly on Render
  plugins: [react()],
  build: {
    outDir: 'dist', // Customize build output directory
    sourcemap: true, // Enable source maps for better debugging
  },
  server: {
    port: 3000, // Custom port for development server (optional)
    open: true, // Automatically open the app in the browser on start
  },
});
