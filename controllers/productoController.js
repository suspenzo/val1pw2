const Producto = require('../models/Producto');
const { Op } = require('sequelize');


// 1. Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

// 2. Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el producto', error: error.message });
  }
};

// 3. Buscar productos por nombre (query param: /api/productos/search?nombre=laptop)
exports.searchproductos = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ message: 'Debe ingresar un término de búsqueda' });
    }

    const productos = await Producto.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`
        }
      }
    });

    res.status(200).json(productos);
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

    const newProduct = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock, 
      estado: true 
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
    const { nombre, descripcion, precio, stock, estado } = req.body;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await producto.update({
      nombre: nombre !== undefined ? nombre : producto.nombre,
      descripcion: descripcion !== undefined ? descripcion : producto.descripcion,
      precio: precio !== undefined ? precio : producto.precio,
      stock: stock !== undefined ? stock : producto.stock,
      estado: estado !== undefined ? estado : producto.estado
    });

    res.status(200).json({ message: 'Producto actualizado exitosamente', data: producto });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// 6. Eliminar un producto (DELETE)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await producto.destroy();

    res.status(200).json({ message: 'Producto eliminado correctamente de SQL Server' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};