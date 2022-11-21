const crypto = require('crypto');
const boom = require('@hapi/boom')

class clientesService{
    constructor(){
        this.clientes=[];
        this.generate(10);

    }

    async generate(limite){
        for (let index = 0; index < limite ; index ++)
        this.clientes.push({
                id: crypto.randomUUID(),
                razonSocial: 'clientes' + index,
                nombre: 'clientes' + index,
                apellido: 'clientes' + index,
                telefono: 10 + Math.floor(Math.random()*190),
                DNI: 10 + Math.floor(Math.random()*190)

        })
    }

    async create(data){
        const nuevocliente = {
            id: crypto.randomUUID(),
            ...data
          };
          this.clientes.push(nuevocliente);
          return nuevocliente;

        }

    async find(){
        return this.clientes;
       }

    async findOne(id){
        const cliente = this.clientes.find((cliente) => {
          return cliente.id === id;
        });
        if (!cliente){//!product
          throw boom.notFound('cliente not found');
        }
        return cliente;
      }


    async update(id, changes){
    const index = this.clientes.findIndex(cliente =>{
        return cliente.id === id;
      });
      if (index === -1){
        throw boom.notFound('cliente not found');
      }
      const cliente = this.clientes[index];
      this.clientes[index] = {
        ...cliente,
        ...changes
      };
      return this.clientes[index];
   }
   async delete(id){
    const index = this.clientes.findIndex(cliente =>{
        return cliente.id === id;
      });
      if (index === -1){
        throw boom.notFound('cliente not found');
      }
      this.clientes.splice(index,1);
      return { id };
   }
}
module.exports=clientesService;
