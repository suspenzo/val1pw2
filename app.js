const express = require('express');
require('dotenv').config();
const { sequelize } = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());

// Rutas de la API
app.use('/api/productos', productRoutes);

const PORT = process.env.PORT || 3000;

// Sincronizar base de datos e iniciar servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log(' Conexión y sincronización con SQL Server exitosa.');
    app.listen(PORT, () => {
      console.log(` Servidor API REST corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Error al sincronizar con la base de datos:', err);
  });