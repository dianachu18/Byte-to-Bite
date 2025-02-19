const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    spoonacularId: { type: Number, unique: true, required: true }, // Ensure uniqueness
    title: String
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;