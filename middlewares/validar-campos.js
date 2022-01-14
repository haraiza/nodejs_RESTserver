const { validationResult } = require("express-validator");

// El next es para cuando se usa un middleware. Asi le decimos que continue con el siguiente middleware
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  validarCampos,
};
