import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  console.log(command, mode, env.APP_ENV);
  return {
    envPrefix: 'APP_',
    define: {
      'process.env.NODE_ENV': JSON.stringify(env.APP_ENV),
    },
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.js'),
        name: 'Hello',
        format: ['iife'],
        fileName: 'hello',
      },
    },
    resolve: {
      alias: {
        find: /^~.+/,
        replacement: (val) => val.replace(/^~/, ''),
      },
    },
  };
});
