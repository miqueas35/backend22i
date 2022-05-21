const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoria");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", obtenerCategorias);

router.get("/:id", obtenerCategoria);

router.post("/", crearCategoria);

router.put("/:id", actualizarCategoria);

router.delete("/:id", borrarCategoria);

module.exports = router;
