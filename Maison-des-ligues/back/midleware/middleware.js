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
    const token = req.query.token ? req.query.token : req.headers.authorization;
    console.log('Token:', token);
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


const jwt = require('jsonwebtoken');

exports.isadmin = async (req, res, next) => {
    const token = req.query.token || req.headers.authorization;
    console.log('Token:', token);

    if (!token) {
        console.log('Unauthorized: No token provided');
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Vérifiez et décodez le jeton JWT
        const decoded = jwt.verify(token, 'mdpapimdp');

        // Récupérez l'email à partir du décodage du jeton
        const email = decoded.email;

        const conn = await db.getConnection();
        const [result] = await conn.query('SELECT admin FROM users WHERE email = ?', [email]);
        conn.release();

        if (result.length === 0) {
            console.log('Unauthorized: User not found');
            return res.status(401).json({ error: 'Unauthorized: User not found' });
        }

        if (result[0].admin === 1) {
            next();
        } else {
            console.log('Unauthorized: User is not an admin');
            return res.status(401).json({ error: 'Unauthorized: User is not an admin' });
        }
    } catch (error) {
        console.error('Error in isadmin middleware:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
