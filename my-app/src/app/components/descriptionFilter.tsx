import GenericFilter from "./filter";

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedDescription, onDescriptionChange }) => {
  const fetchData = async () => {
    const url = 'http://127.0.0.1:5000/description_types';
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const data = JSON.parse(jsonResponse.data);
    return data.map((item: any) => item.description);
  };

  return (
    <GenericFilter
      label="Description"
      placeholder="SELECT ALL"
      fetchData={fetchData}
      selectedValue={selectedDescription}
      onValueChange={onDescriptionChange}
    />
  );
};

export default TypeFilter;

