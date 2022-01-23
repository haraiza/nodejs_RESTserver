const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: "No hay archivos que subir" });
  }

  try {
    // Para subit textos a la carpeta 'textos'
    //const pathCompleto = await subirArchivo(req.files, ["txt", "md"], "textos");

    // Para subit imagenes a la carpeta 'imgs'
    const pathCompleto = await subirArchivo(req.files, undefined, "imgs");
    res.json({
      nombre: pathCompleto,
    });
  } catch (err) {
    return res.status(400).json({
      msg: err,
    });
  }
};

module.exports = {
  cargarArchivo,
};
