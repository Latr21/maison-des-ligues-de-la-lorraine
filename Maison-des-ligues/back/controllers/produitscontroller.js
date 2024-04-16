const { db } = require('../Database/database');
const crypto = require('crypto');

exports.ajoutproduit = async (req, res) => {
    // Vérifier si l'utilisateur est un administrateur
    if (!req.user || !req.user.isAdmin) {
        console
        return res.status(403).json({ error: 'Seuls les administrateurs sont autorisés à ajouter des produits.' });
    }

    const { name, details, price, quantity } = req.body;
    const pid = crypto.randomUUID();
    const image = req.file ? req.file.path : null;

    try {
        // Vérifier que toutes les valeurs nécessaires sont définies
        if (!name || !details || !price || !quantity || !image) {
            return res.status(400).json({ error: 'Toutes les informations du produit sont requises.' });
        }

        // Insérer le produit dans la base de données
        const [result] = await db.execute(
            'INSERT INTO products (pid, name, details, price, image, quantity) VALUES (?, ?, ?, ?, ?, ?)',
            [pid, name, details, price, image, quantity]
        );
        //a
        return res.status(200).json({ message: 'Produit ajouté avec succès', data: result });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit :', error);
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout du produit.' });
    }
};


exports.afficheproduit = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM products');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Une erreur s\'est produite' });
    }
};
exports.updateProduct = async (req, res) => {
    const { pid } = req.params;
    const { name, details, price, quantity } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        console.log('ID du produit à mettre à jour :', pid);
        console.log('Nouvelles données du produit :', { name, details, price, quantity, image });
        if (!name) {
            console.log('Le champ "Name" est manquant.');
            return res.status(400).json({ error: 'Le champ "Name" est manquant.' });
        }
        if (!details) {
            console.log('Le champ "Description" est manquant.');
            return res.status(400).json({ error: 'Le champ "Description" est manquant.' });
        }
        if (!price) {
            console.log('Le champ "Price" est manquant.');
            return res.status(400).json({ error: 'Le champ "Price" est manquant.' });
        }
        if (!quantity) {
            console.log('Le champ "Quantity" est manquant.');
            return res.status(400).json({ error: 'Le champ "Quantity" est manquant.' });
        }

        let updateQuery = 'UPDATE products SET name = ?, details = ?, price = ?, quantity = ?';
        const queryParams = [name, details, price, quantity];

        if (image) {
            updateQuery += ', image = ?';
            queryParams.push(image);
        }

        updateQuery += ' WHERE pid = ?';
        queryParams.push(pid);

        console.log('Requête de mise à jour :', updateQuery);
        console.log('Paramètres de la requête :', queryParams)
        const [result] = await db.execute(updateQuery, queryParams);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Produit mis à jour avec succès' });
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour du produit' });
    }
};

exports.ajouterAuPanier = async (req, res) => {
    const { pid, uid, name, details, price, image, quantity } = req.body; // Ajoutez la quantité à récupérer depuis le corps de la requête

    // Vérifiez si pid, uid, name, details, price, image, et quantity sont définis
    if (!pid || !uid || !name || !details || !price || !image || !quantity) {
        return res.status(400).json({ error: 'Paramètres manquants' });
    }

    try {
        // Vérifiez si le produit existe
        const [productRow] = await db.execute('SELECT * FROM products WHERE pid = ?', [pid]);

        if (productRow.length === 0) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        // Vérifiez si la quantité disponible est suffisante
        if (productRow[0].quantity < quantity) { // Vérifiez si la quantité demandée est supérieure à la quantité disponible
            return res.status(400).json({ error: 'La quantité demandée est supérieure à la quantité disponible' });
        }

        // Mettez à jour la quantité disponible du produit
        const newQuantity = productRow[0].quantity - quantity; // Décrémentez la quantité disponible en fonction de la quantité demandée
        await db.execute('UPDATE products SET quantity = ? WHERE pid = ?', [newQuantity, pid]);

        // Ajoutez le produit au panier dans la base de données avec la quantité spécifiée
        await db.execute('INSERT INTO panier (pid, uid, name, details, price, image, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)', [pid, uid, name, details, price, image, quantity]);

        console.log('Produit ajouté au panier avec succès:', { pid, uid, name, details, price, image });

        res.status(200).json({ message: 'Produit ajouté au panier avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit au panier:', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout du produit au panier' });
    }
};

//a
exports.getContenuPanier = async (req, res) => {
    const { uid } = req.query;

    try {
        // Récupérez le contenu du panier pour l'utilisateur spécifié
        const [panierRows] = await db.execute('SELECT * FROM panier WHERE uid = ?', [uid]);

        res.status(200).json(panierRows);
    } catch (error) {
        console.error('Erreur lors de la récupération du contenu du panier:', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du contenu du panier' });
    }
};

exports.supprimerproduit = async (req, res) => {
    const pid = req.params.pid; // Récupérer l'ID du produit à supprimer depuis les paramètres de l'URL

    try {
        const [result] = await db.execute(
            'DELETE FROM products WHERE pid = ?',
            [pid]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Objet supprimé avec succès' });
        } else {
            res.status(404).json({ error: 'Produit non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du produit' });
    }
};

exports.getPrixTotalPanier = async (req, res) => {
    try {
        const [countRows] = await db.query('SELECT SUM(price) AS total_count FROM panier');
        //verif
        if (countRows.length > 0 && countRows[0].total_count !== null) {
            const totalCount = countRows[0].total_count;
            res.status(200).json({ total_count: totalCount });
        } else {
            res.status(404).json({ error: 'Aucun produit dans le panier' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de prix dans le panier:', error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du nombre total de prix dans le panier' });
    }
};
exports.supprimerDuPanier = async (req, res) => {
    const { pid, uid } = req.body;
    await db.execute('DELETE FROM panier WHERE pid = ? AND uid = ?', [pid, uid]);
    res.status(200).json({ message: 'Produit supprimé du panier avec succès' });
}; 