const express = require("express");
const { dbConnection } = require("../database/config"); //importando la configuracion de la conexion con la BD
const cors = require("cors");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.usersPath = "/api/users";
    this.categoriasPath = "/api/categorias";
    this.productosPath = "/api/productos";
    this.buscarPath = "/api/buscar";
    this.upLoadsPath = "/api/uploads";

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

    //fileUpload carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  // rutas
  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPath, require("../routes/users"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.productosPath, require("../routes/producto"));
    this.app.use(this.buscarPath, require("../routes/buscar"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
