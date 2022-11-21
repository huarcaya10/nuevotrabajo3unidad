const express = require ('express');
const router = express.Router();

const EmpleadosService = require('../services/empleados.service')
const service = new EmpleadosService();


const  validatorHandler =  require('../middlewares/validator.handler');
const {createEmpleadoSchema,updatempleadoSchema,getEmpleadoSchema} = require('../schemas/empleados.schema');


router.get('/', async (req, res) => {
  const empleados = service.find();
    res.status(200).json(empleados);
  });
router.get('/:id',
           validatorHandler(getEmpleadoSchema,'params'),
  async (req,res, next)=>{
try{
const { id }= req.params;
const empleado = await service.findOne(id);
res.status(200).json(empleado);
}catch(error){
next(error);
}
});


router.post('/',
  validatorHandler(createEmpleadoSchema,'body'),
  async (req,res)=>{
    const body = req.body;
    const nuevoEmpleado = await service.create(body);
    res.status(201).json({
      message: 'creado',
      nuevoEmpleado
    });
  })

router.patch('/:id',
  validatorHandler(getEmpleadoSchema,'params'),
  validatorHandler(updatempleadoSchema,'body'),
  async (req,res, next)=>{
    try{
      const {id} = req.params;
      const body = req.body;
      const empleado = await service.update(id, body);
      res.status(200).json({
        message: 'actualizado',
        empleado
      });
    }catch(error){
      next(error);
    }
  });


router.delete('/:id',
validatorHandler(getEmpleadoSchema,'params'),
async (req,res, next)=>{
  try{
    const {id} = req.params;
    const empleado = await service.update(id);
    res.status(200).json({
      message: 'actualizado',
      empleado
    });
  }catch(error){
    next(error);
  }
});

module.exports= router;

