import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import replace, { RollupReplaceOptions } from '@rollup/plugin-replace';

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: [
    'favicon.svg',
    'favicon.ico',
    'robots.txt',
    'apple-touch-icon.png'
  ],
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  base: '/',
  manifest: {
    name: 'Account Manager',
    short_name: 'AccMan',
    description:
      'Account manager is a web application that helps you keep track of your day to day financial activity. It even helps you understand your spending habits and make you better with your finances',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ]
  }
};

const replaceOptions: RollupReplaceOptions = {
  preventAssignment: true,
  __DATE__: new Date().toISOString()
};

pwaOptions.srcDir = 'src';
pwaOptions.filename = 'sw.ts';
pwaOptions.strategies = 'injectManifest';
(pwaOptions.manifest as Partial<ManifestOptions>).name = 'Account Manager';
(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'AccMan';

export default defineConfig({
  plugins: [
    reactRefresh(),
    svgr(),
    VitePWA(pwaOptions),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    replace(replaceOptions)
  ],
  server: { port: 1741, open: true }
});
