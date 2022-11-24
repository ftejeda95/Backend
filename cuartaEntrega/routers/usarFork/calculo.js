

function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }
  process.on('message',(cant)=>{
    return cant
})

  const  random= (cant)=>{
    let array = []
    for(let i =0; i<cant; i++){
          let random = getRandomArbitrary(1,cant)
          array.push(random)
    }
    let repetido={}
    array.forEach(function(numero){
    repetido[numero] = (repetido[numero] || 0) + 1;
  });
  return repetido

}
process.on('message',(cant)=>{
    process.send(
    random(cant)
  )
})
