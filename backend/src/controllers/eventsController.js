const Events = require('../models/events');
const Users = require('../models/users');



// Crear un evento

exports.createEvent = async (req, res) => {
    try {
      const { userId, startTime, endTime, ...eventData } = req.body;
  
      // Verifica si el usuario existe
      const userExists = await Users.findById(userId);
      if (!userExists) {
        return res.status(400).json({ message: 'El usuario no existe' });
      }
  
      // Verifica si hay eventos que se solapen con el nuevo evento
      const overlappingEvent = await Events.findOne({
        userId,
        $or: [
          { startTime: { $lt: endTime, $gte: startTime } },
          { endTime: { $gt: startTime, $lte: endTime } },
          { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
        ]
      });
  
      if (overlappingEvent) {
        return res.status(400).json({ message: 'Ya existe un evento en este horario' });
      }
  
      // Crea el nuevo evento si no hay solapamiento
      const newEvent = new Events({ userId, startTime, endTime, ...eventData });
      await newEvent.save();
  
      res.status(201).json({ message: 'Evento creado con éxito', event: newEvent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el evento', error });
    }
  };
  


// Obtener eventos por userId (si se pasa en la URL)
exports.getAllEvents = async (req, res) => {
    try {
        const userId = req.query.userId; // Ahora se obtiene de la query

        if (!userId) {
            return res.status(400).json({ message: 'Falta el userId en la solicitud' });
        }

        const userEvents = await Events.find({ userId });

        if (userEvents.length === 0) {
            return res.status(200).json([]); // Aquí devolvemos una lista vacía
        }

        res.status(200).json(userEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos', error: error.message });
    }
};

// Obtener un evento por ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento', error: error.message });
    }
};




// Actualizar un evento

exports.updateEvent = async (req, res) => {
    try {
        const upEvent = await Events.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!upEvent){
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(upEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el evento', error });      
    };
};

//Elimina un evento 
exports.deleteEvent = async (req, res) => {
    try {
        const delEvent = await Events.findByIdAndDelete(req.params.id);
        if(!delEvent){
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json({ message: 'Evento eliminado' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el evento', error });
        
    };
};
