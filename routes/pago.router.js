const express = require ('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const { getPagoSchema, createPagoSchema, updatePagoSchema } = require('../schemas/pago.schema');

const PagoService = require('../services/pago.service')
const service = new PagoService();

router.get('/', async (req, res) => {
  const pagos = await service.find();
    res.status(200).json(pagos);
  });


  router.get('/:id',
              validatorHandler(getPagoSchema, 'params'),
              async (req, res, next) => {
    try{
    const { id } = req.params;
    const pago = await service.findOne(id);
    res.status(200).json(pago);
    } catch(error){
      next(error);
    }
  });

router.post('/',
            validatorHandler(createPagoSchema, 'body'),
            async (req, res)=> {
  const body = req.body;
  const nuevoPago = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoPago
  });
});

router.patch('/:id',
              validatorHandler(getPagoSchema, 'params'),
              validatorHandler(updatePagoSchema, 'body'),
              async (req, res, next)=> {
  try {
    const { id } = req.params;
    const body = req.body;
    const pago = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      pago
    });

  } catch(error) {
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getPagoSchema, 'params'),
              async (req, res, next)=> {
  try {
  const { id }= req.params;
  const rta = await service.delete(id);
  res.json({
    message: 'eliminado',
    rta
  });
  }catch(error) {
    next(error);
  }
})
  module.exports= router;
