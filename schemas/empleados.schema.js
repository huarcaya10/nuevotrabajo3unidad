const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombre = Joi.string()//.alphanum()
                  .min(3)
                  .max(30);
const apellido = Joi.string()//.alphanum()
                  .min(3)
                  .max(30);
const telefono = Joi.number()
                  .integer()
                  .min(10);
const sueldo = Joi.number()
                  .integer()
                  .min(10);

const createEmpleadoSchema = Joi.object({
  nombre : nombre.required(),
  apellido : apellido.required(),
  telefono: telefono.required(),
  sueldo: sueldo.required()
});
const updatempleadoSchema = Joi.object({
  nombre : nombre,
  apellido: apellido,
  telefono: telefono,
  sueldo: sueldo
});
const getEmpleadoSchema = Joi.object({
  id : id.required()
});

module.exports = {createEmpleadoSchema,updatempleadoSchema,getEmpleadoSchema}
