const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    
    
    title: { type: String, required: true },
    image: { type: String },  //image url
    ingredients: [{
        name: String,
        amount: Number,
        unit: String
    }],
    

    diets: [{ type: String }],

    
    instructions: [{ type: String }],

    reviews: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" }, 
        rating: { type: Number, min: 1, max: 5, required: true }, 
        comment: { type: String, required: false }, //comment is optional
        date: { type: Date, default: Date.now } 
    }]
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
