import GenericFilter from "./filter";

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedDistrict, onDistrictChange }) => {
  const fetchData = async () => {
    const options = Array.from({ length: 31 }, (_, index) => (index + 1).toString());
    return options;
  };

  return (
    <GenericFilter
      label="District"
      placeholder="SELECT ALL"
      fetchData={fetchData}
      selectedValue={selectedDistrict}
      onValueChange={onDistrictChange}
    />
  );
};

export default TypeFilter;