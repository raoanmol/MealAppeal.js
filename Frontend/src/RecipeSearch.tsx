import React, { useState } from 'react';

interface Recipe {
  label: string;
  ingredients: string[];
  url: string;
}

const RecipeSearch: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredients, setIngredients] = useState(['rice', 'milk', 'sugar']); // replace with actual ingredients

  const fetchRecipes = async () => {
    const response = await fetch('http://127.0.0.1:5000/recipes', { // replace with actual backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setRecipes(data.recipes);
  };

  // Use useEffect to call the function on component mount, or call it when user clicks a button, etc.
  // useEffect(() => {
  //   fetchRecipes();
  // }, []);

  return (
    <div>
      <button onClick={fetchRecipes}>Fetch Recipes</button>
      {recipes.map((recipe, index) => (
        <div key={index}>
          <h2>{recipe.label}</h2>
          <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          <a href={recipe.url}>Recipe link</a>
        </div>
      ))}
    </div>
  );
};

export default RecipeSearch;