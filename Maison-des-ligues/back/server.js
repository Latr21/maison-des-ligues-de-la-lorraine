const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require("mysql2/promise");
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
const produitsroute = require('./routes/produitsroute');
const usersroute = require('./routes/usersroute');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// Assurez-vous que crypto.webcrypto est disponible pour webcrypto pour le fonctionnement de crypto-browserify
require('crypto').webcrypto = require('crypto-browserify');

// Utilisation de cookie-parser pour gérer les cookies
app.use(cookieParser());

// Utilisation de JSON middleware pour traiter les requêtes au format JSON
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Activation du support CORS pour permettre les requêtes depuis un domaine différent
// Activation du support CORS pour permettre les requêtes depuis plusieurs domaines différents
app.use(cors({
    origin: ['http://localhost:3001'], // Inclure les deux origines
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware pour servir les fichiers statiques
app.use('/uploads', express.static('uploads'));

// Routes pour les produits et les utilisateurs
app.use('/api/produitsroute', produitsroute);
app.use('/api/usersroute', usersroute);

// Démarrage du serveur sur le port 3000
module.exports =
    app.listen(3000, () => {

    });
