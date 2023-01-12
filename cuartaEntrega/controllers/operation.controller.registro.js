import logger from '../logger.js'
import autenticacion from '../service/service.js';

export async function regristro(req, res, next) {
  res.render("registro");
}
export async function failRegister(req, res) {
  res.render("failregister");
}

export async function singUp() {
  autenticacion(),
    (req, res) => {
      const { user } = req;
      logger.info(`Ruta ${req.originalUrl} metodo GET`);
      console.log("register -> user", user);
    };
}
export default {
    regristro,
    failRegister,
    singUp,
  }
