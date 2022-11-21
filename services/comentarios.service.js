const crypto = require('crypto');
const boom = require('@hapi/boom');

class comentariosService{

    constructor(){
        this.comentarios=[];
        this.generate(10);

    }

    async generate(limite){
        for (let index = 0; index < limite ; index ++)
        this.comentarios.push({
                id: crypto.randomUUID(),
                comentario: 'comentario' + index,
                idCliente: crypto.randomUUID()
        })

    }

    async  create(data){
    const nuevocomentario = {
        id: crypto.randomUUID(),
        ...data
      };
      this.comentarios.push(nuevocomentario);
      return nuevocomentario;

    }

    async find(){
    return this.comentarios;
   }

   async findOne(id){
    const comentario = this.comentarios.find((comentario) => {
      return comentario.id === id;
    });
    if (!comentario){
      throw boom.notFound('Comentario no encontrado');
    }
    return comentario;
  }

  async  update(id, changes){
    const index = this.comentarios.findIndex(comentario =>{
        return comentario.id === id;
      });
      if (index === -1){
        throw boom.notFound('Comentario no encontrado');
      }
      const comentario = this.comentarios[index];
      this.comentarios[index] = {
        ...comentario,
        ...changes
      };
      return this.comentarios[index];
   }


   async  delete(id){
    const index = this.comentarios.findIndex(comentario =>{
        return comentario.id === id;
      });
      if (index === -1){
        throw boom.notFound('Comentario no encontrado');
      }
      this.comentarios.splice(index,1);
      return { id };
   }
  }

  module.exports= comentariosService;
