const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const { validarJWT, validarCampos } = require("../middlewares");

const router = Router();

//! {{url}}/api/categorias
// * Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// * Obtener una categoria - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

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
