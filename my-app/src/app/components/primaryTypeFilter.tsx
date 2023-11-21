import GenericFilter from "./filter";

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedPrimaryType, onPrimaryTypeChange }) => {
  const fetchData = async () => {
    const url = 'http://127.0.0.1:5000/primary_types';
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const data = JSON.parse(jsonResponse.data);
    return data.map((item: any) => item.primary_type);
  };

  return (
    <GenericFilter
      label="Primary Type"
      placeholder="SELECT ALL"
      fetchData={fetchData}
      selectedValue={selectedPrimaryType}
      onValueChange={onPrimaryTypeChange}
    />
  );
};

export default TypeFilter;


