import React, { useState } from "react";
import { CardList } from './CardList';
import { useNavigate } from "react-router-dom";
import InputTag from './InputTag';
import Filters from './Filters'; 
import './SearchPageStyle.css';

export function SearchPage() {

  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [first10, setFirst10] = useState([]);
  const [displayData, setDisplayData] = useState([]);


  const handleFilterChange = (value, checked) => {
    setSelectedFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
    );

  };

  const handleDisplayData = () => {
    const filteredRecipes = first10.filter((recipe) => {
      return (
        (selectedFilters.length === 0 || selectedFilters.every((diet) => recipe.diets.includes(diet)))
      );
    });

    setDisplayData(filteredRecipes);
  }

  React.useEffect(() => {
    handleDisplayData();
  }, [selectedFilters]);

  React.useEffect(() => {
    setDisplayData(first10);
    handleDisplayData();
  }, [first10]);

  const handleSearchResults = (data) => {
    setFirst10(data);
  };

  return (
    <>
      <div className="search-body">
        <button type="button" className="user-button" onClick={() => navigate("/UserProfile")}> <img src= "./src/assets/icons8-user-50.png" /></button>
        <h1 className="byte-to-bite-logo">Byte-to-Bite</h1>
        {/* <input type="text" placeholder="Search for recipe..." className="login-search" /> */}

        <InputTag onSearchResults={handleSearchResults} />

        <span className="search-button">
          <img src={"./src/assets/icons8-magnifying-glass-50.png"} />
        </span>

        <div className="recipe-wrapper">
          <Filters stateValue={selectedFilters} onFilterChange={handleFilterChange} />
          {displayData.length > 0 && <CardList data={displayData} />}
          {/* <CardList /> */}
          
        </div>
        <button 
          className="create-recipe-btn" 
          onClick={() => navigate("/recipe-creation")}
        >
          Create Recipe
        </button>

      </div>
      
    </>
  );
}


// // HomePage.jsx
// import { CardList } from './CardList';
// import './HomePageStyle.css';

// export function HomePage() {
//   return (
//     <>
//       <div className="home-page">
//         <div>
//           <button className="login-button-hp">Sign In
//             <img src={'./src/assets/icons8-user-50.png'} className="user-pic" />
//           </button>
//         </div>
//         <div className="login-body">
//           <h1 className="byte-to-bite-logo">Byte-to-Bite</h1>
//           <input type="text" placeholder="Search for recipe..." className="login-search" />
//           <button className="search-button">
//             <img src={"./src/assets/icons8-magnifying-glass-50.png"} />
//           </button>
//           <div>
//             <CardList />
//           </div>
//         </div>
//         </div>
//     </>
//   );
// }

// export default HomePage;
