export default {
  plugins: [],
  esbuild: { jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment', jsxInject: "import React from '/src/vendor/react.bundle.mjs'" },
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { port: 5190, strictPort: true, host: '127.0.0.1', fs: { allow: ['C:/laragon/www/juniper-hotel', 'C:/tmp'] } },
};
