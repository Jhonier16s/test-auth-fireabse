const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
});

module.exports = withPWA({
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // Otros valores de configuración de Next.js van aquí
});
