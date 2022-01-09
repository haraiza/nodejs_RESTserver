const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste } = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido), // Ahora el revisar en la base de datos se hace desde un helper especial

    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), //Esto es en caso de que el rol fuera necesario que este hardcodeado
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;