import passport from 'passport';
import autenticacion from '../service/service.js';

export async function log(req, res) {
  if (!req.isAuthenticated()) {
    res.render("login");
  } else {
    const { user } = req;
    let data = { user: user.email };
    res.render("index", data);
  }
}
export async function singIn(req, res) {
      autenticacion(),
  (req, res) => {
        logger.info(`Ruta ${req.originalUrl} metodo GET`)
        res.redirect('/');
        
  }
}
export async function failLogin(req, res){
    logger.info(`Ruta ${req.originalUrl} metodo GET`)
    res.render('faillogin');
}
export async function logOut(req, res){
    const { username } = req.body;
    req.logout((error) => {
          if (!error) {
                let data = { user: username };
                logger.info(`Ruta ${req.originalUrl} metodo GET`)
                res.render('logout', data);
          } else {
                logger.error(error.message);
                res.send('Ocurrio un  error', error.message);
          }
    });
}
export default {
    log,
    singIn,
    failLogin,
    logOut,
  }