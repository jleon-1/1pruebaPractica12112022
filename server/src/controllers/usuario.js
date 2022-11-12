const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers");

const usuariosGet = async (req = request, res = response) => {
   const { limite = 5, desde = 0 } = req.query;
   const query = { estado: true };

   const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
   ]);

   res.json({
      total,
      usuarios,
   });
};

const getEmpleados = async (req = request, res = response) => {
   const { limite = 5, desde = 0 } = req.query;
   const query = { estado: true, rol: "EMPLEADO_ROL" };

   const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
   ]);

   res.json({
      total,
      usuarios,
   });
};

const crearAsistente = async (req, res = response) => {
   const { nombre, correo, password } = req.body;
   const usuario = new Usuario({ nombre, correo, password, rol: 'RH_ROL' });

   // Encriptar la contraseña
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync(password, salt);

   // Guardar en BD
   await usuario.save();

   // Generar el JWT
   const token = await generarJWT(usuario.id);

   res.json({
      usuario,
      token,
   });
};

const crearEmpleado = async (req, res = response) => {
   const { nombre, correo, password, sueldo, prestamo } = req.body;
   const usuario = new Usuario({
      nombre,
      correo,
      password,
      rol: "EMPLEADO_ROL",
      sueldo,
      prestamo,
   });

   // Encriptar la contraseña
   const salt = bcryptjs.genSaltSync();
   usuario.password = bcryptjs.hashSync(password, salt);

   // Guardar en BD
   await usuario.save();

   // Generar el JWT
   const token = await generarJWT(usuario.id);

   res.json({
      usuario,
      token,
   });
};

module.exports = {
   usuariosGet,
   crearAsistente,
   crearEmpleado,
   getEmpleados,
};
