const { response, request } = require("express");
const { validationResult } = require("express-validator");

//importar modelo de usuario
const Usuario = require("../models/usuario");

//importar bcryptjs
const bcryptjs = require("bcryptjs");

const usersGet = (req = request, res = response) => {
  const { nombre = "No Name", apikey, limit = 5, page = 1 } = req.query;
  res.json({
    msg: "largando backend",
    nombre,
    apikey,
    limit,
    page,
  });
};

const userPost = async (req = request, res = response) => {
  //recibir la respuesta del check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const datos = req.body;
  const { nombre, correo, password, rol } = datos;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar el correo
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }
  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar datos en la base de datos
  await usuario.save();

  res.json({
    usuario,
  });
};

const userPut = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "PUT - info actualizada",
    id,
  });
};

const userDelete = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "DELETE - info eliminada",
    id,
  });
};

module.exports = {
  usersGet,
  userPost,
  userPut,
  userDelete,
};
