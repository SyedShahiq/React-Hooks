import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setIngredients] = useState([]);
  const addIngredientsHandler = ingredient => {
    fetch('https://react-hooks-ingredients-8facc.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }]);
    });
  }
  const removeIngredientsHandler = ingredientId => {
    setIngredients(prevIngredients => prevIngredients.filter((ingredient) => ingredient.id !== ingredientId))
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientsHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientsHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
