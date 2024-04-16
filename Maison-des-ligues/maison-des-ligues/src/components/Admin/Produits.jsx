import React, { useState, useEffect } from 'react';
import '../../styles/Admin/Produits.css';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
const Produits = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState(null); // Ajout de la déclaration de token

    useEffect(() => {
        const tokenFromCookie = Cookies.get('token');
        if (tokenFromCookie) {
            const decodedToken = jwtDecode(tokenFromCookie);
            setIsAdmin(decodedToken.isAdmin);
            setToken(tokenFromCookie); // Définition de la valeur de token
        }
        fetch("http://192.168.1.37:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);


    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        } else if (e.target.name === 'name') {
            setName(e.target.value);
        } else if (e.target.name === 'details') {
            setDetails(e.target.value);
        } else if (e.target.name === 'price') {
            setPrice(e.target.value);
        } else if (e.target.name === 'quantity') {
            setQuantity(e.target.value);
        }
    };

    const handleAddProduct = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('details', details);
        formDataToSend.append('price', price);
        formDataToSend.append('image', image);
        formDataToSend.append('quantity', quantity);

        try {
            const response = await fetch('http://192.168.1.37:3000/api/produitsroute/produit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const newProduct = await response.json();
                setProducts([...products, newProduct]);

                setName('');
                setDetails('');
                setPrice('');
                setImage(null);
                setQuantity('');
            } else {
                console.error('Erreur lors de l\'ajout du produit :', response.statusText);
                setError('Erreur lors de l\'ajout du produit.');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            setError('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };

    const handleUpdateProduct = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('details', details);
        formDataToSend.append('price', price);
        formDataToSend.append('image', image);
        formDataToSend.append('quantity', quantity);

        try {
            const response = await fetch(`http://192.168.1.37:3000/api/produitsroute/produit/${selectedProduct.pid}`, {
                method: 'PUT',
                body: formDataToSend,
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                const updatedProducts = products.map(product =>
                    product.pid === updatedProduct.pid ? updatedProduct : product
                );
                setProducts(updatedProducts);

                setName('');
                setDetails('');
                setPrice('');
                setImage(null);
                setQuantity('');
                setSelectedProduct(null);
            } else {
                console.error('Erreur lors de la mise à jour du produit :', response.statusText);
                setError('Erreur lors de la mise à jour du produit.');
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            setError('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };

    const handleDeleteProduct = async (pid) => {
        try {
            const response = await fetch(`http://192.168.1.37:3000/api/produitsroute/produit/${pid}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter(product => product.pid !== pid));
            } else {
                console.error('Erreur lors de la suppression du produit :', response.statusText);
                setError('Erreur lors de la suppression du produit.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
            setError('Une erreur s\'est produite lors de la suppression du produit.');
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setName(product.name);
        setDetails(product.details);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImage(null);
    };

    return (
        <section className="add-products">
            <h1>Ajouter/Modifier un produit</h1>
            {isAdmin && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex">
                        <div className="inputBox">
                            <span>Nom du produit </span>
                            <input type="text" className="box" required maxLength="100" placeholder="Entrer le nom du produit" name="name" value={name} onChange={handleChange} />
                        </div>
                        <div className="inputBox">
                            <span>Prix du produit </span>
                            <input type="number" className="box" required max="9999999" placeholder="Entrer le prix du produit" name="price" value={price} onChange={handleChange} />
                        </div>
                        <div className="inputBox">
                            <span>Quantité du produit </span>
                            <input type="number" className="box" required min="1" placeholder="Entrer la quantité du produit" name="quantity" value={quantity} onChange={handleChange} />
                        </div>
                        <div className="inputBox">
                            <span>Image du produit </span>
                            <input type="file" name="image" accept="image/jpg, image/jpeg, image/png, image/webp" className="box" onChange={handleChange} required />
                        </div>
                        <div className="inputBox">
                            <span>Description du produit </span>
                            <textarea name="details" placeholder="Entrer la description du produit" className="box" required maxLength="500" cols="30" rows="10" value={details} onChange={handleChange} />
                        </div>
                        <button type="button" onClick={selectedProduct ? handleUpdateProduct : handleAddProduct}>{selectedProduct ? "Modifier le produit" : "Ajouter le produit"}</button>
                    </div>
                </form>
            )}
            <h1>Liste des Produits :</h1>
            <div className='liste'>
                {products.map(product => (
                    <div key={product.pid} className="box-product">
                        {product.image && <img src={`http://192.168.1.37:3000/${product.image}`} alt={product.name} style={{ maxWidth: '100%' }} />}
                        <div className="details">
                            <p>{product.name}</p>
                            <p>{product.details}</p>
                            <p>Prix : {product.price} €</p>
                            <p>Quantité disponible : {product.quantity}</p>
                            <button className='btn2' onClick={() => handleEditProduct(product)}>Modifier</button>
                            <button className='btn2' onClick={() => handleDeleteProduct(product.pid)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Produits;
