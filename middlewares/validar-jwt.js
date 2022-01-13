const { response, request } = require('express');

const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    // Si no tiene token no puede continuar
    if (!token) { return res.status(401).json({ msg: 'No hay token en la petición' }) }


    try {
        // Revisa que el token sea valido. 
        // El uid es del usuario que se quiere borrar
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);


        // Leer el usuario que esta logeado (usuarioAutenticado)
        const usuario = await Usuario.findById(uid);


        // Revisa que el usuario exista en DB
        if (!usuario) {
            return res.status(401).json({ msg: `Token no valido - Usuario no existe en DB` });
        }


        // Verificar si el uid tiene estado en true 
        if (!usuario.estado) {
            return res.status(401).json({ msg: `Token no valido - Usuario con estado: 'false'` });
        }

        req.usuario = usuario;
        next();

    } catch (err) {

        console.log(err);
        res.status(401).json({ msg: 'Token no valido' })
    }
    console.log(`El token es ${token}`);

}

module.exports = {
    validarJWT
}