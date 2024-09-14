import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [nodePolyfills({ include: ['crypto'], globals: { global: true } }), react(),],
    server: {
        port: 3000,
        open: '/',
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
    },
    // define: {
    //     global: {}
    // },
    build: {
        rollupOptions: {
            output: {
                globals: { crypto: 'crypto' },
            },
            external: ['crypto'],
            plugins: [nodeResolve({ preferBuiltins: true })],
        },
    },

})
