const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); 
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Route to search for recipes based on ingredients
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

app.get("/recipes", async (req, res) => {
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

app.listen(5000, () => console.log('Server running on port 5000'));
