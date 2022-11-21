const Joi = require('joi');

const id = Joi.string()
              .uuid();
const fechaVenta = Joi.date();
const fechaEntrega = Joi.date();
const costoTotal = Joi.number()
                  .integer()
                  .min(10);
const delivery = Joi.string()
                  .min(3)
                  .max(30);
const idCliente = Joi.string();
 const idPago = Joi.string();

const createVentaSchema = Joi.object({
  fechaVenta : fechaVenta.required(),
  fechaEntrega: fechaEntrega.required(),
  costoTotal: costoTotal.required(),
  delivery: delivery.required(),
  idCliente: idCliente.required(),
  idPago: idPago.required(),
});
const updateVentatSchema = Joi.object({
  fechaVenta : fechaVenta,
  fechaEntrega: fechaEntrega,
  costoTotal: costoTotal,
  delivery: delivery,
  idCliente: idCliente,
  idPago: idPago
});
const getVentaSchema = Joi.object({
  id : id.required()
});

module.exports = {createVentaSchema,updateVentatSchema,getVentaSchema,}
