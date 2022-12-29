import { Schema } from 'mongoose'

import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js"

class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        console.log('ProductosDaoMongoDB Here')
        super('Producto', new Schema({
          nombre: { type: String, require: true },
          precio: { type: Number, require: true },
        }))
    }
}

export default ProductosDaoMongoDB