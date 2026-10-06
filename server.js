import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static files from the Vite build directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Handle React Router SPA fallback: 
// Any request that doesn't match a static file in 'dist' will get index.html
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Hostinger's Node.js App sets the PORT environment variable.
// If it's not set, we default to 3000.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
