require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false, // Cambia a true si usas Azure o SSL
        trustServerCertificate: true // Permite certificados autofirmados en local
      }
    },
    logging: console.log // Muestra las consultas SQL en consola
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conexión a SQL Server establecida correctamente.');
  } catch (error) {
    console.error(' Error al conectar a la base de datos:', error);
  }
};

module.exports = { sequelize, testConnection };