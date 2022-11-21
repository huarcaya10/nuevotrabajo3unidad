const Joi = require('joi');

const id = Joi.string()
              .uuid();
const comentario = Joi.string()
                   //.alphanum()
                   .min(3)
                   .max(30);
const idCliente = Joi.string()
                   .uuid();
const createcomentarioSchema = Joi.object({
  comentario: comentario.required(),
  idCliente: idCliente.required()
});

const updatecomentarioSchema = Joi.object({
  comentario: comentario,
  idCliente: idCliente
});

const getcomentarioSchema = Joi.object({
  id: id.required()
});

module.exports = {createcomentarioSchema, updatecomentarioSchema, getcomentarioSchema};



