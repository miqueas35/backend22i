const { response, request } = require("express");

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

const userPost = (req = request, res = response) => {
  const datos = req.body;

  res.json({
    msg: "POST - info creada",
    datos,
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
