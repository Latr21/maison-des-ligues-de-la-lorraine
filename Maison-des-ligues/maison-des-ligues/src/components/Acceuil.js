import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"; // Correction ici
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/acceuil.css';

function Acceuil() {
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState([]);

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

        // Fetch des produits pour le carrousel
        axios.get('http://localhost:3000/api/produitsroute/produit')
            .then(response => {
                console.log("Products fetched successfully for carousel:", response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products for carousel:', error);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (

        <div className="container">
            <h1>Bienvenue {userName || 'invité'} ! sur la Maison des Ligues de Lorraine</h1>
            <h2>Que vous soyez un athlète aguerri ou un amateur passionné,la maison des  Ligues de la Lorraine est là pour répondre à tous vos besoins en matériel sportif. Préparez-vous à vivre des expériences uniques et à repousser vos limites avec nous !</h2> {/* Texte de bienvenue */}
            {isAdmin && <p>Vous êtes administrateur.</p>}
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.pid}>
                        <img src={`http://localhost:3000/${product.image}`} alt={product.name} />
                        <h3>{product.name}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Acceuil;


