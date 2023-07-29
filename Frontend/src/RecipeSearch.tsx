import React, { useState } from "react";
import IngredientsPanel from "./IngredientsPanel"; // Import the IngredientsPanel component

interface Recipe {
  label: string;
  ingredients: string[];
  url: string;
}

const RecipeSearch: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState(["rice", "salt"]); // replace with actual ingredients

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recipes", {
        // replace with actual backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }), // Pass the selected ingredients
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearchRecipes = (selectedIngredients: string[]) => {
    setIngredients(selectedIngredients);
    fetchRecipes();
  };

  return (
    <div>
      {/* Pass commonIngredients and the handleSearchRecipes callback to IngredientsPanel */}
      <IngredientsPanel
        commonIngredients={[
          "rice",
          "flour",
          "pepper",
          "chicken",
          "salt",
          "egg",
        ]}
        onSearchRecipes={handleSearchRecipes}
      />

      <h2>Recipes</h2>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.label}</h2>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>
          <a href={recipe.url}>Recipe link</a>
        </div>
      ))}
    </div>
  );
};

export default RecipeSearch;
