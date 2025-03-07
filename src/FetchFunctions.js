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