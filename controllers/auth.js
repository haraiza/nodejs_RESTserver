const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");
const { json } = require("express/lib/response");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe con
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      token,
      usuario,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable conel administrador",
    });
  }
};

const googleSignIn = async (req, res = response, next) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);
    console.log(googleUser);

    res.json({
      msg: "Todo bien!",
      id_token,
      googleUser,
    });
  } catch (err) {
    json.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar",
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
