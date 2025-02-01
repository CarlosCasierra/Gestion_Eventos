import React, { useState, useEffect } from 'react';
import { useFetchEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '../hooks/useFetchEvents';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal de confirmación
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Estado para el modal de actualización
  const [eventToDelete, setEventToDelete] = useState(null); // Evento a eliminar
  const [eventToUpdate, setEventToUpdate] = useState(null); // Evento a actualizar
  const [filterTagsInput, setFilterTagsInput] = useState('');
  const [filterTags, setFilterTags] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const { events, loading, error } = useFetchEvents();
  const { createEvent, error: createError } = useCreateEvent();
  const { updateEvent, error: updateError } = useUpdateEvent();
  const { deleteEvent, error: deleteError } = useDeleteEvent();

  const [form, setForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    status: '',
    tags: '',
    visibility: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
  
    if (!userId) {
      console.error('No se encontró userId en localStorage');
      alert('Error: No se encontró el usuario.');
      return;
    }
  
    const eventData = { ...form, userId, visibility: form.visibility || 'privado' };
  
    try {
      const newEvent = await createEvent(eventData);
      alert('Evento creado exitosamente');
      setForm({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        status: '',
        tags: '',
        visibility: '',
      });
      window.location.reload();
    } catch (err) {
      console.error('Error al crear evento:', err.message);
      alert(`Error al crear evento: ${err.message}`);
    }
  };

  const handleUpdateEvent = async (id, updatedEvent) => {
    try {
      await updateEvent(id, updatedEvent);
      alert('Evento actualizado');
      setIsUpdateModalOpen(false); // Cerrar el modal después de actualizar
      window.location.reload(); // Recargar la página después de actualizar
    } catch (err) {
      alert('Error al actualizar evento');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      alert('Evento eliminado');
      setIsModalOpen(false); // Cerrar el modal después de eliminar
      window.location.reload(); // Recargar la página después de eliminar
    } catch (err) {
      alert('Error al eliminar evento');
    }
  };

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  const openUpdateModal = (event) => {
    setEventToUpdate(event); // Asignamos el evento a actualizar
    setForm({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      status: event.status,
      tags: event.tags,
      visibility: event.visibility,
    });
    setIsUpdateModalOpen(true); // Abrir el modal de actualización
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setEventToUpdate(null);
    setForm({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      location: '',
      status: '',
      tags: '',
      visibility: '',
    });
  };

  const handleFilterTags = () => {
    if (isFiltering) {
      // Si ya hay un filtro activo, cancelar el filtro
      setFilterTags([]); 
      setFilterTagsInput(''); 
      setIsFiltering(false);
    } else {
      // Aplicar filtro
      const tagsArray = filterTagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== ""); // Evitar strings vacíos
  
      if (tagsArray.length > 0) {
        setFilterTags(tagsArray);
        setIsFiltering(true);
      }
    }
  };
  
  // Aplicar filtro a los eventos
  const filteredEvents = isFiltering
    ? events.filter(event => filterTags.some(tag => event.tags.includes(tag)))
    : events;

  //Cambiar formato de fecha  
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const hours = String(date.getHours()).padStart(2, '0'); // Asegura que las horas tengan dos dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Asegura que los minutos tengan dos dígitos
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0, por eso se suma 1
    const year = date.getFullYear();
    
    return `${hours}:${minutes}/${day}/${month}/${year}`;
  };
  

  if (loading) return <div>Cargando eventos...</div>;
  if (error) return <div>Error al cargar eventos: {error.message}</div>;

  return (
    <div>
      {/* Encabezado */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">Bienvenido a Planify</h1>
        <p className="text-gray-600 mt-2">"Donde la organización transforma el caos en claridad y cada detalle se convierte en un paso hacia el éxito."</p>
      </header>
      
      {/* Filtro de tags */}
      <section className="px-10 py-6">
        <input
          type="text"
          value={filterTagsInput}
          onChange={(e) => setFilterTagsInput(e.target.value)}
          className="w-500 p-2 rounded-md border border-black"
          placeholder="Filtrar eventos por tags"
        />
        <button
          onClick={handleFilterTags}
          className={`w-500 text-white py-2 px-6 rounded-md mx-4 mt-4 transition-colors ${
            isFiltering ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isFiltering ? "Cancelar" : "Filtrar"}
        </button>
      </section>


      {/* Lista de eventos */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 py-6">
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div key={event._id} className="bg-white p-6 rounded-xl shadow-xl relative hover:shadow-2xl transition-shadow duration-300">
                {/* Barra azul delgada en el borde superior */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-xl"></div>
                <h3 className="text-2xl font-semibold text-gray-800 mt-4">{event.title}</h3>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <p className="text-gray-500 text-sm mt-2">{formatDate(event.startTime)}</p>
                <p className="text-gray-500 text-sm mt-1">{event.location}</p>
                <p className="text-gray-500 text-sm mt-1">{event.tags}</p>
                <div className="absolute bottom-4 right-4 flex gap-6">
                  <button onClick={() => openUpdateModal(event)} className="text-blue-500 hover:text-blue-700">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button onClick={() => openDeleteModal(event)} className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


 {/* Barra lateral */}
<div
  className={`fixed top-0 right-0 h-full bg-white text-black transition-transform duration-500 ease-in-out border-t-4 border-l-4 border-blue-500`}
  style={{ width: '450px', transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
>
  <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Detalles del evento</h2>
    <form onSubmit={handleCreateEvent} className="space-y-4">
      <input
        type="text"
        id="title"
        name="title"
        value={form.title}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
        required
        placeholder="Título del evento"
      />
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
        required
        placeholder="Descripción"
      />
      <input
        type="datetime-local"
        id="startTime"
        name="startTime"
        value={form.startTime}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
        required
      />
      <input
        type="datetime-local"
        id="endTime"
        name="endTime"
        value={form.endTime}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
        required
      />
      <input
        type="text"
        id="location"
        name="location"
        value={form.location}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
        placeholder="Ubicación"
      />
      <select
        id="status"
        name="status"
        value={form.status}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
      >
        <option value="realizado">Realizado</option>
        <option value="pendiente">Pendiente</option>
        <option value="cancelado">Cancelado</option>
      </select>
      <input
        type="text"
        id="tags"
        name="tags"
        value={form.tags}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
        placeholder="Tags separados por comas"
      />
      <select
        id="visibility"
        name="visibility"
        value={form.visibility}
        onChange={handleInputChange}
        className="w-full p-2 rounded-md border-black"
      >
        <option value="publico">Público</option>
        <option value="privado">Privado</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700">
        Crear Evento
      </button>
    </form>
  </div>
</div>


      {/* Modal de actualización */}
      {isUpdateModalOpen && (
        <div id="update-modal" className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={closeUpdateModal}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Actualizar evento</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdateEvent(eventToUpdate._id, form); }}>
                  <input type="text" id="title" name="title" value={form.title} onChange={handleInputChange} className="w-full p-2 rounded-md" required placeholder="Título del evento" />
                  <textarea id="description" name="description" value={form.description} onChange={handleInputChange} className="w-full p-2 rounded-md" required placeholder="Descripción" />
                  <input type="datetime-local" id="startTime" name="startTime" value={form.startTime} onChange={handleInputChange} className="w-full p-2 rounded-md" required />
                  <input type="datetime-local" id="endTime" name="endTime" value={form.endTime} onChange={handleInputChange} className="w-full p-2 rounded-md" required />
                  <input type="text" id="location" name="location" value={form.location} onChange={handleInputChange} className="w-full p-2 rounded-md" placeholder="Ubicación" />
                  <select id="status" name="status" value={form.status} onChange={handleInputChange} className="w-full p-2 rounded-md">
                    <option value="realizado">Realizado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                  <input type="text" id="tags" name="tags" value={form.tags} onChange={handleInputChange} className="w-full p-2 rounded-md" placeholder="Tags separados por comas" />
                  <select id="visibility" name="visibility" value={form.visibility} onChange={handleInputChange} className="w-full p-2 rounded-md">
                    <option value="publico">Público</option>
                    <option value="privado">Privado</option>
                  </select>
                  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md mt-4">Actualizar Evento</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de eliminación */}
      {isModalOpen && (
        <div id="delete-modal" className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={closeDeleteModal}
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">¿Estás seguro de que quieres eliminar este evento?</h3>
                <button
                  className="w-full bg-red-600 text-white py-2 rounded-md"
                  onClick={() => handleDeleteEvent(eventToDelete._id)}
                >
                  Eliminar Evento
                </button>
                <button
                  className="w-full bg-gray-300 text-black py-2 rounded-md mt-4"
                  onClick={closeDeleteModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
          {/* Botón para abrir/cerrar la barra lateral */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-5 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? 'Cerrar' : 'Crear Evento'}
      </button>
    </div>
  );
};

export default Sidebar;
