const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); 
const Recipe = require("./models/recipe-model");
const Profile = require("./models/profile-model"); 
require('dotenv').config();

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Route to search for recipes based on ingredients
app.get("/searchRecipes", async (req, res) => {
    const ingredients = req.query.ingredients;
    if (!ingredients) return res.status(400).json({ error: "Ingredients required" });

    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/findByIngredients`,
            {
                params: {
                    ingredients: ingredients,
                    number: 5, // Get 5 recipes
                    apiKey: SPOONACULAR_API_KEY
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

// route to get recipe information (for dietary restrictions and instructions)
app.get("/getRecipeInformation/:recipeId", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${req.params.recipeId}/information`,
            {
                params: {includeNutrition: true,
                         apiKey: SPOONACULAR_API_KEY
                        }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch recipe information" });
    }
    
})


//route to save (bookmark) recipe
app.post("/saveRecipe", async (req, res) => {
  const { id } = req.body;

  if (!id) {
      return res.status(400).json({ error: "Recipe ID is required" });
  }

  try {
      // Check if the recipe already exists in MongoDB
      const existingRecipe = await Recipe.findOne({ spoonacularId: id });

      if (existingRecipe) {
          return res.status(200).json({ message: "Recipe already exists", recipe: existingRecipe });
      }

      // If not found, fetch from Spoonacular API
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: { apiKey: process.env.SPOONACULAR_API_KEY }
      });

      const recipeData = response.data;

      //create a new recipe object with all details
      const newRecipe = new Recipe({
          spoonacularId: recipeData.id,
          title: recipeData.title,
          image: recipeData.image,
          usedIngredientCount: recipeData.extendedIngredients.length,
          missedIngredientCount: 0,  
          usedIngredients: recipeData.extendedIngredients.map(ing => ({
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit
          })),
          missedIngredients: [],  
          unusedIngredients: [],  
          likes: recipeData.aggregateLikes
      });

      await newRecipe.save();
      res.status(201).json({ message: "Recipe saved successfully", recipe: newRecipe });

  } catch (error) {
      console.error("Error fetching or saving recipe:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: "Failed to fetch or save recipe" });
  }
});


// route to delete recipes
app.delete("/deleteRecipe/:spoonacularId", async (req, res) => {
    try {
        const id = Number(req.params.spoonacularId);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid spoonacularId " });
        }

        const deletedRecipe = await Recipe.findOneAndDelete({ spoonacularId: id });

        if (!deletedRecipe) {
            return res.status(400).json({ error: "Recipe not found" });
        }

        res.json({message: "Recipe deleted successfully", deletedRecipe });
    } catch (err) {
        console.error("Error deleting recipe:", err);
        res.status(500).json({ error: "Failed to delete recipe" });
    }
});

//create profile
app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        if (!email || !username || !password) {
            return res.status(400).json({ error: "Missing fields" });
        }

        //check if user/email already exists
        const existingUser = await Profile.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or username is already taken" });
        }
        


        const newProfile = new Profile({
            email,
            username,
            password 
        });

        await newProfile.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Failed to register user" });
    }
});

app.get('/profiles/:id', async (req, res) => {
    try {
      // Use .populate('savedRecipes') to replace IDs in savedRecipes
      // with the actual Recipe documents
      const userProfile = await Profile.findById(req.params.id)
        .populate('savedRecipes', 'title spoonacularId'); // or .populate('savedRecipes', 'title spoonacularId')

      // if user not found
      if (!userProfile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // Return the entire user profile, including saved recipe info
      res.json(userProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  });

// Update a user's ingredients array
app.put('/profiles/:id/ingredients', async (req, res) => {
    try {
      const userId = req.params.id;
      const { ingredients } = req.body;  // should be an array of strings
  
      // Find the user by ID
      const userProfile = await Profile.findById(userId);
      if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Set or replace the user's ingredients
      userProfile.ingredients = ingredients;
      await userProfile.save();
  
      res.json({ 
        message: 'Ingredients updated successfully', 
        profile: userProfile 
      });
    } catch (error) {
      console.error('Error updating ingredients:', error);
      res.status(500).json({ error: 'Failed to update ingredients' });
    }
  });

//add a saved recipe to the user's profile
app.post('/profiles/:id/savedRecipes', async (req, res) => {
    try {
      const userId = req.params.id;
      const { recipeId } = req.body; // the _id of a Recipe in the DB
  
      //find the user
      const userProfile = await Profile.findById(userId);
      if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // if the recipe is already saved
      if (userProfile.savedRecipes.includes(recipeId)) {
        return res.status(400).json({ error: 'Recipe is already saved' });
      }
  
      
      userProfile.savedRecipes.push(recipeId);
      await userProfile.save();
  
      res.json({ 
        message: 'Recipe saved successfully',
        profile: userProfile
      });
    } catch (error) {
      console.error('Error adding saved recipe:', error);
      res.status(500).json({ error: 'Failed to add saved recipe' });
    }
  });

  // remove or unbookmark a user's saved recipe.
app.post('/profiles/:id/unsaveRecipe', async (req, res) => {
    try {
        const userId = req.params.id;
        const { recipeId } = req.body; // the _id of a Recipe in the DB

        // find user
        const userProfile = await Profile.findById(userId);
        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        // if the recipe is not bookmarked
        if (!userProfile.savedRecipes.includes(recipeId)) {
            return res.status(400).json({ error: 'Recipe is not saved' });
        }

        userProfile.savedRecipes.pull(recipeId);
        await userProfile.save();
  
        res.json({
            message: 'Recipe unsaved successfully',
            profile: userProfile
        });
    } catch (error) {
        console.error('Error unsaving recipe:', error);
        res.status(500).json({ error: 'Failed to unsave recipe' });
    }
});

  app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await Profile.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (password !== user.password) {  
            return res.status(400).json({ error: "Invalid password" });
        }

        res.json({ message: "Login successful",  user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Failed to log in" });
    }
});

  
app.listen(5000, () => console.log('Server running on port 5000'));

