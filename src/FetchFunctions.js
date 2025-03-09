export async function addUser(email, username, password) {
    const response = await fetch("http://localhost:5001/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, username: username, password: password}),
    });
    const data = await response.json();
    console.log("register");
    console.log(data);
  };

  export async function login(email, password) {
    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password}),
    });
    const data = await response.json();
    console.log("login");
    console.log(data);
    if(response.status !== 400)
    {
      localStorage.setItem("userId", data.user.id);  
    }
  };

  export async function getUser(userId) {
    const response = await fetch("http://localhost:5001/profiles/" + userId);
    const data = await response.json();
    console.log("getUser");
    console.log(data);
    return data;
};

  export async function save(userId, recipeId) {
    const response = await fetch("http://localhost:5001/profiles/" + userId + "/savedrecipes", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({recipeId: recipeId}),
    });
    const data = await response.json();
    console.log("save");
    console.log(data);
  };

  export async function unsave(userId, recipeId) {
    const response = await fetch("http://localhost:5001/profiles/" + userId + "/unsaveRecipe", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({recipeId: recipeId}),
    });
    const data = await response.json();
    console.log("unsave");
    console.log(data);
  };

  export async function review(recipeId, userId, rating, comment) {
    const response = await fetch("http://localhost:5001/recipes/" + recipeId + "/review", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({userId: userId, rating: rating, comment: comment}),
    });
    const data = await response.json();
    console.log("review");
    console.log(data);
  };