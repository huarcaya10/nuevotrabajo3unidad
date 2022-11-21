const crypto = require('crypto');
const boom = require('@hapi/boom')

class DetalleventaService{

  constructor(){
    this.detalleventa = [];
    this.generate(10);

  }
  async generate(limit){
    for (let index = 0; index < limit; index++){
      this.detalleventa.push({
        id: crypto.randomUUID(),
        cantidad: 10 + Math.floor(Math.random()*190),
        precio: 10 + Math.floor(Math.random()*190),
        subtotal: 10 + Math.floor(Math.random()*190),
        idVenta: crypto.randomUUID(),
        idProduct: crypto.randomUUID()
      });
    }
  }
  async create(data){
    const nuevodetalleventa = {
      id: crypto.randomUUID(),
      ...data
    };
    this.detalleventa.push(nuevodetalleventa);
    return nuevodetalleventa;
  }
  async find(){
    return this.detalleventa;
  }

  async findOne(id){
    const detalledeventas = this.detalleventa.find((detalle) => {
      return detalle.id === id;
    });
    if (!detalledeventas){//!detalledeventas
      throw boom.notFound('detalle not found');
    }
    return detalledeventas;
  }
  async update(id, changes){
    const index = this.detalleventa.findIndex(detalle =>{
      return detalle.id === id;
    });
    if (index === -1){
      throw boom.notFound('detalle not found');
    }
    const detalles= this.detalleventa[index];
    this.detalleventa[index] = {
      ...detalles,
      ...changes
    };
    return this.detalleventa[index];
  }
  async delete(id){
    const index = this.detalleventa.findIndex(detalle =>{
      return detalle.id === id;
    });
    if (index === -1){
      throw boom.notFound('detalle not found');
    }
    this.detalleventa.splice(index,1);
    return { id };
  }
}
module.exports = DetalleventaService;
