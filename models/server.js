const express = require("express");
const { dbConnection } = require("../database/config"); //importando la configuracion de la conexion con la BD
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    //conectar BD
    this.conectarDB();

    // middlewares
    this.middlewares();

    // rutas
    this.routes();
  }

  //llamando funcion para conectar base de datos
  async conectarDB() {
    await dbConnection();
  }

  // middlewares

  middlewares() {
    // directorio público
    this.app.use(express.static("public"));
    // cors
    this.app.use(cors());
    // lectura y parseo del body
    this.app.use(express.json());
  }

  // rutas
  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
