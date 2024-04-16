const jwt = require('jsonwebtoken');
const { db } = require('../Database/database');

const getemailFromtoken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        console.log('Decoded email:', decoded.email);
        return decoded.email;
    } catch (error) {
        console.error('Error in getemailFromtoken:', error);
        return null;
    }
}

exports.authenticator = (req, res, next) => {
    const token = req.headers.authorization || req.query.token;
    console.log('Token in authenticator:', token);
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                console.error('Error in authenticator:', err);
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                next();
            }
        });
    } else {
        console.log('No token provided');
        return res.status(401).json({ error: 'No token provided' });
    }
};

exports.isadmin = (req, res, next) => {
    const token = req.headers.authorization || req.query.token;
    console.log('Token dans le middleware isadmin:', token);
    if (token && process.env.API_KEY) {
        jwt.verify(token.split(" ")[1], process.env.API_KEY, (err, decoded) => {
            if (err) {
                console.error('Erreur dans le middleware isadmin:', err);
                return res.status(401).json({ error: 'Token invalide' });
            } else {
                const { email, isAdmin } = decoded;
                console.log('Email extrait du token:', email);
                console.log('Statut d\'administrateur extrait du token:', isAdmin);
                req.user = { email, isAdmin }; // Ajout de l'objet user à la requête pour une utilisation ultérieure
                next();
            }
        });
    } else {
        console.log('Aucun token fourni');
        return res.status(401).json({ error: 'Aucun token fourni' });
    }
};