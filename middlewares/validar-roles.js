const { response } = require('express');

const esAdminRol = (req, res = response, next) => {

    // Esto obliga a que primero se valide el token
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const { rol, nombre } = req.usuario;

    // Un usuario que no sea 'ADMIN_ROL' sera rechazado por el middleware
    if (!rol !== 'ADMIN_ROL') {
        return res.status(401).json({ msg: `${nombre} no es administrador - No puede hacer esto` });
    }

    next();
}


// ...roles recibe X cantidad de roles desde el archivo routes.usuarios
const tieneRol = (...roles) => {


    return (req, res = response, next) => {

        // Esto es solo para comprobar que si recibe los parametros de tieneRol
        // El req.usuario.rol es el rol del usario que esta tratandod de ejecutar el borrado 
        console.log(roles, req.usuario.rol);


        // Esto obliga a que primero se valide el token
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }


        // Si el rol del que esta tratando de ejecutar este route.delete no esta en el listado, mandara error
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({ msg: `El servicio requiere uno de estos roles ${roles}` })
        }

        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}