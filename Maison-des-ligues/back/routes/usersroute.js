const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const app = express();
const usercontroller = require('../controllers/userscontroller');
const { isadmin } = require('../midleware/middleware');
const { authenticator } = require('../midleware/middleware');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const router = express.Router();

router.post('/connexion', usercontroller.connexion);
router.post('/inscription', usercontroller.inscription);
router.get('/utilisateurs', isadmin, usercontroller.utilisateurs);
router.get('/administrateurs', isadmin, usercontroller.administrateurs);
router.post('/modifieradmin', isadmin, usercontroller.modifieradmin);
router.delete('/utilisateurs/:uid', isadmin, usercontroller.delete);
router.post('/deconnexion', usercontroller.deconnexion);
router.post('/connexionadmin', usercontroller.connexionAdmin);
router.use(isadmin);
module.exports = router;