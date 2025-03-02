import "./UserProfile.css";

export function UserProfile() {
  // Sample user data (Replace with actual user data from a database or API)
  const user = {
    username: "john_doe",
    profilePic: "https://via.placeholder.com/150",
    email: "john.doe@example.com",
    savedRecipes: [
      { id: 1, title: "Spaghetti Carbonara", image: "https://via.placeholder.com/100" },
      { id: 2, title: "Chicken Alfredo", image: "https://via.placeholder.com/100" },
      { id: 3, title: "Avocado Toast", image: "https://via.placeholder.com/100" }
    ]
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.profilePic} alt="Profile" className="profile-pic" />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>

      <div className="saved-recipes">
        <h3>Saved Recipes</h3>
        <ul>
          {user.savedRecipes.map(recipe => (
            <li key={recipe.id} className="recipe-item">
              <img src={recipe.image} alt={recipe.title} className="recipe-img" />
              <span>{recipe.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
