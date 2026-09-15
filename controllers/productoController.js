const Product = require('../models/Product');
const { Op } = require('sequelize');

// 1. Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

// 2. Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
  }
};

// 3. Buscar productos por nombre (query param: /api/productos/search?nombre=laptop)
exports.searchProducts = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ message: 'Debe ingresar un término de búsqueda' });
    }

    const products = await Product.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`
        }
      }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error en la búsqueda', error: error.message });
  }
};

// 4. Registrar un nuevo producto (POST)
exports.createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || precio === undefined) {
      return res.status(400).json({ message: 'El nombre y precio son obligatorios' });
    }

    const newProduct = await Product.create({
      nombre,
      descripcion,
      precio,
      stock
    });

    res.status(201).json({ message: 'Producto creado exitosamente', data: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el producto', error: error.message });
  }
};

// 5. Actualizar un producto existente (PUT)
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.update({
      nombre: nombre !== undefined ? nombre : product.nombre,
      descripcion: descripcion !== undefined ? descripcion : product.descripcion,
      precio: precio !== undefined ? precio : product.precio,
      stock: stock !== undefined ? stock : product.stock
    });

    res.status(200).json({ message: 'Producto actualizado exitosamente', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// 6. Eliminar un producto (DELETE)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Producto eliminado correctamente de SQL Server' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};