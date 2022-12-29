let productosDao
let carritosDao

switch (process.env.TIPO_PERSISTENCIA) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./producto/productoDaosArchivo.js')
        const { default: CarritosDaoArchivo } = await import('./carrito/carritoDaosArchivo.js')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDB } = await import('./producto/productoDaosMongoDB.js')
        const { default: CarritosDaoMongoDB } = await import('./carrito/carritoDaosMongoDB.js')

        productosDao = new ProductosDaoMongoDB()
        carritosDao = new CarritosDaoMongoDB()
        break
    case 'firebase':
        const { default: ProductosDaoFire } = await import('./producto/productoDaosFirebase.js')
        const { default: CarritosDaoFire } = await import('./carrito/carritoDaosFirebase.js')

        productosDao = new ProductosDaoFire()
        carritosDao = new CarritosDaoFire()
        break
    default:
        const { default: ProductosDaoMem } = await import('./producto/productoDaosMemoria.js')
        const { default: CarritosDaoMem } = await import('./carrito/carritoDaosMemoria.js')

        productosDao = new ProductosDaoMem()
        carritosDao = new CarritosDaoMem()
}

export { productosDao, carritosDao }