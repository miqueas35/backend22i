const { response, request } = require("express");

//importar modelo de usuario
const Usuario = require("../models/usuario");

//importar bcryptjs
const bcryptjs = require("bcryptjs");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query;

  /*  const usuarios = await Usuario.find().skip(desde).limit(limit);
  const total = await Usuario.countDocuments();
 */
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(),
    Usuario.find().skip(Number(desde)).limit(Number(limit)),
  ]);

  res.json({
    usuarios,
    total,
  });
};

const userPost = async (req = request, res = response) => {
  const datos = req.body;
  const { nombre, correo, password, rol } = datos;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar datos en la base de datos
  await usuario.save();

  res.json({
    usuario,
  });
};

const userPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { password, correo, google, ...resto } = req.body;

  //validar password contra la BD
  if (password) {
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //actualizo los datos
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    usuario,
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
