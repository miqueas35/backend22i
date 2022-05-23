const { response } = require("express");
const Categoria = require("../models/categoria");

//obtener todas las categorias paginadas y traeremos los datos del usuario que creo la categoria
const obtenerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate("usuario", "nombre correo"),
  ]);

  res.json({
    total,
    categorias,
  });
};

//obtener una categoria por su id y los datos del usuario
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findById(id).populate(
    "usuario",
    "nombre correo"
  );

  res.json({
    categoria,
  });
};

//crear una categoria
const crearCategoria = async (req, res = response) => {
  //validar si no hay otra categoria igual
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  //generar la data para guardar en la BD
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //grabar en la BD
  await categoria.save();
  res.status(201).json(categoria);
};

//actualizar la categoria, validar el nombre
const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();
  const usuario = req.usuario._id;

  const data = {
    nombre,
    usuario,
  };

  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  res.status(201).json(categoria);
};

//borrar la categoria
const borrarCategoria = async (req, res) => {
  const { id } = req.params;

  const categoriaBorrada = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    categoriaBorrada,
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
