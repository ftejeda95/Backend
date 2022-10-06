const { Server } = require('socket.io')

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
        
        socketClient.on('new-products', (data) =>{
            data = { id: siguienteID, ...data }
            newProducts.push(data)
            siguienteID++
            console.log(data)
            io.sockets.emit('add', data)
        })  
        socketClient.on('new-message', async (dataChat) => {
            dataChat.date = new Date().toDateString();
            io.sockets.emit('notification', await dataChat)
        })
        socketClient.on('disconnection', () =>{
            console.log('se desconecto del servidor el cliente', socketClient.id)
        })
    })

}




module.exports = {
    initSocket
}