import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCreationStyle.css"; 

export function RecipeCreation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: [""],
    diets: [""],
    image: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const handleChange = (e, index, field, type) => {
    const { name, value } = e.target;

    if (type === "ingredients") {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      };
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else if (type === "instructions") {
      const updatedInstructions = [...formData.instructions];
      updatedInstructions[index] = value;
      setFormData({ ...formData, instructions: updatedInstructions });
    } else if (type === "diets") {
      const updatedDiets = [...formData.diets];
      updatedDiets[index] = value;
      setFormData({ ...formData, diets: updatedDiets });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //file input for image
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  //adding new ingredient, instruction, or diet field
  const addField = (type) => {
    if (type === "ingredients") {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { name: "", amount: "", unit: "" }],
      });
    } else if (type === "instructions") {
      setFormData({
        ...formData,
        instructions: [...formData.instructions, ""],
      });
    } else if (type === "diets") {
      setFormData({
        ...formData,
        diets: [...formData.diets, ""],
      });
    }
  };

  //removing ingredient, instruction, or diet field
  const removeField = (index, type) => {
    if (type === "ingredients" && formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else if (type === "instructions" && formData.instructions.length > 1) {
      const updatedInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData({ ...formData, instructions: updatedInstructions });
    } else if (type === "diets" && formData.diets.length > 1) {
      const updatedDiets = formData.diets.filter((_, i) => i !== index);
      setFormData({ ...formData, diets: updatedDiets });
    }
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("ingredients", JSON.stringify(formData.ingredients));
    data.append("instructions", JSON.stringify(formData.instructions));
    data.append("diets", JSON.stringify(formData.diets));
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch("http://localhost:5001/saveRecipe", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess("Recipe created successfully!");
        localStorage.setItem("recipeState", JSON.stringify(result.recipe));
        navigate(`/recipe/${result.recipe._id}`);
      } else {
        setError(result.error || "Failed to create recipe.");
      }
    } catch (err) {
      setError("An error occurred while saving the recipe.");
      console.error(err);
    }
  };

  return (
    <div className="recipe-creation-container">
      <h2>Create a New Recipe</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* Recipe Title */}
        <div className="form-group">
          <label htmlFor="title">Recipe Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <h3>Ingredients</h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="text"
                placeholder="Name"
                value={ingredient.name}
                onChange={(e) => handleChange(e, index, "name", "ingredients")}
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => handleChange(e, index, "amount", "ingredients")}
                required
              />
              <input
                type="text"
                placeholder="Unit (e.g., tsp, cup)"
                value={ingredient.unit}
                onChange={(e) => handleChange(e, index, "unit", "ingredients")}
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(index, "ingredients")}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addField("ingredients")}>
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="form-group">
          <h3>Instructions</h3>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="instruction-row">
              <textarea
                placeholder={`Step ${index + 1}`}
                value={instruction}
                onChange={(e) => handleChange(e, index, null, "instructions")}
                required
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(index, "instructions")}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addField("instructions")}>
            Add Instruction
          </button>
        </div>

        {/* Diets */}
        <div className="form-group">
          <h3>Diets (Optional)</h3>
          {formData.diets.map((diet, index) => (
            <div key={index} className="diet-row">
              <input
                type="text"
                placeholder="e.g., Vegan, Gluten-Free"
                value={diet}
                onChange={(e) => handleChange(e, index, null, "diets")}
              />
              {formData.diets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(index, "diets")}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addField("diets")}>
            Add Diet
          </button>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="image">Recipe Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Create Recipe
        </button>
      </form>
      <button onClick={() => navigate("/SearchPage")} className="back-btn">
        Back to Search
      </button>
    </div>
  );
}

export default RecipeCreation;