const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Elimina espacios en blanco al inicio y final
    },
    description: {
      type: String,
      trim: true, // Descripción opcional
    },
    startTime: {
      type: Date,
      required: true, // Fecha y hora de inicio obligatorias
    },
    endTime: {
      type: Date,
      required: true, // Fecha y hora de fin obligatorias
    },
    location: {
      type: String,
      trim: true, // Ubicación opcional
    },
    status: {
      type: String,
      enum: ['realizado', 'pendiente', 'cancelado'], // Solo permite estos valores
      default: 'pendiente', // Valor predeterminado
    },
    tags: {
      type: [String], // Array de cadenas para etiquetas
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users', // Referencia al modelo 'User'
      required: true, // Obligatorio
    },
    visibility: {
      type: String,
      enum: ['publico', 'privado'], // Solo permite estos valores
      default: 'privado', // Valor predeterminado
    },
  },
  {
    timestamps: true, // Crea automáticamente `createdAt` y `updatedAt`
  }
);


module.exports = mongoose.model('Events', eventSchema);