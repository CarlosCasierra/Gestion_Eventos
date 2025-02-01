import { useState } from "react";
import api from '../api/api'; // Asegúrate de que api es Axios

// 🔹 Hook para iniciar sesión
const useAuthLogin = () => { 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/users/login', { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            window.location.href = "/";
        } catch (error) {
            console.error("Error en login:", error.response ? error.response.data : error);
            setError(error.response ? error.response.data.message : "Error desconocido");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};

// 🔹 Hook para registrar usuario
const useAuthRegister = () => { 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/users/register', { username, email, password });
            return { success: true, user: response.data.user };
        } catch (error) {
            console.error("Error en registro:", error.response ? error.response.data : error);
            setError(error.response ? error.response.data.message : "Error desconocido");
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};

export { useAuthLogin, useAuthRegister };
