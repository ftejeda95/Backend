import express from "express";
import http from "http";
import useragent from "express-useragent";
import path from "path";
import { engine } from "express-handlebars";
import productos from "./routers/productos.js";
import upload from "./routers/upload.js";
import indexRouter from "./routers/views/index.js";
import {initSocket} from "./socket.js";
import productsTest from "./routers/views-test/index.js";
import cors from 'cors'
import { fileURLToPath } from 'url';
import session from 'express-session'
import MongoStore from 'connect-mongo'

//Crear App
const app = express();

//Crear Puerto
const PORT = process.env.NODE_PORT;
const ENV = process.env.NODE_ENV;
//configuro la App

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/', express.static(path.join(__dirname, 'public/')));
app.use(cors())
//configuro Motor de Plantillas


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(useragent.express());

app.set("views", path.join(__dirname, 'views/'));

app.use(
  session({
    store: new MongoStore({
          mongoUrl: process.env.MONGO_URL,
          ttl: 600,
    }),
    secret: 'b$x0J77c#20k',
    resave: true,
    saveUninitialized: true,
}))
//configuro los Router

app.use("/", indexRouter,productsTest);
app.use("/api", productos, upload);


//configuro Error

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//crear Servidor

const server = http.createServer(app);
initSocket(server,PORT);

//Escucho Servidor

server.listen(PORT, () => {
  console.log(
    `Servidor http esta escuchando en el puerto ${server.address().port}`
  );
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${ENV}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
