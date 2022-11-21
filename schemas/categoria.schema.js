const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombre = Joi.string()//.alphanum()
                  .min(3)
                  .max(30);
const descripcion = Joi.string()
                  .min(3)
                  .min(50);

const createCategoriaSchema = Joi.object({
  nombre : nombre.required(),
  descripcion: descripcion.required()
});
const updateCategoriaSchema = Joi.object({
  nombre : nombre,
  descripcion: descripcion
});
const getCategoriaSchema = Joi.object({
  id : id.required()

});

module.exports = {createCategoriaSchema,updateCategoriaSchema,getCategoriaSchema}
