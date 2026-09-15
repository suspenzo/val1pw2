const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Búsqueda por query params (Debe ir antes de /:id para no entrar en conflicto)
router.get('/search', productController.searchProducts);

// Endpoints REST
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;