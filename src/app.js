const express = require('express');
const path = require('path');
const app = express();
const estudiantesRouter = require('./routes/estudiantes');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para servir el index.html desde la raíz del proyecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api/estudiantes', estudiantesRouter);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
