const Categoria = require('./categoria');
const Rol = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');

module.exports = {
    Categoria,
    Rol,
    Server,
    Usuario
}

//! Tambien se puede hacer asi
// module.exports = require('./categoria');
// module.exports = require('./role');
// module.exports = require('./server');
// module.exports = require('./usuario');
