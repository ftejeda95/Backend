const fs = require('fs')

class Contenedor {
    constructor(file){
        this.file = file

    }
    async readFile (file){
        try{
            const data = await fs.promises.readFile(file,'utf-8')
            let jsonData = JSON.parse(data)
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
            }else{
                let listaProductos2=[...archivo]
                let ultimoID = listaProductos2[listaProductos2.length - 1].id
                let nuevoProduct=[...product]
                let nuevoId = Number((ultimoID+=1))
                nuevoProduct[0].id=(nuevoId)
                listaProductos2.push(nuevoProduct[0])

                await fs.promises.writeFile(this.file,JSON.stringify(listaProductos2, null, 2))
            }
        }
        catch{
            console.log('error en la incorporacion del id')
        }}
    
    async getByID(id){
        try{
            let array = await this.readFile(this.file)
            let productoEncontrado = array.find(product=>product.id===id)
            return console.log("producto por ID:",productoEncontrado)
        }
        catch{
            return null
        }
    }
    async getAll(){
        try{
            let contenido = await this.readFile(this.file)
            console.log("todo el contenido:",contenido)
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


const producto = new Contenedor('./producto.txt')
let jabon=[{nombre:'jabon',price:100,thumbnail:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fempresaylimpieza.com%2Fupload%2Fimages%2F02_2022%2F4426_jabon-casero-con-bicarbonato.jpg&imgrefurl=https%3A%2F%2Fempresaylimpieza.com%2Fart%2F2039%2Fla-apasionante-historia-del-jabon&tbnid=9Tq3hCJ78m-TqM&vet=12ahUKEwidnsXH5_75AhV2tpUCHVa_DicQMygBegUIARCGAg..i&docid=pCEbGRnQ_NFbOM&w=655&h=367&q=jabon&ved=2ahUKEwidnsXH5_75AhV2tpUCHVa_DicQMygBegUIARCGAg'}]
let dentifrico= [{nombre:'dentifrico',price:500,thumbnail:'https://www.google.com/imgres?imgurl=https%3A%2F%2Fclinicadentalplazaprosperidad.com%2Fwp-content%2Fuploads%2F2018%2F10%2Fpasta-de-dientes-3-1024x573.jpg&imgrefurl=https%3A%2F%2Fclinicadentalplazaprosperidad.com%2Fcomo-elegir-un-dentifrico-adecuado%2F&tbnid=TXrt6_Jcf7osdM&vet=12ahUKEwiZzdmIoYH6AhUFMrkGHfFWCGwQMygDegUIARDOAQ..i&docid=tp68zqGrS6ThXM&w=1024&h=573&q=dentifrico&ved=2ahUKEwiZzdmIoYH6AhUFMrkGHfFWCGwQMygDegUIARDOAQ'}]

producto.save(jabon)
producto.getByID(1)
producto.getAll()
producto.deleteById(2)
producto.deleteAll()
    




