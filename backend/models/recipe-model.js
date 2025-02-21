const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    spoonacularId: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    image: { type: String },  //image url
    usedIngredientCount: { type: Number },
    missedIngredientCount: { type: Number },
    usedIngredients: [{ name: String, amount: Number, unit: String }],  
    missedIngredients: [{ name: String, amount: Number, unit: String }],  
    unusedIngredients: [{ name: String, amount: Number, unit: String }],
    likes: { type: Number }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
