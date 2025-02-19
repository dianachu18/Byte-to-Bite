const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); 
const Recipe = require("./models/recipe-model");
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


app.listen(5000, () => console.log('Server running on port 5000'));

