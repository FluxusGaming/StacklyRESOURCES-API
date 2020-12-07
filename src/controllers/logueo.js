/* Importando bycrypt para la Encriptacion del password*/
const bcrypt = require("bcryptjs");
/* Importando uuid para la asignacion de un ID único para cada usuario*/
const uuid = require("uuid");
/* Importando JSONWebToken para la generación del Token de Usuario (sesión) */
const jwt = require("jsonwebtoken");
const pool = require("../conexionDB/db");
const promisePool = pool.promise();

const logueo = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const [[user]] = await promisePool.query(
      `SELECT * FROM USUARIOS WHERE LOWER(usuario) = LOWER("${usuario}")`
    );
    if (!user) {
      return res.status(400).send({
        message: "Usuario y/o contraseña INCORRECTOS",
      });
    }

    bcrypt.compare(password, user.pass, (bErr, bResult) => {
      if (bErr) {
        console.log(bErr);
      }
      if (bResult) {
        const token = jwt.sign(
          {
            usuario: user.usuario,
            id: user.id,
          },
          "SECRETKEY",
          {
            expiresIn: "7d",
          }
        );
        return res.status(200).send({
          msg: "¡LOGUEADO!",
          token,
        });
      }
      return res.status(401).send({
        msg: "[ERROR] Usuario y/o contraseña INCORRECTOS",
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { logueo };
