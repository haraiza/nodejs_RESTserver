const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    // Si no tiene token no puede continuar
    if (!token) { return res.status(401).json({ msg: 'No hay token en la petición' }) }


    try {
        // Revisa que el token sea valido
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.uid = uid;

    } catch (err) {

        console.log(err);
        res.status(401).json({ msg: 'Token no valido' })
    }
    console.log(`El token es ${token}`);
    next();
}

module.exports = {
    validarJWT
}