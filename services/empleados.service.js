const crypto = require('crypto');
const boom = require('@hapi/boom')

class EmpleadosService{

    constructor(){
        this.empleados=[];
        this.generate(10);

    }

    async generate(limite){
        for (let index = 0; index < limite ; index ++)
        this.empleados.push({
                id: crypto.randomUUID(),
                nombre: 'empleados' + index,
                apellido: 'empleados' + index,
                telefono: 10 + Math.floor(Math.random()*190),
                sueldo: 10 + Math.floor(Math.random()*190)
        })

    }

    async create(data){
    const nuevoEmpleado = {
        id: crypto.randomUUID(),
        ...data
      };
      this.empleados.push(nuevoEmpleado);
      return nuevoEmpleado;

    }

    async find(){
    return this.empleados;
   }

  async findOne(id){
      const empleado =    this.empleados.find(empleado => {
        return empleado.id === id;
     });
  if (!empleado){
  throw boom.notFound('empleado not found');
    }
    return empleado;
   }

   async update(id, changes){
    const index = this.empleados.findIndex(empleado =>{
        return empleado.id === id;
      });
      if (index === -1){
        throw boom.notFound('empleado not found');
      }
      const empleado = this.empleados[index];
      this.empleados[index] = {
        ...empleado,
        ...changes
      };
      return this.empleados[index];
   }
   async delete(id){
    const index = this.empleados.findIndex(empleado =>{
        return empleado.id === id;
      });
      if (index === -1){
        throw boom.notFound('empleado not found');
      }
      this.empleados.splice(index,1);
      return { id };
   }
  }

  module.exports= EmpleadosService;

