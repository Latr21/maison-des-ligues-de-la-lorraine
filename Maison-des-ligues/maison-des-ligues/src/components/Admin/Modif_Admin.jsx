import React, { useState, useEffect } from 'react';
import '../../styles/Modif_Admin.css';
import bcrypt from 'bcryptjs';

const Modif_Admin = () => {
    const [administrateurs, setAdministrateurs] = useState([]);
    const [modificationData, setModificationData] = useState({
        newName: '',
        newEmail: '',
        newPassword: ''
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await fetch("http://192.168.1.37:3000/api/usersroute/administrateurs");
            if (response.ok) {
                const data = await response.json();
                setAdministrateurs(data);
            } else {
                console.error('Erreur lors de la récupération des administrateurs:', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des administrateurs:', error);
        }
    };

    const handleModification = async (uid) => {
        try {
            const hashedPassword = await bcrypt.hash(modificationData.newPassword, 10);
            const response = await fetch('http://192.168.1.37:3000/api/usersroute/modifieradmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid,
                    ...modificationData,
                    newPassword: hashedPassword
                }),
            });

            if (response.ok) {
                const updatedAdmins = administrateurs.map(admin =>
                    admin.uid === uid ? { ...admin, ...modificationData } : admin
                );
                setAdministrateurs(updatedAdmins);
                setModificationData({
                    newName: '',
                    newEmail: '',
                    newPassword: ''
                });
            } else {
                console.error('Erreur lors de la modification de l\'administrateur :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la modification de l\'administrateur :', error);
        }
    };

    return (
        <section className="modify-admins">
            <h1>Modification des administrateurs</h1>
            <div>
                {administrateurs.map(admin => (
                    <div key={admin.uid} className="admin-box">
                        <h2>{admin.name}</h2>
                        <p>Email: {admin.email}</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Nouveau Nom"
                                value={modificationData.newName}
                                onChange={(e) => setModificationData({ ...modificationData, newName: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Nouvel Email"
                                value={modificationData.newEmail}
                                onChange={(e) => setModificationData({ ...modificationData, newEmail: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Nouveau Mot de Passe"
                                value={modificationData.newPassword}
                                onChange={(e) => setModificationData({ ...modificationData, newPassword: e.target.value })}
                            />
                            <button onClick={() => handleModification(admin.uid)}>Modifier</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Modif_Admin;
