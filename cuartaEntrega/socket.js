const { Server } = require('socket.io')
const knex = require('./db/index')
const DBarchivos = require('./db/daos/dbArchivo')
const {guardar} =require('./db/index')
const { testAndroidTablet, testNginxGeoIP } = require('express-useragent')
const normalizar = require('./controllers/normalizr')
let io
let newProducts = []
let siguienteID = 1
let messages = []
  
function initSocket (httpServer){
    io = new Server(httpServer)
    setEvent(io)
}
function setEvent (io){
    io.on('connection', async (socketClient) =>{
        console.log('se contecto un nuevo cliente al servidor', socketClient.id)
        socketClient.on('new-products',async (data) =>{
            await knex.createTable()
            await knex.insertProducts(data)
            const newProducts = await knex.getProducts()
            io.sockets.emit('add', newProducts)
        })  
        socketClient.on('new-message', async (dataChat) => {
            await knex.createTableMessagge()
            dataChat.date = new Date().toDateString();
            const dataNorm = await normalizar(dataChat)
            console.log(JSON.stringify(dataNorm))
            console.log(dataChat)
            await DBarchivos.guardar(dataChat)
            // aca tengo que leer lo que tengo en el ContenedorArchivo, despues incorporar el mensaje, y enviarlo.
            // el paso seria lo siguiente, llega la data, la agrego a la data desnormalizada, la normalizo, y la envio. 
           //ver el procedimiento, primero normalizo lo que tengo y despues desnormalizo cada vez que quiero agregar. se normaliza de nuevo y se envia
            const newMessagge = await knex.insertMessagge(dataChat)
            io.sockets.emit('notification', newMessagge)
        })
        socketClient.on('disconnection', () =>{
            console.log('se desconecto del servidor el cliente', socketClient.id)
        })
    })

}




module.exports = {
    initSocket
}