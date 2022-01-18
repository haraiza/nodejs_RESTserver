const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  try {
    await Usuario.findById(id);
  } catch (err) {
    throw new Error(`El id '${id}' no existe`);
  }
};

const existeCategoriaPorId = async (id) => {
  try {
    await Categoria.findById(id);
  } catch (err) {
    throw new Error(`El id '${id}' de categoria no existe`);
  }
};

const existeProductoPorId = async (id) => {
  try {
    await Producto.findById(id);
  } catch (err) {
    throw new Error(`El id '${id}' de producto no existe`);
  }
};

module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
};
