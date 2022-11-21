const Joi = require('joi');

const id = Joi.string()
              .uuid();
const cantidad =Joi.number()
                  .integer()
                  .min(10);
const precio = Joi.number()
                  .integer()
                  .min(10);
const subtotal = Joi.number()
                  .integer()
                  .min(10);
const idVenta = Joi.string()
                  .uuid();
const idProduct = Joi.string()
                  .uuid();

const createDetalleSchema = Joi.object({
  cantidad : cantidad.required(),
  precio: precio.required(),
  subtotal: subtotal.required(),
  idVenta: idVenta.required(),
  idProduct: idProduct.required()
});
const updateDetalleSchema = Joi.object({
  cantidad : cantidad,
  precio: precio,
  subtotal: subtotal,
  idVenta: idVenta,
  idProduct: idProduct
});
const getDetalleSchema = Joi.object({
  id : id.required()
});

module.exports = {createDetalleSchema,updateDetalleSchema,getDetalleSchema}
