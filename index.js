import express from 'express';
import cors from 'cors';
import errorHandler from './src/middlewares/error-handler.js';
import grupoRoutes from './src/routes/grupo.routes.js';
import claseRoutes from './src/routes/clase.routes.js';
import subclaseRoutes from './src/routes/subclase.routes.js';
import marcaRoutes from './src/routes/marca.routes.js';
//import modeloRoutes from './src/routes/modelo.routes.js';
import ubicacionRoutes from './src/routes/ubicacion.routes.js';
import unidadMedidaRoutes from './src/routes/unidadMedida.routes.js';
import responsableRoutes from './src/routes/responsable.routes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Grupo routes
app.use('/api/grupo', grupoRoutes);

// Clase routes
app.use('/api/clase', claseRoutes);

// Subclase routes
app.use('/api/subclase', subclaseRoutes);

// Marca routes
app.use('/api/marca', marcaRoutes);

// Modelo routes
//app.use('/api/modelo', modeloRoutes);

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