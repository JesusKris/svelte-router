import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import svelte from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

export default {
  input: 'src/index.ts', // Entry file for your library
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm', // ES module output
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs', // CommonJS output
      sourcemap: true,
    },
  ],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(), // Add preprocessing for Svelte
      emitCss: false, // Recommended for library builds
    }),
    resolve({
      browser: true, // Ensures browser compatibility
      dedupe: ['svelte'], // Avoid duplicate Svelte imports
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json', // Explicitly point to your tsconfig.json
      sourceMap: true, // Ensure sourcemaps are generated
      declaration: true, // Emit TypeScript declarations
      declarationDir: 'dist', // Save declarations in the dist directory
      rootDir: 'src', // Set root directory for TypeScript
    }),
  ],
  external: ['svelte'], // Mark Svelte as an external dependency
};
