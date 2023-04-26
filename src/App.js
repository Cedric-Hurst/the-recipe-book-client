import { useState} from "react";
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import SeedRecipes from "./SeedRecipes";
import FrontPage from "./FrontPage";
import RecipeBook from "./RecipeBook";
import RecipeForm from "./RecipeForm";
import Recipe from "./Recipe";
import FavoriteRecipes from "./FavoriteRecipes";
function App() {
  const [recipes, setRecipes] = useState(SeedRecipes);
  const findRecipe = id => recipes.find(recipe => recipe.id === id);
  const GetRecipe = () => {
    const { id } = useParams();
    const recipe = findRecipe(id);
    return <Recipe recipe={recipe} />
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
          <Route index element={<RecipeBook recipes={recipes} updateRecipe={updateRecipe} />} />
            <Route path='new' element={<RecipeForm addRecipe={addRecipe} />}/>
            <Route path='favorites' element={<FavoriteRecipes recipes={favRecipes} updateRecipe={updateRecipe} />}/>
            <Route path=':id' element={<GetRecipe/>}/>
          </Route>
        <Route path='*' element={<FrontPage />} />
        </Routes>
    </div>
  );
}

export default App;
