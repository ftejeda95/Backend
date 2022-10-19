const { Server } = require('socket.io')
const knex = require('./db/index')
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