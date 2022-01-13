const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');
const { esAdminRol } = require('../middlewares/validar-roles');


const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido), // Ahora el revisar en la base de datos se hace desde un helper especial
        validarCampos
    ],
    usuariosPut);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser mas de 6 letras').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('rol').custom(esRolValido),
        validarCampos
    ],
    usuariosPost);

router.delete('/:id',
    [
        validarJWT,
        esAdminRol,
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ],
    usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;