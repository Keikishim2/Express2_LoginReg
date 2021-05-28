import express from 'express';
import regController from '../controllers/regController';
import loginController from '../controllers/loginController';
import initPassportLocal from '../controllers/passportLocalController';
import homePageController from '../controllers/homePageController';

initPassportLocal();
let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', loginController.checkLoggedIn, homePageController.getHomePage);
    router.post('/logout', loginController.postLogOut);

    router.get('/register', regController.registerPage);
    router.post('/register-new-user', regController.createNewUser);

    router.get('/login', loginController.checkLoggedOut, loginController.loginPage);
    router.post('/login', loginController.handleLogin)
    return app.use('/', router);
};

module.exports = initWebRoutes;