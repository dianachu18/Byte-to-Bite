//import "./UserProfile.css";
import React, { useState, useEffect } from "react";
import {getUser, getRecipe} from "./FetchFunctions.js"

export function UserProfile() {
  const [user, setUser] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId"); 

        if (userId) {
            getUser(userId).then((data) => {
                setUser(data);
            });
        }
    }, []);

  if (!user) {
      return <p>Loading user data...</p>;
  }

  const openRecipeInNewTab = async (recipeId) => {
    const recipe = await getRecipe(recipeId);
    localStorage.setItem('recipeState', JSON.stringify(recipe));
    window.open(`/recipe/${recipe._id}`, '_blank');
};
  return (
    
    <div className="user-profile">
      <div className="profile-header">
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>

      <div className="saved-recipes">
        <h3>Saved Recipes</h3>
        <ul>
          {user.savedRecipes.map(recipe => (
              <li key={recipe._id} className="recipe-item" onClick={() => openRecipeInNewTab(recipe._id)}>
              {/* <img src={recipe.image} alt={recipe.title} className="recipe-img" /> */}
              <span>{recipe.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
