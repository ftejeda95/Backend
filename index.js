class User {
    constructor(nombre,apellido,libros,mascotas){
    this.nombre=nombre;
    this.apellido=apellido;
    this.libros=libros[{}];
    this.mascotas=mascotas[""]
}

getFullName(){
 console.log(`Mi nombre es ${this.nombre} ${this.apellido}`)
}

addMascota(nameMascotas){
        if (nameMascotas !== ""){
            this.mascotas.push(nameMascotas)
            return(console.log(this.mascotas))
        }
    
}

countMascotas(){
    (function(){
        return(console.log(this.mascotas.length))
    })
}

addBook(nameBook,autorBook){
    this.libros.push([{name:`${nameBook}`,autor:`${autorBook}`}])
    return(console.log(this.libros))
}
getBookNames(){
    let n=[]
    for (i in this.libros) {
        n.push(i.name)
    }
    return(console.log(n))
}

}

const user1= new User (`jose`,`perez`,``,`perro`);
user1.addMascota("gato")
user1.countMascotas()
user1.getFullName()
user1.addBook('Fundacion','Isaac Asimov')
user1.getBookNames()
user1.addBook("El señor de las moscas","William Golding")
