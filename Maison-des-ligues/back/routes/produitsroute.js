const express = require('express');
const multer = require('multer');
const app = express();
const produitscontroller = require('../controllers/produitscontroller');
const usercontroller = require('../controllers/userscontroller');
const { authenticator } = require('../midleware/middleware');
const { isadmin } = require('../midleware/middleware');
const path = require('path');

app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
        console.log(Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({ storage: storage });
//a

app.post('/produit', upload.single('image'), isadmin, produitscontroller.ajoutproduit);
app.get('/produit', produitscontroller.afficheproduit);
app.delete('/produit/:pid', isadmin, produitscontroller.supprimerproduit);

// Route POST pour l'ajout d'un produit au panier
app.post('/ajout', (req, res) => {
    const { pid, uid, name, details, price, image } = req.body;

    console.log('Data received for adding to cart:');
    console.log('Product ID:', pid);
    console.log('User ID:', uid);
    console.log('Name:', name);
    console.log('Details:', details);
    console.log('Price:', price);
    console.log('Image:', image);

    // Appeler le contrôleur pour gérer l'ajout du produit au panier
    produitscontroller.ajouterAuPanier(req, res);
});

// Endpoint pour récupérer le contenu du panier
app.get('/panier', produitscontroller.getContenuPanier);
app.put('/produit/:pid', upload.single('image'), produitscontroller.updateProduct);
app.get('/PrixTotalPanier', produitscontroller.getPrixTotalPanier);

module.exports = app;
