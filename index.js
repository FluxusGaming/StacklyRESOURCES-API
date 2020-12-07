/* Creando Servidor Express y definiendo Rutas con Express Router*/
require("dotenv").config(); /* Importando dotenv para variables de entorno */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/routes/router");

/* Definiendo el PUERTO desde variables de entorno */
const PUERTO = process.env.PORT || 3000;

/* Importando cors y bodyParser */
app.use(cors());
app.use(bodyParser.json());

/* Agregando las Rutas de la API */
app.use("/api", router);

app.listen(PUERTO, () => console.log(`SERVIDOR EN EL PUERTO ${PUERTO} :)`));
