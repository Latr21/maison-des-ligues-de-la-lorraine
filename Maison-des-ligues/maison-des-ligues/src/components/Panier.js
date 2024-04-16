import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import '../styles/panier.css';

function Panier() {
    const [panier, setPanier] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchPanier();
    }, []);

    useEffect(() => {
        const calculateTotal = () => {
            const total = panier.reduce((somme, produit) => somme + (produit.price * produit.quantity), 0);
            setTotal(total);
        };

        calculateTotal();
    }, [panier]);

    const fetchPanier = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                throw new Error('Token non trouvé');
            }

            const decodedToken = jwtDecode(token);

            const response = await axios.get('http://192.168.1.37:3000/api/produitsroute/panier', {
                params: { uid: decodedToken.uid }
            });
            setPanier(response.data);

        } catch (error) {
            console.error('Erreur lors de la récupération du panier :', error);
        }
    };



    const handleDeleteProduct = async (pid) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.delete(`http://192.168.1.37:3000/api/produitsroute/suprimerpanier`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    pid: pid,
                    uid: panier[0].uid
                }
            });                                     //Christian Latour
            if (response.ok) {
                setPanier(panier.filter(product => product.pid !== pid));
            } else {
                console.error('Erreur lors de la suppression du produit du panier :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du produit du panier :', error);
        }
    };

    return (
        <div className="panier-container">
            <h1>Contenu du panier :</h1>
            <ul>
                {panier.map((produit, index) => (
                    <li key={index} className="produit">
                        <div className="produit-info">
                            <img src={`http://192.168.1.37:3000/${produit.image}`} alt={produit.nom} />
                            <span className="produit-name">{produit.name}</span>
                            <span className="produit-price">{produit.price} €</span>
                            <span className="produit-quantity">{produit.quantity}</span>
                            <button onClick={() => handleDeleteProduct(produit.pid)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => alert(`Le montant total est de ${total} €`)}>Confirmer le panier</button>
        </div>
    );
}

export default Panier;
