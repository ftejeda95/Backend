# User Profile API

## Configuración

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido
```
NODE_PORT=8080
NODE_ENV=local
```
Acá estamos configurando una variable de entorno para nuestro proyecto, en este caso el puerto que usará el servidor.

## Ejecutar en producción


```sh
npm start
```

## Ejecutar en desarrollo con NODEMON


```sh
npm run dev:wait
```
Se encuentra archivo para ejecucion en POSTMAN.

## Entrega EJS
La ejecucion con el Motor de EJS es con PORT=8080 se ejecuta sobre el Home "/" y se cargan los productos en la ruta "/productos". Se elige el presente motor por ser a mi parecer el mas completo y mas usado pudiendo ejecutar con facilidad codigo JavaScript.