import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "sass";
import svgrPlugin from "vite-plugin-svgr";
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), svgrPlugin({
    svgrOptions: {
      icon: true, 
    },
  }),
],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        api: 'modern-compiler'
      },
    },
  },
  resolve: {
    alias: {
      '@' : resolve(__dirname, './src')
    },
  },
});
