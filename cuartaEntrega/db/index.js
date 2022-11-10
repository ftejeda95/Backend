
const {faker} = require('@faker-js/faker/locale/es');
const fs = require('fs')
const knex = require('knex')

const optionsMariaDB= {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        database : 'productos_web_socket'
      }
}

const optionsSqlite3 = {
  client: 'sqlite3',
  connection: {
    filename: './ecommerce.sqlite'
  },
}

const knexInstance = knex(optionsMariaDB)

// USO DE MARIA DB
 async function createTable() {
    const knexInstance = knex(optionsMariaDB)
    try {
      const exist = await knexInstance.schema.hasTable('productos')
      if(exist) {
        console.log('La tabla productos ya existe.')
        return
      }
      await knexInstance.schema.createTable('productos', (table) => {
        table.increments('id').notNullable()
        table.string('title', 25).notNullable()
        table.float('price').notNullable()
        table.string('thumbnail',250).notNullable()
        table.primary('id')
      })
      console.log('Tabla productos creada.')
    } catch (error) {
      console.error(error.message)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }
  
   async function insertProducts(products) {
    const knexInstance = knex(optionsMariaDB)
    try {
      await knexInstance('productos').insert(products)
      console.log('Productos creados con exito')

    } catch (error) {
      console.error(error)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }
  
   async function getProducts() {
    const knexInstance = knex(optionsMariaDB)
    try {
      const rows = await knexInstance('productos').select('*')
      console.log('Productos encontrados:', rows.length)
      return rows
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }

  //// USO DE SQLITE

  async function createTableMessagge() {
    const knexInstance = knex(optionsSqlite3)
    try {
      const exist = await knexInstance.schema.hasTable('messagge')
      if(exist) {
        console.log('La tabla messagge ya existe.')
        return
      }
      await knexInstance.schema.createTable('messagge', (table) => {
        table.string('email', 50).notNullable()
        table.string('message',250).notNullable()
        table.string('nombre',250).notNullable()
        table.string('apellido',250).notNullable()
        table.string('edad',250).notNullable()
        table.string('alias',250).notNullable()
        table.string('avatar',250).notNullable()
        table.string('date').notNullable()
      })
      console.log('Tabla messagge creada.')
    } catch (error) {
      console.error(error.message)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }
  async function insertMessagge(message) {
    const knexInstance = knex(optionsSqlite3)
    try {
      const newMessagge = await knexInstance('messagge').insert(message)
      console.log('Mensaje creados con exito')
      return message
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }
  async function getMessagge() {
    const knexInstance = knex(optionsSqlite3)
    try {
      const rows = await knexInstance('messagge').select('*')
      console.log('Productos encontrados:', rows.length)
      return rows
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }
const {commerce,image} = faker

function getProdutsTest(count=5) {
  const productos = []
  for (let index = 0; index < parseInt(count); index++) {
    productos.push({
      id: index + 1,
      title: commerce.product(),
      price: commerce.price(),
      thumbnail: image.imageUrl(50, 50, 'food' ,true),
    })
  }
  return productos
}


// async function listarAll() {
//   try {
//       const objs = await fs.readFile('./message.json', 'utf-8')
//       return JSON.parse(objs)
//   } catch (error) {
//       return []
//   }
// }
// async function listar(id) {
//   const objs = await listarAll()
//   const buscado = objs.find(o => o.id == id)
//   return buscado
// }
// async function guardar(obj) {
//   const objs = await listarAll()
//   console.log(obj)
//   let newId
//   if (objs.length == 0) {
//       newId = 1
//   } else {
//       newId = objs[objs.length - 1].id + 1
//   }

//   const newObj = { ...obj, id: newId }
//   objs.push(newObj)
//   try {
//       await fs.writeFile('./message.json', JSON.stringify(objs, null, 2))

//   } catch (error) {
//     console.log(`Error al guardar:`,error)

//   }
// }

module.exports = {
  createTable,
  getProducts,
  insertProducts,
  createTableMessagge,
  insertMessagge,
  getMessagge,
  getProdutsTest,

}