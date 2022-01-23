const { response } = require("express");
const { models } = require("mongoose");

const cargarArchivo = (req, res = response) => {
  res.json({ msg: "Hola mundo" });
};

module.exports = {
  cargarArchivo,
};
