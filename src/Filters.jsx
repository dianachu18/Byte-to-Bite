import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    setSelectedFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
    );
  };

  React.useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <div className="filters">
      <h3>Filters and Diets:</h3>
      {["gluten free", "ketogenic", "vegetarian", "lacto ovo vegetarian", "pescetarian", "vegan", "paleolithic", "primal"
        , "fodmap friendly", "whole 30", "dairy free"].map((filter) => (
        <label key={filter}>
          <input
            type="checkbox"
            value={filter}
            checked={selectedFilters.includes(filter)}
            onChange={handleFilterChange}
          />
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default Filters;
