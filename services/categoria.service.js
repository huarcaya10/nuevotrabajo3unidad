
const crypto = require('crypto');
const boom = require('@hapi/boom')


class CategoriaService{

  constructor(){
    this.categorias = [];
    this.generate(10);

  }
  async generate(limit){
    for (let index = 0; index < limit; index++){
      this.categorias.push({
        id: crypto.randomUUID(),
        nombre: 'categoria' + index,
        descripcion: 'descripción' + index
      });
    }
  }
  async create(data){
    const nuevoCategoria = {
      id: crypto.randomUUID(),
      ...data
    };
    this.products.push(nuevoCategoria);
    return nuevoCategoria;
  }
  async find(){
    return this.categorias;
  }
  async findOne(id){
    const categoria = this.categorias.find((catego) => {
      return catego.id === id;
    });
    if (!categoria){//!product
      throw boom.notFound('categoria not found');
    }
    return categoria;
  }
  async update(id, changes){
    const index = this.categorias.findIndex(catego =>{
      return catego.id === id;
    });
    if (index === -1){
      throw boom.notFound('categoria not found');
    }
    const categoria = this.categorias[index];
    this.categorias[index] = {
      ...categoria,
      ...changes
    };
    return this.categorias[index];
  }
  async delete(id){
    const index = this.categorias.findIndex(catego =>{
      return catego.id === id;
    });
    if (index === -1){
      throw boom.notFound('categroia not found');
    }
    this.categorias.splice(index,1);
    return { id };
  }
}
module.exports = CategoriaService;
