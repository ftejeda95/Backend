import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"

class ProductosDaoFire extends ContenedorFirebase {
    constructor() {
        super('productos')
    }
    async createUsers(products=[]) {
        return super.createUsers(products)
    }
}

export default ProductosDaoFire