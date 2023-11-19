// App.js
import React, { useState } from 'react';
import QueryBuilder from './components/Visualization/QueryBuilder';
import Visualization from './components/Visualization/Visualization';

const App = () => {
  const [queryResult, setQueryResult] = useState([]);

  const executeQuery = (query) => {
    // Lógica para ejecutar la consulta en el backend y obtener los resultados
    // Podrías utilizar fetch, axios, u otra librería para hacer la solicitud al backend

    // Ejemplo: Simulación de resultados
    const results = [10, 20, 30, 40, 50];
    setQueryResult(results);
  };

  return (
    <div>
      <QueryBuilder executeQuery={executeQuery} />
      <Visualization data={queryResult} />
    </div>
  );
};

export default App;
