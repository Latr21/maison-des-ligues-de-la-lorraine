import '../styles/App.css';
import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Banniere from '../components/Banniere';
import Acceuil from '../components/Acceuil';
import Shop from '../components/Shop';
import Panier from '../components/Panier';
import Profil from '../components/Profil';
import Connexion from './connexion';
import Inscription from '../components/inscription';
import Dashboard from './Admin/Dashboard';
import Commandes from './Admin/Commandes';
import Modif_Admin from './Admin/Modif_Admin';
import Produits from './Admin/Produits';
import Utilisateurs from './Admin/Utilisateurs';
import Cookies from 'js-cookie';

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setIsAdmin(decodedToken.isAdmin);
        }

        const handleTokenUpdate = () => {
            const token = Cookies.get('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setIsAdmin(decodedToken.isAdmin);
            }
        };

        window.addEventListener('tokenUpdated', handleTokenUpdate); // Écouter l'événement

        return () => {
            window.removeEventListener('tokenUpdated', handleTokenUpdate); // Nettoyer l'écouteur
        };
    }, []);

    return (
        <div className="App">
            <Banniere />
            <Routes>
                <Route path='/acceuil' element={<Acceuil />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/panier' element={<Panier />} />
                <Route path='/profil' element={<Profil />} />
                <Route path='/connexion' element={<Connexion />} />
                <Route path='/inscription' element={<Inscription />} />

                {isAdmin && (
                    <>
                        <Route path='/Admin/Dashboard' element={<Dashboard />} />
                        <Route path='/Admin/Commandes' element={<Commandes />} />
                        <Route path='/Admin/Modif_Admin' element={<Modif_Admin />} />
                        <Route path='/Admin/Produits' element={<Produits />} />
                        <Route path='/Admin/Utilisateurs' element={<Utilisateurs />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;