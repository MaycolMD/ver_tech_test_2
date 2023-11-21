'use client'
import DataTable from '../chartComponents/table';
import { useState, useEffect } from 'react';

const Page = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url_d = `http://127.0.0.1:5000/saved-queries`;
        const response_d = await fetch(url_d, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const jsonResponse_d = await response_d.json();

        // Actualiza el estado con los datos obtenidos
        setChartData(jsonResponse_d.saved_queries);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    // Llama a la función para obtener los datos al cargar el componente
    fetchData();
  }, []); // La dependencia es un arreglo vacío para que se ejecute solo una vez al montar el componente

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-purple-200 p-8 rounded-lg shadow-md w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-4 text-center text-purple-800">Query History</h1>
        <p className="text-gray-800 text-center mb-6">Explore the saved queries in the database</p>

        <div className="flex-grow p-4">
          <DataTable data={chartData} />
        </div>
      </div>
    </div>


  );
};

export default Page;
