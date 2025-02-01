import React from "react";
import PropTypes from "prop-types";  // Importar PropTypes para las validaciones

const Card = ({ title, description, startTime, endTime }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4">
        <p><strong>Start Time:</strong> {new Date(startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> {new Date(endTime).toLocaleString()}</p>
      </div>
    </div>
  );
};

// PropTypes para validación
Card.propTypes = {
  title: PropTypes.string.isRequired,  // 'title' es requerido
  description: PropTypes.string,  // 'description' es opcional
  startTime: PropTypes.instanceOf(Date).isRequired,  // 'startTime' es requerido y debe ser de tipo Date
  endTime: PropTypes.instanceOf(Date).isRequired,  // 'endTime' es requerido y debe ser de tipo Date
};

export default Card;
