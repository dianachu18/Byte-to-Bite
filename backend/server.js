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



// route to save (bookmark) recipe
app.post("/saveRecipe", async (req, res) => {
    const { id, title } = req.body;

    // Check if id is valid
    if (!id) {
        return res.status(400).json({ error: "Invalid or missing Recipe ID" });
    }

    try {
        // Prevent bookmarking a saved recipe
        const existingRecipe = await Recipe.findOne({ spoonacularId: id });

        if (existingRecipe) {
            return res.status(400).json({ error: "Recipe is already saved" });
        }

        const newRecipe = new Recipe({
            spoonacularId: id,
            title: title
        });

        await newRecipe.save();
        res.status(201).json({ message: "Recipe saved successfully" });
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).json({ error: "Failed to save recipe" });
    }
});

// route to delete (unbookmark) recipes
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

// Add a saved recipe to the user's profile
app.post('/profiles/:id/savedRecipes', async (req, res) => {
    try {
      const userId = req.params.id;
      const { recipeId } = req.body; // the _id of a Recipe in the DB
  
      // Find the user
      const userProfile = await Profile.findById(userId);
      if (!userProfile) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the recipe is already saved
      if (userProfile.savedRecipes.includes(recipeId)) {
        return res.status(400).json({ error: 'Recipe is already saved' });
      }
  
      // Push the recipe into the savedRecipes array
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

  
  
app.listen(5000, () => console.log('Server running on port 5000'));

