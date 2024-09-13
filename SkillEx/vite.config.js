import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [nodePolyfills({}), react(),],
    server: {
        port: 3000,
        open: '/',
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
    },
    define: {
        global: {}
    },

})
