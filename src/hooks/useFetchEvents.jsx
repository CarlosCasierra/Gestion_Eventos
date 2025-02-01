import { useState, useEffect } from 'react';
import api from '../api/api'; // Asegúrate de que la configuración de `api` esté correcta (axios, por ejemplo).
/* Hook para obtener los eventos */
const useFetchEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noEvents, setNoEvents] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

    // Se actualiza el userId si cambia en localStorage
    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");
        if (userIdFromStorage) {
            setUserId(userIdFromStorage);
        }
    }, []);  // Se ejecuta una vez al montar el componente

    useEffect(() => {
        const fetchEvents = async () => {
            if (!userId) {
                setError(new Error("Falta el userId para obtener los eventos"));
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/events/?userId=${userId}`);
                if (response.data.length === 0) {
                    setNoEvents(true); // No hay eventos
                } else {
                    setEvents(response.data);
                    setNoEvents(false); // Si hay eventos, se desactiva el flag
                }
                setLoading(false);;
            } catch (err) {
                console.error(err);
                setError(err);
                setLoading(false);
            }
        };

        fetchEvents();
    }, [userId]);  // Dependiendo de userId, vuelve a ejecutar la petición

    return { events, loading, error };
};

const useCreateEvent = () => {
    const [error, setError] = useState(null);
  
    const createEvent = async (newEvent) => {
      try {
        // Validación más detallada
        const requiredFields = ['title', 'description', 'startTime', 'endTime', 'location', 'status', 'tags', 'visibility'];
        const missingFields = requiredFields.filter(field => !newEvent[field]);
  
        if (missingFields.length > 0) {
          console.error('Faltan estos campos:', missingFields);
          throw new Error(`Faltan campos obligatorios: ${missingFields.join(', ')}`);
        }
  
        console.log('Enviando evento:', newEvent);
  
        const response = await api.post('/events/', newEvent);
        console.log('Respuesta del servidor:', response.data);
  
        return response.data;
      } catch (err) {
        console.error('Error en useCreateEvent:', err);
        setError(err.message);
        throw err;
      }
    };
  
    return { createEvent, error };
  };
  

/* Hook para actualizar un evento */
const useUpdateEvent = () => {
    const [error, setError] = useState(null);

    const updateEvent = async (id, updatedEvent) => {
        try {
            // Validación de los campos
            const { title, description, startTime, endTime, location, status, tags, visibility }  = updatedEvent;
            if (!title || !description|| !startTime || !endTime || !location || !status || !tags || !visibility) {
                throw new Error('Faltan campos obligatorios');
            }

            const response = await api.put(`/events/${id}`, updatedEvent);
            return response.data; // Retorna el evento actualizado
        } catch (err) {
            console.error(err);
            setError(err);
            throw err; // Lanza el error para manejarlo fuera
        }
    };

    return { updateEvent, error };
};

/* Hook para eliminar un evento */
const useDeleteEvent = () => {
    const [error, setError] = useState(null);

    const deleteEvent = async (id) => {
        try {
            await api.delete(`/events/${id}`);
            return id; // Retorna el id del evento eliminado
        } catch (err) {
            console.error(err);
            setError(err);
            throw err; // Lanza el error para manejarlo fuera
        }
    };

    return { deleteEvent, error };
};

export { useFetchEvents, useCreateEvent, useUpdateEvent, useDeleteEvent };
