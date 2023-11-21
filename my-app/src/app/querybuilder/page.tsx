'use client'
import FilterBar from '../components/filterBar';
import BarChart from '../chartComponents/BarChart'; 
import DataTable from '../chartComponents/table'; 

import { useState } from 'react';

export default function Page () {
    const [chartData, setChartData] = useState<any>(null);
    const [chartData_d, setChartData_d] = useState<any>(null);

    const handleDataReceived = (data: any) => {
        // Maneja los datos como desees
        setChartData(data);
    };
    const handleDataReceived_d = (data_d: any) => {
        // Maneja los datos como desees
        setChartData_d(data_d);
    };

    return (
    <div className="flex">
        <FilterBar onDataReceived={handleDataReceived} onDataReceived_d={handleDataReceived_d} />
        <div className="flex-grow p-4 flex flex-col items-center">
          <div className="bg-white p-8 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Bar Chart</h2>
            <div className="flex items-center justify-center">
              <BarChart data={chartData_d} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">Data Table</h2>
            <DataTable data={chartData} />
          </div>
        </div>
      </div>
      
    )
}