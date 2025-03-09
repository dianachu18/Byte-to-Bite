import React, { useState } from "react";

const Filters = ({ stateValue, onFilterChange }) => {

  const handleFilterChange2 = (event) => {
    const { value, checked } = event.target;
    onFilterChange(value, checked);
  };

  return (
    <div className="filters">
      <h3>Filters and Diets:</h3>
      {["gluten free", "ketogenic", "vegetarian", "lacto ovo vegetarian", "pescatarian", "vegan", "paleolithic", "primal"
        , "fodmap friendly", "whole 30", "dairy free"].map((filter) => (
        <label key={filter}>
          <input
            type="checkbox"
            value={filter}
            checked={stateValue.includes(filter)}
            onChange={handleFilterChange2}
          />
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default Filters;
