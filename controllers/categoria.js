const { Categoria } = require("../models/categoria");

//obtener todas las categorias paginadas y traeremos los datos del usuario que creo la categoria
const obtenerCategorias = (req, res) => {
  res.json({
    msg: "GET Categoria",
  });
};

//obtener una categoria por su id y los datos del usuario
const obtenerCategoria = (req, res) => {
  res.json({
    msg: "GET Categoria por id",
  });
};

//crear una categoria
const crearCategoria = (req, res) => {
  res.json({
    msg: "POST Categoria",
  });
};

//actualizar la categoria, validar el nombre
const actualizarCategoria = (req, res) => {
  res.json({
    msg: "PUT Categoria",
  });
};

//borrar la categoria
const borrarCategoria = (req, res) => {
  res.json({
    msg: "DELETE Categoria",
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
