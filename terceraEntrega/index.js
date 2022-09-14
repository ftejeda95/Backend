// const http = require('http')

// const server = http.createServer((peticion, respuesta) => {
//     respuesta.end('Hola mundo')
//  })
//  const connectedServer = server.listen(8080, () => {
//     console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
//  })


const express = require('express')

const app = express()

const PORT = 3000
const fs = require('fs')


 class Contenedor {
    constructor(file){
        this.file = file

    }
    async readFile (file){
        try{
            const data = await fs.promises.readFile(file,'utf-8')
            let jsonData = JSON.parse(data, null, 2)
            return jsonData
        }
        catch{
            console.log('ha ocurrido un Error en la lectura del archivo')
        }
    }
       async existsFile(file){
        try{
            let array = []
            if(await fs.existsSync(file)){
                return this.readFile(file)
            }else{
                await fs.promises.writeFile(this.file,JSON.stringify(array, null, 2))
                return array
            }
        }
        catch{
           console.log('El archivo no existe o no pudo crearse')
        }
    }
     async save(product){
        try{
            let archivo = await this.existsFile(this.file)
            if((archivo.length) === 0){
                let listaProductos= [...product]
                listaProductos[0].id=1
                let archivoJSON=JSON.stringify(listaProductos,null,2)
                await fs.promises.writeFile(this.file,archivoJSON)
            } else{
                let listaProductos2=[...archivo]
                let ultimoID = listaProductos2[listaProductos2.length - 1].id
                let nuevoProduct=[...product]
                let nuevoId = Number((ultimoID+=1))
                nuevoProduct[0].id=(nuevoId)
                let newarray = [...listaProductos2]
                newarray.push(nuevoProduct[0])
                await fs.promises.writeFile(this.file,JSON.stringify(newarray, null, 2))
            }
        }
        catch(error){
            console.log('error en la incorporacion del id', error)
        }}
    
    async getByID(id){
        try{
            let array = await this.readFile(this.file)
            let productoEncontrado = array.find(product=>product.id===id)
            return productoEncontrado
        }
        catch{
            return null
        }
    }
    async getAll(){
        try{
            let contenido = await this.readFile(this.file)
            return contenido
        }
        catch{
            console.log('error en la generacion del JSON')
        }
    }
    async deleteById(id){
        try{
            
            let data = [...await this.readFile(this.file)]
            let newData= data.filter(product=>product.id !== id)
            await fs.promises.writeFile(this.file,JSON.stringify(newData, null, 2))
            console.log(`se ha eliminado el producto, nueva lista`, newData)
        }
        catch{
            console.log("error en la eliminacion del producto")
        }
    }
    async deleteAll(){
        try{
           let eliminar = [] 
           await fs.promises.writeFile(this.file,JSON.stringify(eliminar, null, 2))
           console.log("elementos eliminados:", eliminar)   
        }
        catch{
            console.log('error al eliminar el contenido del archivo')
        }
    }

}



let jabon=[{nombre:'jabon',price:100,thumbnail:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fempresaylimpieza.com%2Fupload%2Fimages%2F02_2022%2F4426_jabon-casero-con-bicarbonato.jpg&imgrefurl=https%3A%2F%2Fempresaylimpieza.com%2Fart%2F2039%2Fla-apasionante-historia-del-jabon&tbnid=9Tq3hCJ78m-TqM&vet=12ahUKEwidnsXH5_75AhV2tpUCHVa_DicQMygBegUIARCGAg..i&docid=pCEbGRnQ_NFbOM&w=655&h=367&q=jabon&ved=2ahUKEwidnsXH5_75AhV2tpUCHVa_DicQMygBegUIARCGAg'}]
let dentifrico=[{nombre:'dentifrico',price:500,thumbnail:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fclinicadentalplazaprosperidad.com%2Fwp-content%2Fuploads%2F2018%2F10%2Fpasta-de-dientes-3-1024x573.jpg&imgrefurl=https%3A%2F%2Fclinicadentalplazaprosperidad.com%2Fcomo-elegir-un-dentifrico-adecuado%2F&tbnid=TXrt6_Jcf7osdM&vet=12ahUKEwiZzdmIoYH6AhUFMrkGHfFWCGwQMygDegUIARDOAQ..i&docid=tp68zqGrS6ThXM&w=1024&h=573&q=dentifrico&ved=2ahUKEwiZzdmIoYH6AhUFMrkGHfFWCGwQMygDegUIARDOAQ'}]
let cepillo= [{nombre:'cepillo',price:300,thumbnail:'https://www.google.com/imgres?imgurl=https%3A%2F%2Ffbkmexico.com%2Fwp-content%2Fuploads%2F2020%2F04%2F10467-2.jpg&imgrefurl=https%3A%2F%2Ffbkmexico.com%2Fproducto%2Fcep-chico-d-mano-c-mango-c-suave-10467%2F&tbnid=lbC3gXxp1vOJqM&vet=12ahUKEwjZq-__35L6AhXYr5UCHXsPBCMQMygKegUIARDkAQ..i&docid=7qY3hUa3lCQKsM&w=1620&h=1080&q=cepillo%20de%20d&ved=2ahUKEwjZq-__35L6AhXYr5UCHXsPBCMQMygKegUIARDkAQ'}]


const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

const producto = new Contenedor('./producto.txt') 
const ejecucion = (async function (product1,product2,product3) {
    await producto.save(product1)
    await producto.save(product2)
    await producto.save(product3)
    let array = await producto.getAll()

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
    let random = await producto.getByID(getRandom(1,3))
    console.log(getRandom(1,3))

    app.get('/productos', (req, res) => {
        res.send(array)
    })
    app.get('/productoRandom', (req, res) => {
        res.send(random)
    })
})
ejecucion(jabon,dentifrico,cepillo)

//     app.get('/', (req, res) => {
//         const html = `<p>array de productos:</p>
//         <ul>
//         <li>${array[0].nombre}</li>
//         <li>${array[1].nombre}</li>
//         <li>${array[2].nombre}</li>
//         </ul>`
//         res.send(html)
// })})







