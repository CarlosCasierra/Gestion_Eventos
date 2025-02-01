import axios from 'axios';


export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
});

// crear las interceptorres para agregar token jwt en cada solicitud
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token
    }
    return config;
});


export default api;



