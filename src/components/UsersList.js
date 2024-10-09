// src/components/UsersList.js
import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        try {
            const response = await getUsers(page);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User List</h2>
            <button className="btn btn-secondary mb-3" onClick={() => navigate('/')}>Logout</button>
            <div className="row">
                {users.map(user => (
                    <div key={user.id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={user.avatar} className="card-img-top" alt={`${user.first_name} ${user.last_name}`} />
                            <div className="card-body">
                                <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => navigate(`/edit/${user.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UsersList;
