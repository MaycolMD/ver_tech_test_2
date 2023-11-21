'use client'
// pages/Sidebar.tsx
import Link from 'next/link';
import DateFilter from './dateFilter';
import { useState } from 'react';

interface FilterBarProps {
  onDataReceived: (data: any) => void; // Ajusta el tipo de datos según tu respuesta JSON
  onDataReceived_d: (data: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onDataReceived, onDataReceived_d }) =>  {
  const [respuesta, setRespuesta] = useState('');
  const [respuesta_d, setRespuesta_d] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    try {
      const url = `http://127.0.0.1:5000/execute_query?date=${selectedDate}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const jsonResponse = await response.json();

      const data = JSON.parse(jsonResponse.data);

      const url_d = `http://127.0.0.1:5000/query_year?date=${selectedDate}`;
      const response_d = await fetch(url_d, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const jsonResponse_d = await response_d.json();

      const data_d = JSON.parse(jsonResponse_d.data);
      
      
      setRespuesta(data);
      setRespuesta_d(data_d);
      // Llama a la función onDataReceived para pasar los datos al componente padre
      onDataReceived(data);
      onDataReceived_d(data_d);
      
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="bg-black h-screen text-white w-1/4 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center mt-6">Filters</h1>
      <ul>
      <form onSubmit={submit} >
        <li>
          <DateFilter selectedDate={selectedDate} onDateChange={handleDateChange} />
        </li>

        <li>
          <Link className="text-purple-500 hover:text-purple-700" href="/querybuilder">
            Query Builder
          </Link>
        </li>
        <li>
          <Link className="text-purple-500 hover:text-purple-700" href="/queryhub">
            Query Hub
          </Link>
        </li>

        <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded ">
          Run Query
        </button>
      </form>
      </ul>
    </div>
  );
};

export default FilterBar;
