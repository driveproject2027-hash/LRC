import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Security Hardening: suppress technology stack disclosure
app.disable('x-powered-by');

// Standard Security Headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Defense-in-depth: Deny access to hidden dotfiles or path traversal patterns
app.use((req, res, next) => {
  const normalizedPath = path.normalize(req.path);
  if (normalizedPath.split('/').some(segment => segment.startsWith('.') && segment !== '' && segment !== '.well-known')) {
    return res.status(404).type('text/plain').send('Not Found');
  }
  next();
});

// Health check endpoint for container orchestrators / uptime monitoring
app.get('/health', (_req, res) => {
  res.status(200).type('text/plain').send('OK');
});

// Serve the static files from the Vite build directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, { dotfiles: 'deny' }));

// Handle React Router SPA fallback:
// Any request that doesn't match a static file in 'dist' will get index.html
// Restrict fallback strictly to safe retrieval methods (GET, HEAD).
// Disallow mutation methods (POST, PUT, DELETE, PATCH) on static/fallback routes.
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).type('text/plain').send('Method Not Allowed');
  }

  // Return 404 for missing static assets, file extensions, or API endpoints instead of SPA fallback
  const ext = path.extname(req.path);
  if (ext || req.path.startsWith('/assets/') || req.path.startsWith('/api/')) {
    return res.status(404).type('text/plain').send('Not Found');
  }

  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      next(err);
    }
  });
});

// Centralized error handler to avoid leaking stack traces or internal implementation details
app.use((err, _req, res, _next) => {
  res.status(500).type('text/plain').send('Internal Server Error');
});

// Hostinger's Node.js App sets the PORT environment variable.
// If it's not set, we default to 3000.
// Only listen directly when not imported in test suites
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
