
const express = require('express')
const { Router } = express

const router = Router(Router)

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
}
const productos = [
  {
    id: 1,
    title: 'pila',
    price: 'Sanchez',
    thumbnail: '',
  },
  {
    id: 2,
    title: 'pila',
    price: 'Sanchez',
    thumbnail: '',
  },
  {
    id: 3,
    title: 'pila',
    price: 'Sanchez',
    thumbnail: '',
  },
]

let siguienteID = 4

router.get('/productos', async(_, res) => {
  res.status(STATUS_CODE.OK).json(productos)
})

 function id(idProducto) {
  const productoID =  productos.find(prod=> prod.id == idProducto )
  return(productoID)
 }
router.get('/productos/:id', async (req, res) => {
   const idProducto = req.params.id
  try {
    if(idProducto > productos.length){
      res.json( {error : 'producto no encontrado'} )
    } else{
      res.status(STATUS_CODE.OK).json(id(idProducto))
    }
    
  } catch (error) {
    console.log(error.message)
    res.json( {error : 'producto no encontrado'}).end()
  }
})

router.post('/productos', (req, res) => {
  let {body : data} = req
  data = { id: siguienteID, ...data }
  productos.push(data)
  siguienteID++
  res.status(STATUS_CODE.OK).json(data)
})

router.put('/productos/:id',async (req, res) => {
  const idProducto = req.params.id
  const data = req.body
  try {
    let productoBuscado = id(idProducto)
    productoBuscado.title = data.title
    productoBuscado.price = data.price
    productoBuscado.thumbnail = data.thumbnail
    productos.push(productoBuscado)
    res.status(STATUS_CODE.NO_CONTENT).json(productoBuscado)
  } catch (error) {
    console.log(error.message)
    res.json({error : 'producto no encontrado'}).end()
  }
})

router.delete('/productos/:id', async(req, res) => {
  const idUsuario = req.params.id
  try {
    productos.filter(product=>product.id !== idUsuario)
    res.status(STATUS_CODE.NO_CONTENT).json(productos)
  } catch (error) {
    console.log(error.message)
    res.json({error : 'producto no encontrado'}).end()
  }
})

module.exports = router
