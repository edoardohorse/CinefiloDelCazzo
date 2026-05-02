import react from '@vitejs/plugin-react-swc';
import { defineConfig,loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(config=>{
    const env = loadEnv(config.mode, process.cwd(), '')

    const envToPrint = {}
    for(const e of Object.keys(env)){
        if(e.includes("VITE_")){
            envToPrint[e] = env[e]
        }
    }

    console.log(envToPrint)
    return {
        define: {
            __APP_ENV__: JSON.stringify(env)
        },
        base: '/',
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
            sourcemap: false
        },
        publicDir: './public',
        server: {
            // Exposes your dev server and makes it accessible for the devices in the same network.
            port: process.env.PORT || 10000,
            host: '0.0.0.0', // Important for Render
            allowedHosts: ['cinefilodelcazzo.onrender.com']
        }
    }
});
