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


module.exports = {
    esAdminRol
}