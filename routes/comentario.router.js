const express = require ('express');
const router = express.Router();

const validatorHandler = require('../middlewares/validator.handler');
const { getcomentarioSchema, createcomentarioSchema, updatecomentarioSchema } = require('../schemas/comentarios.schema');

const PagoService = require('../services/comentarios.service')
const service = new PagoService();

router.get('/', async (req, res) => {
  const comentarios = await service.find();
    res.status(200).json(comentarios);
  });


  router.get('/:id',
              validatorHandler(getcomentarioSchema, 'params'),
              async (req, res, next) => {
    try{
    const { id } = req.params;
    const comentario = await service.findOne(id);
    res.status(200).json(comentario);
    } catch(error){
      next(error);
    }
  });

router.post('/',
            validatorHandler(createcomentarioSchema, 'body'),
            async (req, res)=> {
  const body = req.body;
  const nuevocomentario = await service.create(body);
  res.status(201).json({
    message: 'creado',
    nuevocomentario
  });
});

router.patch('/:id',
              validatorHandler(getcomentarioSchema, 'params'),
              validatorHandler(updatecomentarioSchema, 'body'),
              async (req, res, next)=> {
  try {
    const { id } = req.params;
    const body = req.body;
    const comentario = await service.update(id, body);
    res.status(200).json({
      message: 'actualizado',
      comentario
    });

  } catch(error) {
    next(error);
  }
});

router.delete('/:id',
              validatorHandler(getcomentarioSchema, 'params'),
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


