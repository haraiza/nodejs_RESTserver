const { Router } = require("express");
const { check } = require("express-validator");
const {
  actualizarCategoria,
  borrarCategoria,
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const { validarJWT, validarCampos, esAdminRol } = require("../middlewares");

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
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// * Borrar una categoria - privado - ADMIN
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
