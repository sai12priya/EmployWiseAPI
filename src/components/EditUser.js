// src/components/EditUser.js
import React, { useEffect, useState } from 'react';
import { updateUser, getUsers } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUsers(1);
            const foundUser = response.data.data.find(u => u.id === parseInt(id));
            setUser(foundUser);
            setFirstName(foundUser.first_name);
            setLastName(foundUser.last_name);
            setEmail(foundUser.email);
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, { first_name: firstName, last_name: lastName, email });
            navigate('/users');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit User</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <button type="submit" className="btn btn-success w-100">Update</button>
            </form>
        </div>
    );
};

export default EditUser;
