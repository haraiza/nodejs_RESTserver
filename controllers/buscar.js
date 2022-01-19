const { response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = ["categoria", "productos", "roles", "usuarios"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    res.json({
      results: [usuario],
    });
  } else {
    res.json({ results: "No es usuario de Mongo" });
  }
};

const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      break;
    case "productos":
      break;
    default:
      res.status(500).json({
        msg: "Se me olvido hacer esa busqueda",
      });
      break;
  }
};
module.exports = {
  buscar,
};
