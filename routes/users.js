const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste } = require("../helpers/db-validators");
const {
  usersGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener como mínimo 6 caracteres"
    ).isLength({ min: 6, max: 12 }),
    check("correo", "No es un correo válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  userPost
);

router.put("/:id", userPut);

router.delete("/:id", userDelete);

module.exports = router;
