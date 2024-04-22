import React, { useState, useEffect } from "react";
import "../../styles/Admin/Dashboard.css";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importez jwtDecode pour décoder le token
import Cookies from 'js-cookie';

function Dashboard() {
    const [productCount, setProductCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false); // État pour stocker si l'utilisateur est admin

    useEffect(() => {
        // Obtenez le token depuis les cookies
        const tokenFromCookie = Cookies.get('token');
        if (tokenFromCookie) {
            // Décoder le token pour obtenir des informations sur l'utilisateur
            const decodedToken = jwtDecode(tokenFromCookie);
            setIsAdmin(decodedToken.isAdmin); // Mettez à jour l'état isAdmin
        }

        // Obtenez le nombre de produits depuis votre API
        fetch("http://192.168.1.37:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProductCount(data.length))
            .catch((error) => console.error(error));

        // Obtenez le nombre d'utilisateurs depuis votre API en envoyant le token
        fetch("http://192.168.1.37:3000/api/usersroute/utilisateurs", {
            headers: {
                'Authorization': `Bearer ${tokenFromCookie}`
            }
        })
            .then((response) => response.json())
            .then((data) => setUserCount(data.length))
            .catch((error) => console.error(error));
    }, []);

    return (
        <section className="tbd">
            <h1>TABLEAU DE BORD</h1>
            <div className="box-container">
                <div className="box">
                    <h3>Bienvenue</h3>
                    <p>{isAdmin ? "Admin" : "Utilisateur"}</p> {/* Afficher Admin ou Utilisateur en fonction de l'état isAdmin */}
                    <Link to="/Admin/Modif_Admin" className="btn">Modifier votre profil</Link>
                </div>
                <div className="box">
                    <h3>{productCount}</h3>
                    <p>Produits disponibles</p>
                    <Link to="/Admin/Produits" className="btn">Modifier et ajouter des produits</Link>
                </div>
                <div className="box">
                    <p>Liste des commandes</p>
                    <Link to="/Admin/Commandes" className="btn">Voir les commandes</Link>
                </div>
                <div className="box">
                    <h3>{userCount}</h3>
                    <p>Liste des utilisateurs</p>
                    <Link to="/Admin/Utilisateurs" className="btn">Voir les utilisateurs</Link>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
