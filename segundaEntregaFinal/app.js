import {
    productosDao as productosApi,
    carritosDao as carritosApi
  } from './daos/index.js'
  
  try {
    await productosApi.guardar({ nombre: 'Tv', precio: 12})
    await productosApi.guardar({ nombre: 'Smartphone', precio: 34})
    const data = await productosApi.listarAll()
  
    //await carritosApi.guardar({ productos: [{ nombre: 'Tv', precio: 12, id: 1 }] })
    //const data = await carritosApi.listarAll()
  
    console.log('data', JSON.stringify(data, null, 2))
  } catch (error) {
    console.log('error', error.message)
  }