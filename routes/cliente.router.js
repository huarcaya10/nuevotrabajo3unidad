const express = require ('express');
const router = express.Router();

const clientesService =require('../services/clientes.service')
const service = new clientesService();

const  validatorHandler =  require('../middlewares/validator.handler');
const {createclienteSchema,updateclienteSchema,getclienteSchema} = require('../schemas/clientes.schema');


router.get('/', async (req, res) => {
  const clientes = service.find();
    res.status(200).json(clientes);
  });


  router.get('/:id',
              validatorHandler(getclienteSchema,'params'),
              async (req,res, next)=>{
  try{
    const { id }= req.params;
    const cliente = await service.findOne(id);
    res.status(200).json(cliente);
  }catch(error){
    next(error);
  }
});



router.post('/',
  validatorHandler(createclienteSchema,'body'),
  async (req,res)=>{
    const body = req.body;
    const nuevocliente = await service.create(body);
    res.status(201).json({
      message: 'creado',
      nuevocliente
    });
  })

router.patch('/:id',
  validatorHandler(getclienteSchema,'params'),
  validatorHandler(updateclienteSchema,'body'),
  async (req,res, next)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const cliente = await service.update(id, body);
      res.status(200).json({
        message: 'actualizado',
        cliente
      });
    }catch(error){
      next(error);
    }
  });


router.delete('/:id',
validatorHandler(getclienteSchema,'params'),
async (req,res, next)=>{
  try{
    const {id} = req.params;
    const cliente = await service.update(id);
    res.status(200).json({
      message: 'actualizado',
      cliente
    });
  }catch(error){
    next(error);
  }
});

module.exports= router;

