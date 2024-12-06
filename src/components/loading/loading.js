import React from 'react';
import './loading.css'; // Certifique-se de importar o CSS

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
