const express = require('express');
require('dotenv').config();
const { sequelize } = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: '¡Bienvenido a la API REST de Gestión de Productos!'
  });
});

// Rutas de la API
app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar base de datos e iniciar servidor
sequelize.sync()
  .then(() => {
    console.log(' Conexión y sincronización con SQL Server exitosa.');
    app.listen(PORT, () => {
      console.log(` Servidor API REST corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Error al sincronizar con la base de datos:', err);
  });