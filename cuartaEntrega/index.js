const express = require('express')
const http = require('http')
const useragent = require('express-useragent')
const path = require('path')
const { engine } = require('express-handlebars')
const productos = require('./routers/productos')
const upload = require('./routers/upload')
const indexRouter = require('./routers/views/index');
const productsRouter = require('./routers/views/producto')
const { initSocket } = require('./socket')
const knex = require('./db/index')
//Crear App
const app = express()

//Crear Puerto
const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV 

//configuro la App

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//configuro Motor de Plantillas

app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(useragent.express())

//configuro los Router

app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/api', productos, upload)


//configuro Error

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//crear Servidor

const server = http.createServer(app)
initSocket(server)

//Escucho Servidor

server.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

