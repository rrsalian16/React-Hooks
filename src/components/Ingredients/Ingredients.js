import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from '../UI/ErrorModal';
import Search from "./Search";

const Ingredients = () => {
  const [ingredients, setingredients] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState()

  const fileterIngredients = useCallback((filterIng) => {
    setingredients(filterIng);
  }, []);

  const addIngredientsHandler =useCallback((ingredient) => {
    setisLoading(true);
    fetch("https://react-hooks-d2364.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setisLoading(false);
        setingredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  },[]);

  const removeIngredientHandler = (id) => {
    setisLoading(true);
    fetch(`https://react-hooks-d2364.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE",
    }).then(response=>{
      setisLoading(false);
      setingredients((prevIngredients) =>
        prevIngredients.filter((x) => x.id !== id)
      )
    }).catch(error=>{
      setisLoading(false);
      seterror(error.message);
    });
  };

  const clearError=()=>{
    seterror(null);
    setisLoading(false);
  }

  return (
    <div className="App">
      {error&&<ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientsHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={fileterIngredients} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
