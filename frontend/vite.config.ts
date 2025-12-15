import react from '@vitejs/plugin-react-swc';
import {defineConfig, loadEnv} from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {

	const env = loadEnv(mode, process.cwd(), '')
	//<editor-fold desc="vite.config.ts >  - line 10 at 15/12/2025 01:01:03">
	console.group('vite.config.ts > envs - line 10 at 15/12/2025 01:01:03');
	console.debug(env);
	console.groupEnd();
	//</editor-fold>

	return {
		define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV)
		},
		base: process.env.NODE_ENV === 'production'
			? '/CinefiloDelCazzo/'
			: '/',
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern',
				},
			},
		},
		plugins: [
			// Allows using React dev server along with building a React application with Vite.
			// https://npmjs.com/package/@vitejs/plugin-react-swc
			react(),
			// Allows using the compilerOptions.paths property in tsconfig.json.
			// https://www.npmjs.com/package/vite-tsconfig-paths
			tsconfigPaths(),
			// Creates a custom SSL certificate valid for the local machine.
			// Using this plugin requires admin rights on the first dev-mode launch.
			// https://www.npmjs.com/package/vite-plugin-mkcert
			process.env.HTTPS && mkcert(),
		],
		build: {
			target: 'esnext',
			minify: 'terser',
			outDir: 'dist',
			sourcemap: false,
			assetsDir: 'assets',
			rollupOptions: {
				output: {
					assetFileNames: 'assets/[name]-[hash][extname]',
					chunkFileNames: 'assets/[name]-[hash].js',
					entryFileNames: 'assets/[name]-[hash].js'
				}
			}
		},
		publicDir: './public',
		server: {
			// Exposes your dev server and makes it accessible for the devices in the same network.
			host: '0.0.0.0', // Important for Render
			allowedHosts: ['cinefilodelcazzo.onrender.com', 'cinefilodelcazzo.netlify.app']
		},
	}
})
