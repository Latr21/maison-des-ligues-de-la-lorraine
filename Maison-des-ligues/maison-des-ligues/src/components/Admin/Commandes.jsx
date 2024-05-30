import React, { useEffect, useState } from "react";
import '../../styles/Admin/commande.css'; // Importez le fichier CSS

function Commandes() {
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        const fetchTotalPrice = async () => {
            try {
                const response = await fetch("http://192.168.1.37:3000/api/produitsroute/PrixTotalPanier");
                if (response.ok) {
                    const data = await response.json();
                    setTotalPrice(data.total_count);
                } else {
                    throw new Error('Erreur lors de la récupération du prix total du panier');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchTotalPrice();
    }, []);

    return (
        <div className="commandes-container">
            {totalPrice !== null ? (
                <p className="total-price">Prix total du panier : {totalPrice} €</p>
            ) : (
                <p className="error-message">Aucun produit</p>
            )}
        </div>
    );
}

export default Commandes;
