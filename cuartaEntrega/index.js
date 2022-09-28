const express = require('express')
const useragent = require('express-useragent')
const path = require('path')
const productos = require('./routers/productos')
const upload = require('./routers/upload')
const indexRouter = require('./routers/views/index');
const productsRouter = require('./routers/views/producto')
const app = express()

const PORT = process.env.NODE_PORT
const ENV = process.env.NODE_ENV 


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(useragent.express())

app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/api', productos, upload)


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const server = app.listen(PORT, () => {
  console.log(`Servidor http esta escuchando en el puerto ${server.address().port}`)
  console.log(`http://localhost:${server.address().port}`)
  console.log(`Environment:${ENV}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
