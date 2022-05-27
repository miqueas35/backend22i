const { Router } = require("express");

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

//para validar si viene el archivo
const { validarArchivo } = require("../middlewares/validar-archivos");

//middleware creado por mi para validar la extension del archivo
const { validarExtension } = require("../middlewares/validar-extension");

//controlador que permite subir la imagen
const { actualizarImagenCloudinary } = require("../controllers/uploads");

//validar colecciones permitidas (usuarios, porductos) para guardar la imagen
const { coleccionesPermitidas } = require("../helpers/db-validators");

const router = Router();

router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    validarExtension,
    check("id", "El id debe ser de Mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagenCloudinary
);
module.exports = router;
