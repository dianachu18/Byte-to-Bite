import { useState } from "react";
import "./MappedRecipeStyle.css";

const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    image: "https://via.placeholder.com/150",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
    dietary: ["gluten-free"],
    rating: 4,
  },
  {
    id: 2,
    name: "Chicken Curry",
    image: "https://via.placeholder.com/150",
    description: "A flavorful and spicy chicken curry made with a blend of aromatic spices.",
    dietary: ["vegan"],
    rating: 5,
  },
  {
    id: 3,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 4,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 5,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 6,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 7,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 8,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 9,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 10,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 11,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  },
  {
    id: 12,
    name: "Vegetable Stir Fry",
    image: "https://via.placeholder.com/150",
    description: "A healthy and quick stir fry with a variety of fresh vegetables and soy sauce.",
    dietary: ["vegan", "gluten-free"],
    rating: 3,
  }
];

export function MappedRecipe(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDietaryChange = (diet) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedDietary.length === 0 || selectedDietary.every((diet) => recipe.dietary.includes(diet))) &&
      (selectedRatings.length === 0 || selectedRatings.includes(recipe.rating))
    );
  });

  return (
    <div>
      <div className={`sidebar ${isMenuOpen ? "open" : "closed"}`}>
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        {isMenuOpen && (
          <div className="filters">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="filter-group">
              <h3>Dietary</h3>
              {['gluten-free', 'vegan', 'Gluten Free', 'Ketogenic', 
              'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Pescetarian', 'Vegan', 
              'Paleo', 'Primal', 'Low FODMAP', 'Whole30', 'Dairy Free'].map((diet) => (
                <label key={diet}>
                  <input
                    type="checkbox"
                    checked={selectedDietary.includes(diet)}
                    onChange={() => handleDietaryChange(diet)}
                  />
                  <span>{diet}</span>
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h3>Ratings</h3>
              {[1, 2, 3, 4, 5].map((rating) => (
                <label key={rating}>
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                  />
                  {rating} Stars
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="recipe-container">
        <h1> Search Results </h1>
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h2>{recipe.name}</h2>
              <p>{recipe.description}</p>
              <p>Rating: {recipe.rating} Stars</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MappedRecipe;