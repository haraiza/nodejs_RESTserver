const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([

        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
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


const usuariosPut = async (req, res = response) => {

    const { id } = req.params;

    //* Se deja fuera password y google. El correo se deja fuera de momento porque 
    //* sino se mostraria el error de 'Ese correo ya existe' 
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if (password) {
        // Encriptar la contraseña (HASH)
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    // Busca en la DB el id y le envia todos los datos de 'resto'
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}


const usuariosDelete = async (req, res = response) => {

    const { id } = req.params

    //! Borrado fisicamente - NO SE RECOMIENDA DE ESTA MANERA
    // const usuario = await Usuario.findByIdAndDelete(id);

    //* Borrado por estado
    const { nombre } = await Usuario.findByIdAndUpdate(id, { estado: false });


    res.json({
        msg: `El usuario '${nombre}' a sido eliminado`
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