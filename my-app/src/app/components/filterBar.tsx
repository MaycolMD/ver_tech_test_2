'use client'
// pages/Sidebar.tsx

import Link from 'next/link';
import DateFilter from './dateFilter';
import { useState } from 'react';
import PrimaryTypeFilter from './primaryTypeFilter';
import DescriptionFilter from './descriptionFilter';
import LocationFilter from './location_descriptionFilter';
import ArrestFilter from './arrestFilter';
import DistrictFilter from './districtFilter';

interface FilterBarProps {
  onDataReceived: (data: any) => void; // Ajusta el tipo de datos según tu respuesta JSON
  onDataReceived_d: (data: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onDataReceived, onDataReceived_d }) =>  {
  const [respuesta, setRespuesta] = useState('');
  const [respuesta_d, setRespuesta_d] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedPrimaryType, setselectedPrimaryType] = useState<string>('');
  const [selectedDescription, setselectedDescription] = useState<string>('');
  const [selectedLocation, setselectedLocation] = useState<string>('');
  const [selectedArrest, setselectedArrest] = useState<string>('');
  const [selectedDistrict, setselectedDistrict] = useState<string>('');

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handlePrimaryTypeChange = (type: string) => {
    setselectedPrimaryType(type);
  };

  const handleDescriptionChange = (type: string) => {
    setselectedDescription(type);
  };

  const handleLocationChange = (type: string) => {
    setselectedLocation(type);
  };

  const handleArrestChange = (type: string) => {
    setselectedArrest(type);
  };

  const handleDistrictChange = (type: string) => {
    setselectedDistrict(type);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    try {
      const url = `http://127.0.0.1:5000/execute_query?date=${selectedDate}&primary_type=${selectedPrimaryType}&description=${selectedDescription}&location_description=${selectedLocation}&arrest=${selectedArrest}&district=${selectedDistrict}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const jsonResponse = await response.json();

      const data = JSON.parse(jsonResponse.data);
      
      const url_d = `http://127.0.0.1:5000/query_year?primary_type=${selectedPrimaryType}&description=${selectedDescription}&location_description=${selectedLocation}&arrest=${selectedArrest}&district=${selectedDistrict}`;
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

  const handleSaveQuery = async () => {
    const nameInput = prompt('Ingrese el nombre del query:');
    if (nameInput !== null) {

      const commentInput = prompt('Ingrese un comentario para el query:');
      if (commentInput !== null) {
        const usernameInput = JSON.parse(localStorage.getItem('usuario') || 'Guest');
        if (usernameInput !== null) {
          const queryData = {
            name: nameInput,
            comment: commentInput,
            username: usernameInput,

            date: selectedDate,
            primaryType: selectedPrimaryType,
            description: selectedDescription,
            location: selectedLocation,
            arrest: selectedArrest,
            district: selectedDistrict,
          };
          try {
            const url = 'http://127.0.0.1:5000/save_query'; // Reemplaza con la URL real de tu backend
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(queryData),
            });
        
            if (response.ok) {
              // Éxito, puedes manejar la respuesta aquí si es necesario
              console.log('Query guardado con éxito');
            } else {
              // Manejar errores de la respuesta
              console.error('Error al guardar el query:', response.statusText);
            }
          } catch (error) {
            // Manejar errores de la solicitud
            console.error('Error en la solicitud:', error);
          }

        }
      }
    }
  };

  return (
    <div className="bg-gray-800 h-screen text-white w-1/4 p-4 rounded-md shadow-md mt-10 ml-5">
      <h1 className="text-4xl font-bold mb-4 text-center mt-6 text-purple-800">Filters</h1>
      <ul className="list-none p-0">
        <form onSubmit={submit} className="space-y-4">
          <li>
            <DateFilter selectedDate={selectedDate} onDateChange={handleDateChange} />
          </li>

          <li>
            <PrimaryTypeFilter selectedPrimaryType={selectedPrimaryType} onPrimaryTypeChange={handlePrimaryTypeChange} />
          </li>

          <li>
            <DescriptionFilter selectedDescription={selectedDescription} onDescriptionChange={handleDescriptionChange} />
          </li>

          <li>
            <LocationFilter selectedLocation={selectedLocation} onLocationChange={handleLocationChange} />
          </li>

          <li>
            <ArrestFilter selectedArrest={selectedArrest} onArrestChange={handleArrestChange} />
          </li>

          <li>
            <DistrictFilter selectedDistrict={selectedDistrict} onDistrictChange={handleDistrictChange} />
          </li>

          <div className="flex justify-center mt-6 space-x-4">
            <button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
              Run Query
            </button>

            <button
              type="button"
              onClick={handleSaveQuery}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            >
              Save Query
            </button>
          </div>
        </form>
      </ul>
    </div>

  
  );
};

export default FilterBar;
