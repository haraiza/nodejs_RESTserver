const { Router } = require("express");
const { check } = require("express-validator");
const {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProductos,
  obtenerProducto,
} = require("../controllers/productos");

const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/db-validators");

const { validarJWT, validarCampos, esAdminRol } = require("../middlewares");

const router = Router();

//! {{url}}/api/productos
// * Obtener todos los productos - publico
router.get("/", obtenerProductos);

// * Obtener un producto - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

// * Crear producto - privado - cualquier con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// * Actualizar - privado - cualquier con un token valido
router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un id de Mongo"),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// * Borrar una producto - privado - ADMIN
router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRol, // No pude hacer que validara el AdminRol
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
