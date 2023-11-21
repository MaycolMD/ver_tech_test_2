// components/Filters/DateFilter.tsx
import React from 'react';

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}


const DateFilter: React.FC<DateFilterProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white-700 text-[20px]">Date:</label>
      <input
        type="date"
        className="mt-1 p-2 border rounded-md w-full bg-[#4A5568] "
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
};

export default DateFilter;
