import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeDisplayStyle.css";
import { FaStar, FaRegStar, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { save, unsave, review, getRecipe, share, getUsernameById } from "./FetchFunctions.js";
import userIcon from "/src/assets/icons8-user-50.png";

export function RecipeDisplay() {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [userReviews, setUserReviews] = useState([]);

  const toggleBookmark = async () => {
    if (!bookmarked && recipe) {
      await save(userId, recipe._id);
    } else if (recipe) {
      await unsave(userId, recipe._id);
    }
    setBookmarked(!bookmarked);
  };

  const handleStarClick = async (index) => {
    const newRating = index + 1;
    setRating(newRating);
    await review(recipe._id, userId, newRating, comment);
    setComment("");
    updateRecipe(recipe);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (email) {
      alert(`Email shared: ${email}`);
      await share(email, recipe._id);
      setEmail("");
    } else {
      alert('Please enter a valid email address.');
    }
  };

  const computeCurrentRating = (recipe) => {
    if (recipe?.reviews?.length > 0) {
      const sum = recipe.reviews.reduce((acc, review) => acc + review.rating, 0);
      setCurrentRating(Math.round(sum / recipe.reviews.length));
    }
  };

  const updateRecipe = async (recipe) => {
    const updatedRecipe = await getRecipe(recipe._id);
    setRecipe(updatedRecipe);
    
    // Fetch usernames for reviews
    const reviewsWithUsers = await Promise.all(
      updatedRecipe.reviews.map(async (review) => {
        const username = await getUsernameById(review.userId);
        return { ...review, username };
      })
    );
    setUserReviews(reviewsWithUsers);
  };

  useEffect(() => {
    const recipeData = JSON.parse(localStorage.getItem('recipeState'));
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");

    if (recipeData) {
      updateRecipe(recipeData);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    computeCurrentRating(recipe);
  }, [recipe]);

  if (!recipe) {
    return <div>Please give us a moment...</div>;
  }

  return (
    <>
      <button type="button" className="user-button" onClick={() => navigate("/UserProfile")}>
        <img src={userIcon} alt="User Profile" />
      </button>
      <div className="recipe-container">
        <h2 className="recipe-name">{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="current-rating">
          {[...Array(5)].map((_, index) => (
            index < currentRating ? (
              <FaStar key={index} className="star filled" />
            ) : (
              <FaRegStar key={index} className="star" />
            )
          ))}
        </div>
        <button className="bookmark-btn" onClick={toggleBookmark}>
          {bookmarked ? <FaBookmark /> : <FaRegBookmark />} Bookmark
        </button>
        
        <h3 className="rd-h3">Ingredients:</h3>
        <ul className="recipe-ingredients">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}: 
              {ingredient.amount} {ingredient.unit}
            </li>
          ))}
        </ul>
        
        <h3 className="rd-h3">Instructions:</h3>
        <ol className="recipe-instructions">
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="recipe-rating">
          <p>Let us know how you like this recipe!</p>
          <div className="rating-container">
            {Array(5).fill().map((_, index) => (
              <button
                key={index}
                className="star"
                onClick={() => handleStarClick(index)}
              >
                {index < rating ? <FaStar className="star filled" /> : <FaRegStar className="star" />}
              </button>
            ))}
            <span className="current-rating-text">{rating} of 5</span>
          </div>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write your review here..."
            className="review-comment"
          />
        </div>

        <div className="reviews-section">
          <h3 className="rd-h3">Reviews:</h3>
          {userReviews.length > 0 ? (
            userReviews.map((review, index) => (
              <div key={index} className="review-item">
                <p className="review-username">{review.username}</p>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    i < review.rating ? (
                      <FaStar key={i} className="star filled" />
                    ) : (
                      <FaRegStar key={i} className="star" />
                    )
                  ))}
                </div>
                <p className="review-comment-text">{review.comment}</p>
                <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>

        <div className="share-recipe">
          <p>Loved the recipe? Share it with your friends, enter email below:</p>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Please enter the email address of the recipient"
          />
          <button onClick={handleSubmit}>Share</button>
        </div>
      </div>
    </>
  );
}

export default RecipeDisplay;