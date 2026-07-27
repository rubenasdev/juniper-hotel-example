import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default {
  plugins: [react({ jsxImportSource: '@juniper/i18n-runtime' })],
  resolve: { alias: { '@juniper/i18n-runtime': fileURLToPath(new URL('./src/i18n-runtime', import.meta.url)) } },
  server: { port: 5190, strictPort: true, host: '127.0.0.1', fs: { allow: ['C:/laragon/www/juniper-hotel', 'C:/tmp'] } },
};
