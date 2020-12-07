/* Importando Express y Express Router */
const express = require("express");
const router = express.Router();

/* Importando bycrypt para la Encriptacion del password*/
const bcrypt = require("bcryptjs");
/* Importando uuid para la asignacion de un ID único para cada usuario*/
const uuid = require("uuid");
/* Importando JSONWebToken para la generación del Token de Usuario (sesión) */
const jwt = require("jsonwebtoken");

const pool = require("../conexionDB/db");
const promisePool = pool.promise();
const { registro } = require("../controllers/registro");
const { logueo } = require("../controllers/logueo");
/* Importando los MiddleWares | Validación */

const userMiddleware = require("../middleware/users");

router.get("/", (req, res) => {
  res.send(
    `[API] STACKLYAPI FUNCIONANDO CORRECTAMENTE | TIEMPO EN LINEA ${parseInt(
      process.uptime()
    )}s [API] `
  );
});

/* Creando la ruta de Registro*/
router.post("/registro", userMiddleware.validateRegister, registro);

router.post("/login", logueo);

router.get("/profile", userMiddleware.isLoggedIn, async (req, res, next) => {
  console.log(req.userData);
  const [[user]] = await promisePool.query(
    `SELECT * FROM USUARIOS WHERE LOWER(id) = LOWER("${req.userData.id}")`
  );
  res.json({
    ID: user.id,
    USUARIO: user.usuario,
    PASSWORD: user.password,
    FECHA_DE_REGISTRO: user.fecha__registro,
  });
});

module.exports = router;
