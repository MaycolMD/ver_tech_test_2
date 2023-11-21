import GenericFilter from "./filter";

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedLocation, onLocationChange }) => {
  const fetchData = async () => {
    const url = 'http://127.0.0.1:5000/location_types';
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const data = JSON.parse(jsonResponse.data);
    return data.map((item: any) => item.location_description);
  };

  return (
    <GenericFilter
      label="Location Description"
      placeholder="SELECT ALL"
      fetchData={fetchData}
      selectedValue={selectedLocation}
      onValueChange={onLocationChange}
    />
  );
};

export default TypeFilter;


