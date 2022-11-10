const dbArchivo = require('../db/daos/dbArchivo')


class ContenedorArchivoDB extends dbArchivo {
    constructor() {
        super('./message.json')

    }
    async guardar (data){
        this.guardar(data)
    }
    // readData(dataChat){
    //     const data = this.listarAll()
    //     normalizar(dataChat)
        
    //     // const dataReversed = denormalize(dataNormalized.result, postScheme, dataNormalized.entities)
    //     // console.log('Data Reversed', JSON.stringify(dataReversed).length)
    //     // print(dataReversed)
    // }
    // //data chat es para agregar lo que me trae el front.
}

module.exports = ContenedorArchivoDB 


