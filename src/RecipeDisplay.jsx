import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./RecipeDisplayStyle.css";
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
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  let current_rating = 0;

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const computeCurrentRating = () => {
    let sum = 0;
    if (recipe && recipe.reviews && recipe.reviews.length > 0) {
      for (let i = 0; i < recipe.reviews.length; i++) {
        sum += recipe.reviews[i].rating;
      }
      current_rating = Math.round(sum / recipe.reviews.length);
    }
  }

  React.useEffect(() => {
    const recipeData = JSON.parse(localStorage.getItem('recipeState'));
    if (recipeData) {
        setRecipe(recipeData);
    }
  }, []);

  computeCurrentRating();

  if (!recipe) {
    return <div>Please give us a moment...</div>;
  }

  return (
    <div className="recipe-container">
      <h2 className="recipe-name">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <div className="current-rating">
        {[...Array(5)].map((_, index) =>
          // need to check if this is working after populating some values on the server
          index < current_rating ? (
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
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}: {ingredient.amount} {ingredient.unit}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol className="recipe-instructions">
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="recipe-rating">
        <p>Let us know how you like this recipe!</p>
          {Array(5).fill().map((_, index) => (
              <button
                key={index}
                className="star"
                onClick={() => handleStarClick(index)}
              >
                {index < rating ? (<FaStar key={index} className="star filled" />) 
                : (<FaRegStar key={index} className="star" />)}
              </button>
            ))}
          <p className="current_rating">{rating} of 5</p>
        </div>

    </div>
  );
}

export default RecipeDisplay;
