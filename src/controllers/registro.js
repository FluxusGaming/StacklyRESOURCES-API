/* Importando bycrypt para la Encriptacion del password*/
const bcrypt = require("bcryptjs");
/* Importando uuid para la asignacion de un ID único para cada usuario*/
const uuid = require("uuid");
/* Importando JSONWebToken para la generación del Token de Usuario (sesión) */
const jwt = require("jsonwebtoken");
const pool = require("../conexionDB/db");
const promisePool = pool.promise();

const registro = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const [rows] = await promisePool.query(
      `SELECT * FROM USUARIOS WHERE LOWER(usuario) = LOWER("${usuario}")`
    );
    /* Nombre de Usuario no Disponible*/
    if (rows.length) {
      return res.status(409).send({
        msg: `[ERROR] El nombre de usuario ${usuario} no se encuentra DISPONIBLE`,
      });
    } else {
      /* Nombre de Usuario disponible, creandolo... */
      /* Encriptando la contraseña con bcrypt*/
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).send({
            msg: `[ERROR] ${err}`,
          });
        }
        /* Creando el Usuario en la Base de Datos */
        const [rows] = await promisePool.query(
          `INSERT INTO USUARIOS (id, usuario, pass,fecha__registro) VALUES ("${uuid.v4()}", "${usuario}", "${hash}", now());`
        );
        res.status(201).send({
          message: `[EXITO] El Usuario ${usuario} ha sido CREADO`,
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registro };
