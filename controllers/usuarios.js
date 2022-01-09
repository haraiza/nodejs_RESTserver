const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        page,
        limit
    });
}


const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña (HASH)
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guarda en MongoDB
    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
}


const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controlador'
    });
}


const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};