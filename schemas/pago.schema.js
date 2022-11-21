const Joi = require('joi');

const id = Joi.string()
              .uuid();
const tipoPago = Joi.string()
                   .min(3)
                   .max(15);
const fechaPago = Joi.string();
const montoPago = Joi.number()
                     .integer()
                     .min(10);

const createPagoSchema = Joi.object({
  tipoPago: tipoPago.required(),
  fechaPago: fechaPago.required(),
  montoPago: montoPago.required()
});

const updatePagoSchema = Joi.object({
  tipoPago: tipoPago,
  fechaPago: fechaPago,
  montoPago: montoPago
});

const getPagoSchema = Joi.object({
  id: id.required()
});

module.exports = {createPagoSchema, updatePagoSchema, getPagoSchema};


