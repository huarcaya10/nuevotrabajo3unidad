const crypto = require('crypto');
const boom = require('@hapi/boom')

class PagosService{

    constructor(){
        this.pagos=[];
        this.generate(10);

    }

    async generate(limite){
        for (let index = 0; index < limite ; index ++)
        this.pagos.push({
                id: crypto.randomUUID(),
                tipoPago: 'pagos' + index,
                fechaPago: new Date(),
                montoPago: 10 + Math.floor(Math.random()*190),
                estadoPago: Math.random()<0.25
        })

    }

    async create(data){
    const nuevoPago = {
        id: crypto.randomUUID(),
        ...data
      };
      this.pagos.push(nuevoPago);
      return nuevoPago;

    }

    async find(){
    return this.pagos;
   }

   async findOne(id){
    const pago = this.pagos.find((pago) => {
      return pago.id === id;
    });
    if (!pago){//!product
      throw boom.notFound('pago not found');
    }
    return pago;
   }

   async update(id, changes){
    const index = this.pagos.findIndex(pago =>{
      return pago.id === id;
    });
    if (index === -1){
      throw boom.notFound('pago not found');
    }
    const pago = this.pagos[index];
    this.pagos[index] = {
      ...pago,
      ...changes
    };
    return this.pagos[index];
   }
   async delete(id){
    const index = this.pagos.findIndex(pago =>{
      return pago.id === id;
    });
    if (index === -1){
      throw boom.notFound('pago not found');
    }
    this.pagos.splice(index,1);
    return { id };
   }
  }

  module.exports= PagosService;
