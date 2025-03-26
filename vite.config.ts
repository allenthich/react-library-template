/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import * as path from "node:path";

/**
 * Configuration
 */
const LIBRARY_NAME = "react-library-template";

/**
 * Directory
 */
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: `./node_modules/.vite/${LIBRARY_NAME}}`,
	plugins: [
		react(),
		dts({
			rollupTypes: true,
			entryRoot: "src",
			tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
		}),
	],
	build: {
		outDir: "dist",
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: "./src/lib/index.ts",
			name: LIBRARY_NAME,
			fileName: "index",
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ["es" as const],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: ["react", "react-dom", "react/jsx-runtime"],
		},
	},
	test: {
		watch: false,
		globals: true,
		environment: "jsdom",
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		reporters: ["default"],
		coverage: {
			reportsDirectory: `./coverage/${LIBRARY_NAME}}`,
			provider: "v8" as const,
		},
	},
}));
