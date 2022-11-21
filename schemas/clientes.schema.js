const Joi = require('joi');

const id = Joi.string()
              .uuid();
const nombrec = Joi.string()
                   //.alphanum()
                   .min(3)
                   .max(15);
const apellidoc = Joi.string()
                   .min(3)
                   .max(15);
const telefonoc = Joi.number()
                   .integer()
                   .min(10);
const DNI = Joi.number()
                   .integer()
                   .min(10);


const createclienteSchema = Joi.object({
  nombrec: nombrec.required(),
  apellidoc: apellidoc.required(),
  telefonoc: telefonoc.required(),
  DNI: DNI.required()
});

const updateclienteSchema = Joi.object({
  nombrec: nombrec,
  apellidoc: apellidoc,
  telefonoc: telefonoc,
  DNI: DNI
});

const getclienteSchema = Joi.object({
  id: id.required()
});

module.exports = {createclienteSchema, updateclienteSchema, getclienteSchema};



