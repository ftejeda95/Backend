class User {
    constructor(nombre,apellido,libros,mascotas){
    this.nombre=nombre;
    this.apellido=apellido;
    this.libros=libros;
    this.mascotas=mascotas
}

getFullName(){
 console.log(`Mi nombre es ${this.nombre} ${this.apellido}`)
}

addMascota(nameMascotas){
        if (nameMascotas !== ""){
            this.mascotas.push(nameMascotas)
            return(console.log(`agregar mascosta: ${nameMascotas}. Todas las mascotas: ${this.mascotas}` ))
    
}}

countMascotas(){
        let n = this.mascotas.length
        return(console.log(`cantidad de mascotas: ${n}`))
}

addBook(nameBook,autorBook){
    this.libros.push([{name:`${nameBook}`,autor:`${autorBook}`}])
    return(console.log(`se agregan el libro:${nameBook}, autor: ${autorBook}.`))
}
getBookNames(user){
    let n=[]

    for (let i of user.libros) {
        n.push(i[0].name)
    }
    return(console.log(`Nombre de libros del Usuario: ${n}.`))
}

}

const user1= new User (`jose`,`perez`,[],["perro"]);

user1.addMascota("gato")
user1.countMascotas()
user1.getFullName()
user1.addBook('Fundacion','Isaac Asimov')
user1.addBook("El señor de las moscas","William Golding")
user1.getBookNames(user1)

