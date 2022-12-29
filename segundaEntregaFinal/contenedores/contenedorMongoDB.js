import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongoDB.URI)

class ContenedorMongoDB {
  constructor(modelName, schema) {
      this.collection = mongoose.model(modelName, schema)
  }

  listar(id) {
    return this.collection.findOne({_id: id})
  }

  async listarAll() {
    return this.collection.find({})
  }

  async guardar(obj) {
    const result = await this.collection.create(obj)
    return result
  }

  async actualizar(elemID,modif) {
    return this.collection.updateOne({_id: elemID},modif)
  }

  async borrar(id) {
    return this.collection.deleteOne({_id: id})
  }

  async borrarAll() {
    return this.collection.deleteMany({})
  }
}

export default ContenedorMongoDB