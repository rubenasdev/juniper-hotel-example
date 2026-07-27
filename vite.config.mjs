import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: { port: 5190, strictPort: true, host: '127.0.0.1', fs: { allow: ['C:/laragon/www/juniper-hotel', 'C:/tmp'] } },
};
