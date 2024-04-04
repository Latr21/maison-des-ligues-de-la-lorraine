import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
function Acceuil() {
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Récupérer le token à partir du cookie
        const token = Cookies.get('token');

        if (token) {
            // Décoder le token pour obtenir les informations
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.email;
            const userIsAdmin = decodedToken.isAdmin;

            // Mettre à jour le nom d'utilisateur dans le state
            setUserName(userEmail);
            setIsAdmin(userIsAdmin);
        }
    }, []);

    return (
        <div>
            <h1>Bienvenue, {userName || 'invité'} !</h1>
            {isAdmin && <p>Vous êtes administrateur.</p>}
            {/* Autres éléments de votre page d'accueil */}
        </div>
    );
}

export default Acceuil;