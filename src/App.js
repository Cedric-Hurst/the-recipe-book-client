import { useState} from "react";
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import SeedRecipes from "./SeedRecipes";
import FrontPage from "./FrontPage";
import RecipeBook from "./RecipeBook";
import RecipeForm from "./RecipeForm";
import RecipeEdit from "./RecipeEdit";
import Recipe from "./Recipe";
function App() {
  const [recipes, setRecipes] = useState(SeedRecipes);
  const findRecipe = id => recipes.find(recipe => recipe.id === id);
  const GetRecipe = () => {
    const { id } = useParams();
    const recipe = findRecipe(id);
    return <Recipe recipe={recipe} />
  }
  const GetRecipeEdit = () => {
    const { id } = useParams();
    const recipe = findRecipe(id);
    return <RecipeEdit
      recipe={recipe}
      updateRecipe={updateRecipe}
      deleteRecipe={deleteRecipe}
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

  const location = useLocation();
  return (
    <div className="App">
      <Routes location={location}>
          <Route index element={<FrontPage/>} />
          <Route path='/recipes'>
          <Route index element={<RecipeBook recipes={recipes} updateRecipe={updateRecipe} pageName='Recipe Book' deleteRecipe={deleteRecipe} />} />
            <Route path='new' element={<RecipeForm addRecipe={addRecipe} />}/>
            <Route path='favorites' element={<RecipeBook recipes={favRecipes} updateRecipe={updateRecipe} pageName='Favorites' deleteRecipe={deleteRecipe}/>}/>
            <Route path=':id' element={<GetRecipe/>}/>
            <Route path=':id/edit' element={<GetRecipeEdit/>}/>
          </Route>
        <Route path='*' element={<FrontPage />} />
        </Routes>
    </div>
  );
}

export default App;
