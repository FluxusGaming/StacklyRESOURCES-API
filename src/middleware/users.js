const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    /* Nombre de usuario - minimo 3 letras */
    if (!req.body.usuario || req.body.usuario.length < 3) {
      return res.status(400).send({
        message: "Hey, tu usuario debe contener al menos 3 caracteres.",
      });
    }
    /* Contraseña con 6 caracteres mínimo*/
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        message: "Hey, tu contraseña debe contener al menos 6 caracteres.",
      });
    }
    next();
  },

  isLoggedIn: (req, res, next) => {
    try {
      const token = req.get("Authorization");
      const decoded = jwt.verify(token, "SECRETKEY");
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },
};
