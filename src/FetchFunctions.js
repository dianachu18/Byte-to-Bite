export async function addUser(email, username, password) {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, username: username, password: password}),
    });
    const data = await response.json();
    console.log(data);
  };

  export async function login(email, password) {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password}),
    });
    const data = await response.json();
    console.log(data);
  };

  export async function getUser(userId) {
    const response = await fetch("http://localhost:5000/profiles/" + userId);
    const data = await response.json();
    console.log(data);
};

  export async function save(userId, recipeId) {
    const response = await fetch("http://localhost:5000/profiles/" + userId + "/savedrecipes", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({recipeId: recipeId}),
    });
    const data = await response.json();
    console.log(data);
  };

  export async function unsave(userId, recipeId) {
    const response = await fetch("http://localhost:5000/profiles/" + userId + "/unsaveRecipe", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({recipeId: recipeId}),
    });
    const data = await response.json();
    console.log(data);
  };