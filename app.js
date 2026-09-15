const express = require('express');
const { sequelize, testConnection } = require('./database');

const app = express();
app.use(express.json());

// Probar conexión a la BD
testConnection();

// Sincronizar modelos (opcional, crea tablas si no existen)
sequelize.sync({ force: false })
  .then(() => console.log('Base de datos sincronizada.'))
  .catch((err) => console.error('Error al sincronizar:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});