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

// Grupo routes
app.use('/api/grupo', grupoRoutes);

// Marca routes
app.use('/api/marca', marcaRoutes);

// Ubicacion routes
app.use('/api/ubicacion', ubicacionRoutes);

// UnidadMedida routes
app.use('/api/unidadMedida', unidadMedidaRoutes);

// Responsable routes
app.use('/api/responsable', responsableRoutes);

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