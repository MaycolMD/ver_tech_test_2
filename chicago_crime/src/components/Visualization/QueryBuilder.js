// QueryBuilder.js
import React, { useState } from 'react';

const QueryBuilder = ({ executeQuery }) => {
  const [query, setQuery] = useState('');

  const handleExecuteQuery = () => {
    // Lógica para ejecutar la consulta y pasarla al componente de visualización
    executeQuery(query);
  };

  return (
    <div>
      <textarea value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleExecuteQuery}>Ejecutar Consulta</button>
    </div>
  );
};

export default QueryBuilder;
