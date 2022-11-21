const express = require('express');
const router = express.Router();

const validatorHandler =require('../middlewares/validator.handler');
const {createVentaSchema,updateVentaSchema,getVentaSchema} = require('../schemas/venta.schema')

const VentaService = require('../services/venta.service')
const service = new VentaService();

router.get('/', async (req,res)=>{
  const ventas = await service.find();
  res.status(200).json(ventas);
});

router.get('/:id',
              validatorHandler(getVentaSchema,'params'),
              async (req,res, next)=>{
  try{
    const { id }= req.params;
    const venta = await service.findOne(id);
    res.status(200).json(venta);
  }catch(error){
    next(error);
  }
});

router.post('/',
             validatorHandler(createVentaSchema,'body'),
              async (req,res)=>{
  const body = req.body;
  const nuevoVenta = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevoVenta
  });
})
router.patch('/:id',
                validatorHandler(getVentaSchema,'params'),
                validatorHandler(updateVentaSchema,'body'),
                async (req,res, next)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const venta = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      venta
    });
  }catch(error){
    next(error);
  }
});

router.delete('/:id',
                  validatorHandler(updateVentaSchema,'params'),
                  async (req,res, next)=>{
  try{
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json({
      message: 'eliminado',
      rta
    });
  }catch(error){
    next(error);
  }
});

module.exports = router;
