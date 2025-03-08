import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
//import "./RecipeDisplayStyle.css";
import { FaStar, FaRegStar, FaBookmark, FaRegBookmark } from "react-icons/fa";

// const recipe = {
//   image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/red-sauce-pasta-recipe.jpg",
//   name: "Delicious Pasta",
//   rating: 4,
//   ingredients: ["Pasta", "Tomato Sauce", "Garlic", "Basil", "Parmesan"],
//   instructions: [
//     "Boil water and cook pasta.",
//     "Heat sauce and add garlic.",
//     "Mix pasta with sauce and serve with Parmesan.",
//   ],
// };

export function RecipeDisplay() {
  const [bookmarked, setBookmarked] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState(location.state?.recipe || null);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <div className="recipe-container">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h2 className="recipe-name">{recipe.title}</h2>
      <div className="recipe-rating">
        {[...Array(5)].map((_, index) =>
          index < recipe.rating ? (
            <FaStar key={index} className="star filled" />
          ) : (
            <FaRegStar key={index} className="star" />
          )
        )}
      </div>
      <button className="bookmark-btn" onClick={toggleBookmark}>
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />} Bookmark
        </button>
      <h3>Ingredients:</h3>
      <ul className="recipe-ingredients">
        {recipe.ingredientNames.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol className="recipe-instructions">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDisplay;
