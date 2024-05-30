import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import '../../styles/Admin/user.css';

function Utilisateurs() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = Cookies.get('token');

            const response = await fetch("http://192.168.1.37:3000/api/usersroute/utilisateurs", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des utilisateurs");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (uid) => {
        try {
            const token = Cookies.get('token');

            const response = await fetch(`http://192.168.1.37:3000/api/usersroute/utilisateurs/${uid}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setUsers(users.filter(user => user.uid !== uid));
            } else {
                console.error('Erreur lors de la suppression de l\'utilisateur :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
    };

    return (
        <div className="user-container">
            <h1>Liste des utilisateurs</h1>
            {users && users.length > 0 ? (
                users.map((user) => (
                    !user.admin && (
                        <li key={user.uid} className="user-item">
                            <div className="user-info">
                                <span>Nom: </span>{user.name}<br />
                                <span>Email: </span>{user.email}
                            </div>
                            <button className="delete-button" onClick={() => handleDelete(user.uid)}>Supprimer</button>
                        </li>
                    )
                ))
            ) : (
                <li>Aucun utilisateur trouvé</li>
            )}

        </div>
    );
}

export default Utilisateurs;
