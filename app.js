// app.js
import express from 'express';
import simcardsRoutes from './src/routes/routes.js';

const app = express();
const port = 5000;

// Use built-in express.json() middleware for parsing JSON requests
app.use(express.json());

// Use simcardsRoutes for all routes starting with '/api'
app.use('/api', simcardsRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
