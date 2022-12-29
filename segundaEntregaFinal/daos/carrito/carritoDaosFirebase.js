import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"

class CarritosDaoFire extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }
    async createUsers(carrito = { productos: [] }) {
        return super.createUsers(carrito)
    }
}

export default CarritosDaoFire