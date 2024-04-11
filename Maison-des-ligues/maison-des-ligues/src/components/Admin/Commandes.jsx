import React, { useEffect, useState } from "react";

function Commandes() {
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        const fetchTotalPrice = async () => {
            try {
                const response = await fetch("http://192.168.1.17:3000/api/produitsroute/PrixTotalPanier");
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
        <div>
            {totalPrice !== null ? (
                <p>Prix total du panier : {totalPrice} €</p>
            ) : (
                <p>aucun produit</p>
            )}
        </div>
    );
}

export default Commandes;
