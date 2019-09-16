import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onSearchIngredients } = props
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const query = searchInput.length === 0 ? '' : `?orderBy="title"&equalTo="${searchInput}"`;
    fetch('https://react-hooks-ingredients-8facc.firebaseio.com/ingredients.json' + query)
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
        onSearchIngredients(loadedIngredients);
      })
  }, [searchInput, onSearchIngredients])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={searchInput} onChange={event => setSearchInput(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
