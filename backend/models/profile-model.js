const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  savedRecipes: [{
    
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  //users ingredients kept as an array of strings...
  ingredients: [String]
});

module.exports = mongoose.model('Profile', ProfileSchema);
