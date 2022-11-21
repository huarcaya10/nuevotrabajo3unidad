const crypto = require('crypto');
const boom = require('@hapi/boom');

class VentaService{

  constructor(){
    this.ventas = [];
    this.generate(10);

  }
 async  generate(limit){
    for (let index = 0; index < limit; index++){
      this.ventas.push({
        id: crypto.randomUUID(),
        nombre: 'venta' + index,
        fechaEntrega: new Date(),
        fechaVenta: new Date(),
        costoTotal: 10 + Math.floor(Math.random()*190),
        delivery: 'delivery' + index,
        idCliente: 'cliente' + index,
        idPago: 'pago' + index
      });
    }
  }
  async create(data){
    const nuevoVenta = {
      id: crypto.randomUUID(),
      ...data
    };
    this.ventas.push(nuevoVenta);
    return nuevoVenta;
  }
  async find(){
    return this.ventas;
  }
  async findOne(id){
    const venta =  this.ventas.find(venta => {
      return venta.id === id;
    });
    if (!venta){
     throw boom.notFound('venta not found');
    }
    return venta;
  }
  async update(id, changes){
    const index = this.ventas.findIndex(venta =>{
      return venta.id === id;
    });
    if (index === -1){
      throw boom.notFound('sale not found');
    }
    const venta = this.ventas[index];
    this.ventas[index] = {
      ...venta,
      ...changes
    };
    return this.ventas[index];
  }
  async  delete(id){
    const index = this.ventas.findIndex(venta =>{
      return venta.id === id;
    });
    if (index === -1){
      throw boom.notFound('sale not found');
    }
    this.ventas.splice(index,1);
    return { id };
  }
}
module.exports = VentaService;
