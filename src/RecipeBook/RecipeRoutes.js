import { useState} from "react";
import {Route, useParams } from 'react-router-dom';
import SeedRecipes from "../SeedRecipes";
import RecipeBook from "./RecipeBook";
import RecipeForm from "./RecipeForm";
import RecipeEdit from "./RecipeEdit";
import Recipe from "./Recipe";

export default function RecipeRoutes(isLoggedIn, logOut, logIn) {
  const [recipes, setRecipes] = useState(SeedRecipes);
  const findRecipe = id => recipes.find(recipe => recipe.id === id);
  const GetRecipe = () => {
    const { id } = useParams();
    const recipe = findRecipe(id);
    return <Recipe
      recipe={recipe}
      isLoggedIn={isLoggedIn}
      logOut={logOut}
      logIn={logIn}
    />
  }
  const GetRecipeEdit = () => {
    const { id } = useParams();
    const recipe = findRecipe(id);
    return <RecipeEdit
      recipe={recipe}
      updateRecipe={updateRecipe}
      deleteRecipe={deleteRecipe}
      isLoggedIn={isLoggedIn}
      logOut={logOut}
      logIn={logIn}
    />
  }
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  }
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }
  const updateRecipe = (updatedRecipe) => {
    const newRecipes = recipes;
    const index = recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
    newRecipes[index] = updatedRecipe;
    setRecipes(newRecipes);
  }
  const favRecipes = recipes.filter(recipe => recipe.favorite === true)
  const GetCatRecipes = () => {
    const { cat } = useParams();
    const catRecipes = recipes.filter(recipe => recipe.category.includes(cat))
    return <RecipeBook
      recipes={catRecipes}
      updateRecipe={updateRecipe}
      pageName={`Category: ${cat}`}
      deleteRecipe={deleteRecipe}
      isLoggedIn={isLoggedIn}
      logOut={logOut}
      logIn={logIn}
    />
  }
  return (
    <Route path='/recipes'>
      <Route
        index
        element={
          <RecipeBook
            recipes={recipes}
            updateRecipe={updateRecipe}
            pageName='Recipe Book'
            deleteRecipe={deleteRecipe}
            isLoggedIn={isLoggedIn}
            logOut={logOut}
            logIn={logIn}
          />
        }
      />
      <Route
        path='favorites'
        element={
          <RecipeBook
            recipes={favRecipes}
            updateRecipe={updateRecipe}
            pageName='Favorites'
            deleteRecipe={deleteRecipe}
            isLoggedIn={isLoggedIn}
            logOut={logOut}
            logIn={logIn}
          />
        }
      />
      <Route path='category/:cat' element={<GetCatRecipes />} />
      <Route path='new' element={
        <RecipeForm
          addRecipe={addRecipe}
          isLoggedIn={isLoggedIn}
          logOut={logOut}
          logIn={logIn}
        />
      }/>
      <Route path=':id' element={<GetRecipe />} />
      <Route path=':id/edit' element={<GetRecipeEdit />} />
    </Route>
  )
}