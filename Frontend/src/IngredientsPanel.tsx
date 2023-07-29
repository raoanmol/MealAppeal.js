import React, { useState } from "react";

interface IngredientsPanelProps {
  commonIngredients: string[]; // An array of common ingredients to display in the panel
  onSearchRecipes: (selectedIngredients: string[]) => void; // Callback function to trigger recipe search
}

const IngredientsPanel: React.FC<IngredientsPanelProps> = ({
  commonIngredients,
  onSearchRecipes,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientToggle = (ingredient: string) => {
    setSelectedIngredients((prevIngredients) => {
      if (prevIngredients.includes(ingredient)) {
        return prevIngredients.filter((item) => item !== ingredient);
      } else {
        return [...prevIngredients, ingredient];
      }
    });
  };

  const handleSearchRecipes = () => {
    onSearchRecipes(selectedIngredients);
  };

  return (
    <div>
      <h2>Common Ingredients</h2>
      {commonIngredients.map((ingredient, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleIngredientToggle(ingredient)}
            />
            {ingredient}
          </label>
        </div>
      ))}
      <button onClick={handleSearchRecipes}>Search Recipes</button>
    </div>
  );
};

export default IngredientsPanel;
