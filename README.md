# Vite the new generation packaging and build tool

## Vite basic configuration

```javascript
// vite.config.js

// Config Intellisense
/** @type {import('vite').UserConfig} */
export default {
  // ...
}


//Or

//defineConfig helper which should provide intellisense without the need for jsdoc annotations:
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})

```

## ENV file and configuration

Using Environment Variables in Config

```javascript
import { defineConfig, loadEnv } from 'vite';
export default defineConfig(({ command, mode }) => {
    
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '')
    return {
        // vite config
        define: {
            **APP_ENV**: JSON.stringify(env.APP_ENV),
        },
        envPrefix: 'APP_',
    }
})
```

## Vite lib(s) creation + node packaging 

```javascript
// vite.config.js
    build: {
      lib: {
        entry: [
          resolve(__dirname, 'src/main.js'),
          resolve(__dirname, 'src/log/log.js'),
        ],
        name: 'Hello',
        format: ['iife'],
        fileName: (format, name) => {
          if (format === 'es') {
            return `${name}.js`;
          }

          return `${name}.${format}`;
        },
      },
    }

```


```json
// package.json
{
 "version": "1.0.0",
  "type": "module",
  "main": "./dist/main.cjs",
  "module": "./dist/main.js",
  "exports": {
    ".": {
      "import": "./dist/main.js",
      "require": "./dist/main.cjs"
    },
    "./log" : {
      "import": "./dist/log.js",
      "require": "./dist/log.cjs"
    }
  }
}
```


