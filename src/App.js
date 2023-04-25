import { useState} from "react";
import { Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom';
import SeedRecipes from "./SeedRecipes";
import FrontPage from "./FrontPage";
import RecipeBook from "./RecipeBook";
import RecipeForm from "./RecipeForm";
import Recipe from "./Recipe";
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
  const location = useLocation();
  return (
    <div className="App">
      <Routes location={location}>
          <Route index element={<FrontPage/>} />
          <Route path='/recipes'>
          <Route index element={<RecipeBook recipes={recipes} />} />
            <Route path='new' element={<RecipeForm addRecipe={addRecipe} />}/>
            <Route path=':id' element={<GetRecipe/>}/>
          </Route>
        <Route path='*' element={<FrontPage />} />
        </Routes>
    </div>
  );
}

export default App;
