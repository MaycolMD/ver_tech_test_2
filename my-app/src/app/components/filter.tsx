import React, { useState, useEffect } from 'react';

interface FilterProps {
  label: string;
  placeholder: string;
  fetchData: () => Promise<string[]>;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const GenericFilter: React.FC<FilterProps> = ({
  label,
  placeholder,
  fetchData,
  selectedValue,
  onValueChange,
}) => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await fetchData();
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [fetchData]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white-700 text-[20px]">{label}:</label>
      {options.length > 0 ? (
        <select
          className="mt-1 p-2 border rounded-md w-full bg-[#4A5568]"
          value={selectedValue}
          onChange={(e) => onValueChange(e.target.value)}
        >
          <option key="default" value="">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <p>Loading {label.toLowerCase()}...</p>
      )}
    </div>
  );
};

export default GenericFilter;
