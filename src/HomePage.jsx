// HomePage.jsx
import React, { useState } from "react";
import { CardList } from './CardList';
import InputTag from './InputTag';
import Filters from './Filters'; 

export function HomePage() {

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    console.log(selectedFilters);
  };

  return (
    <>
      <div className="upper-space">
        <button className="login-button">Sign In
          <img src={'./src/assets/icons8-user-50.png'} className="user-pic" />
        </button>
      </div>
      <div className="login-body">
        <h1 className="byte-to-bite-logo">Byte-to-Bite</h1>
        {/* <input type="text" placeholder="Search for recipe..." className="login-search" /> */}
        <InputTag />
        <span className="search-button">
          <img src={"./src/assets/icons8-magnifying-glass-50.png"} />
        </span>

        <Filters onFilterChange={handleFilterChange} />

        <div>
          <CardList />
        </div>
      </div>
    </>
  );
}
