// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://reqres.in/api',
});

export const login = (credentials) => api.post('/login', credentials);
export const getUsers = (page) => api.get(`/users?page=${page}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
