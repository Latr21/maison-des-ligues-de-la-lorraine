import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'; // Importez le module Cookies pour accéder aux cookies
import '../styles/panier.css';

function Panier() {
    const [panier, setPanier] = useState([]);



    useEffect(() => {
        fetchPanier(); // Appel de la fonction fetchPanier lors du chargement initial de la page
    }, []);

    // Fonction pour récupérer le contenu du panier depuis le backend
    const fetchPanier = async () => {
        try {
            const token = Cookies.get('token'); // Récupérez le token depuis le cookie
            if (!token) {
                throw new Error('Token not found');
            }

            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken); // Ajout du console.log pour afficher decodedToken

            const response = await axios.get('http://192.168.1.37:3000/api/produitsroute/panier', {
                params: { uid: decodedToken.uid }
            });
            setPanier(response.data); // Met à jour l'état du panier avec les données récupérées depuis le backend
        } catch (error) {
            console.error('Erreur lors de la récupération du panier :', error);
        }
    };

    return (
        <div className="panier-container">
            <h1>Contenu du panier :</h1>
            <ul>
                {panier.map((produit, index) => (
                    <li key={index} className="produit">
                        <div className="produit-info">
                            <img src={`http://192.168.1.37:3000/${produit.image}`} alt={produit.name} />
                            <span className="produit-nom">{produit.name}</span>
                            <span className="produit-prix">{produit.price} €</span>
                            {/* <span className="produit-quantity">{produit.quantity}</span> */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Panier;