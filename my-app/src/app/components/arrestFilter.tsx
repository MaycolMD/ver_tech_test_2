import GenericFilter from "./filter";

interface TypeFilterProps {
  selectedArrest: string;
  onArrestChange: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedArrest, onArrestChange }) => {
  const fetchData = async () => {
    const options = ['true', 'false'];
    return options;
  };

  return (
    <GenericFilter
      label="Arrested"
      placeholder="SELECT ALL"
      fetchData={fetchData}
      selectedValue={selectedArrest}
      onValueChange={onArrestChange}
    />
  );
};

export default TypeFilter;