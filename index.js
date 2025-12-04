import express from 'express';
import cors from 'cors';
import errorHandler from './src/middlewares/error-handler.js';
import grupoRoutes from './src/routes/grupo.routes.js';
import marcaRoutes from './src/routes/marca.routes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Grupos routes
app.use('/api/grupos', grupoRoutes);

// Marcas routes
app.use('/api/marcas', marcaRoutes);

// Test routes
app.get('/', (req, res) => {
    res.send('The Backend is running!');
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});