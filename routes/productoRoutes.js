const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Búsqueda por query params (Debe ir antes de /:id para no entrar en conflicto)
router.get('/api/productos/buscar', productoController.searchproductos);

// Endpoints REST

router.get('/', productoController.getAllProducts);        // GET /api/productos
router.get('/:id', productoController.getProductById);    // GET /api/productos/5
router.post('/', productoController.createProduct);       // POST /api/productos
router.put('/:id', productoController.updateProduct);      // PUT /api/productos/5
router.delete('/:id', productoController.deleteProduct);   // DELETE /api/productos/5

module.exports = router;