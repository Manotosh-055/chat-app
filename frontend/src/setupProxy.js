const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      //target: 'https://chat-app-backend-indol-chi.vercel.app',
      changeOrigin: true,
    })
  );
};