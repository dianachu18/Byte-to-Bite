const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); 
const multer = require('multer');
const Recipe = require("./models/recipe-model");
const Profile = require("./models/profile-model"); 
require('dotenv').config();
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Nodemailer Transporter for sharing via email
const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); //images will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); //unique filename
    }
  });
  
const upload = multer({ storage: storage }).single('image');
// Route to search for recipes based on ingredients
app.get("/searchRecipes", async (req, res) => {
    const ingredients = req.query.ingredients.split(",");
    if (!ingredients) return res.status(400).json({ error: "Ingredients required" });

    try {
        const recipes = await findBestRecipes(ingredients);
        res.json(recipes);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

// fetch recipe by id
app.get('/recipes/:id', async (req, res) => {
  try 
  {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) 
    {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } 
  catch (error) 
  {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

//route to save custom recipes with image upload
app.post("/saveRecipe", (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: "An unknown error occurred" });
      }
      next(); 
    });
  }, async (req, res) => {
    try {
      const recipeData = req.body;
  
      if (!recipeData.title) {
        return res.status(400).json({ error: "Recipe title is required" });
      }
  
      const existingRecipe = await Recipe.findOne({ title: recipeData.title });
      if (existingRecipe) {
        return res.status(200).json({ message: "Recipe already exists", recipe: existingRecipe });
      }
  
      let imageUrl = "";
      if (req.file) {
        imageUrl = "http://localhost:5001/uploads/" + req.file.filename;
        console.log(req.file.filename);
      } 
    //   else if (recipeData.image) {
    //     imageUrl = recipeData.image; 
    //   }
  
      const newRecipe = new Recipe({
        title: recipeData.title,
        image: imageUrl,
        ingredients: recipeData.ingredients ? JSON.parse(recipeData.ingredients) : [],
        diets: recipeData.diets ? JSON.parse(recipeData.diets) : [],
        instructions: recipeData.instructions ? JSON.parse(recipeData.instructions) : [],
        reviews: []
      });
  
      await newRecipe.save();
      console.log("Saved recipe:", newRecipe); // Add this log
      res.status(201).json({ message: "Recipe saved successfully", recipe: newRecipe });
    } catch (error) {
      console.error("Error saving recipe:", error);
      res.status(500).json({ error: "Failed to save recipe" });
    }
  });


//route to review a recipe
app.post("/recipes/:id/review", async (req, res) => {
  try {
      const { userId, rating, comment } = req.body;
      const recipeId = req.params.id;

      if (!userId || !rating || rating < 1 || rating > 5) {
          return res.status(400).json({ error: "Valid userId and rating (1-5) required" });
      }

      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
          return res.status(404).json({ error: "Recipe not found" });
      }

      //add a new review
      recipe.reviews.push({
          userId,
          rating,
          comment: comment || "", //comment on the review is optional
          date: new Date()
      });

      await recipe.save();
      res.json({ message: "Review added successfully", recipe });

  } 
  catch (error) {
      console.error("Error adding review:", error);
      res.status(500).json({ error: "Failed to add review" });
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
        .populate('savedRecipes', 'title spoonacularId'); 

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

// Route to login
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

app.get('/getUserByUsername/:username', async (req, res) => {
    try {
      const username = req.params.username;
      
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }
      
      const user = await Profile.findOne({ username });
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Return just the user ID
      res.json({ userId: user._id });
    } 
    catch (error) {
      console.error('Error fetching user ID:', error);
      res.status(500).json({ error: 'Failed to fetch user ID' });
    }
  });

// Route to send a recipe via email
app.post("/shareRecipe", async (req, res) => {
    const { recipientEmail, recipeId } = req.body;

    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: recipientEmail,
            subject: `Check out this recipe: ${recipe.title}`,
            html: `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; max-width: 300px;">
                <h3>Ingredients:</h3>
                <ul>${recipe.ingredients.map(ing => `<li>${ing.amount} ${ing.unit} - ${ing.name}</li>`).join('')}</ul>
                <h3>Instructions:</h3>
                <p>${recipe.instructions.join("<br>")}</p>
                <p>Enjoy!</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending recipe email:", error);
        res.status(500).json({ error: "Failed to send recipe" });
    }
});

// recipe search algorithm
const findBestRecipes = async (userIngredients) => {
    // Use RegExp object to convert into an array of case-insensitive regular expressions for better ingredient matching.
    const regexIngredients = userIngredients.map(ingredient => new RegExp(ingredient, "i"));
    
    const recipes = await Recipe.aggregate([
        {
            // isolate Recipe object's ingredients to just their names
            $addFields: {
                ingredientNames: {
                    $map: {
                        input: "$ingredients",
                        as: "ingredient",
                        in: "$$ingredient.name" 
                    }
                }
            }
        },
        // keep track of 2 scores: match and missing. Sort through who has best results
        {
            $addFields: {
                match_count: {
                    $size: {
                        $filter: {
                            input: "$ingredientNames",
                            as: "ingredient",
                            cond: {
                                $in: [true, regexIngredients.map(regex => { 
                                    return { $regexMatch: { input: "$$ingredient", regex: regex }} 
                                })] 
                            }
                        }
                    }
                },
                missing_count: {
                    $subtract: [
                        { $size: "$ingredientNames" },
                        { $size: { $setIntersection: ["$ingredientNames", userIngredients] } }
                    ]
                }
            }
        },
        {
            // only include recipes with at least 1 matched ingredient
            $match: {
                match_count: { $gt: 0 }
            }
        },
        {
            $sort: { match_count: -1, missing_count: 1 }
        },
        {
            $limit: 10 // limit array to 10 recipes
        }
    ]);

    return recipes;
};

app.listen(5001, () => console.log('Server running on port 5001'));

