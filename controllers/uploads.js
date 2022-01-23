const { response } = require("express");
const path = require("path");

const cargarArchivo = (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json("No hay archivos que subir");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  const { archivo } = req.files;
  const uploadPath = path.join(__dirname, "../uploads/", archivo.name);

  // Use the mv() method to place the file somewhere on your server
  archivo.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ err });

    res.json({ msh: "El arhcivo se subio a " + uploadPath });
  });
};

module.exports = {
  cargarArchivo,
};
