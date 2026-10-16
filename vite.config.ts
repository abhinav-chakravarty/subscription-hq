import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({ plugins: [react(), tailwindcss(), VitePWA({ injectRegister: null, registerType: 'prompt', manifest: { name: 'Subscription HQ', short_name: 'Sub HQ', start_url: '/', scope: '/', display: 'standalone', theme_color: '#123a2a', background_color: '#f5f7f5', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] }, workbox: { navigateFallback: '/index.html', globPatterns: ['**/*.{js,css,html,svg,png,ico}'], runtimeCaching: [] } })] })
