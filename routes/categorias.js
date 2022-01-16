const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria } = require("../controllers/categorias");

const { validarJWT } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//! {{url}}/api/categorias
// * Obtener todas las categorias - publico
router.get("/", (req, res) => {
  res.json("get");
});

// * Obtener una categoria - publico
router.get("/:id", (req, res) => {
  res.json("get - id");
});

// * Crear categoria - privado - cualquier con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// * Actualizar - privado - cualquier con un token valido
router.put("/:id", (req, res) => {
  res.json("put");
});

// * Borrar una categoria - privado - ADMIN
router.delete("/:id", (req, res) => {
  res.json("delete");
});

module.exports = router;
