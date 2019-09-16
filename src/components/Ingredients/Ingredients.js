import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setIngredients] = useState([]);
  useEffect(() => {
    fetch('https://react-hooks-ingredients-8facc.firebaseio.com/ingredients.json')
      .then(response => {
        return response.json()
      }).then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          })
        }
        setIngredients(loadedIngredients);
      })
  }, []);
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
  const onSearchIngredientHandler = useCallback(searchedIngredients => {
    setIngredients(searchedIngredients);
  }, [])
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientsHandler} />

      <section>
        <Search onSearchIngredients={onSearchIngredientHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientsHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
