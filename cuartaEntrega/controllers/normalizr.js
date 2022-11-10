const { schema, normalize, denormalize } = require('normalizr') ;

const Normalizador = async (data) => {
      let pruebaData = {
            id: 'mensaje',
            mensaje: [],
      };


            pruebaData.mensaje.push({
                  id: data._id,
                  text: data.message,
                  date: data.date,
                  author: {
                        email: data.email,
                        nombre: data.nombre,
                        apellido: data.apellido,
                        edad: data.edad,
                        alias: data.alias,
                        avatar: data.avatar,
                  },
            });



      const authorScheme = new schema.Entity('author',{},{idAttribute: 'email'})

      const messageScheme = new schema.Entity('message',{
        author:authorScheme
      })
      const postScheme = new schema.Entity('posts', {
        text: [messageScheme]
      })
      const dataNormalized = normalize(data, postScheme)
      console.log('Data Normalized', JSON.stringify(dataNormalized).length)

    
      return dataNormalized;
};
module.exports=Normalizador