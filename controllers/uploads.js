const { response } = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const cargarArchivo = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json("No hay archivos que subir");
  }

  const { archivo } = req.files;

  const nombreCortado = archivo.name.split(".");
  const extension = nombreCortado[nombreCortado.length - 1];

  // Validar la extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];

  if (!extensionesValidas.includes(extension)) {
    return res.status(400).json({ msg: "La extension no es valida" });
  }

  const nombreTemp = uuidv4() + "." + extension;
  const uploadPath = path.join(__dirname, "../uploads/", nombreTemp);

  archivo.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ err });

    res.json({ msh: "El arhcivo se subio a " + uploadPath });
  });
};

module.exports = {
  cargarArchivo,
};
