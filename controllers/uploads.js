const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "No hay archivos que subir" });
  }
  try {
    const pathCompleto = await subirArchivo(req.files);
    res.json({
      nombre: pathCompleto,
    });
  } catch (err) {
    return res.json({
      msg: err,
    });
  }
};

module.exports = {
  cargarArchivo,
};
