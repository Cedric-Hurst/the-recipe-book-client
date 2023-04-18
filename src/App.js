import { useState} from "react";
import { Routes, Route, useParams, Navigate, useLocation } from 'react-router-dom';
import SeedRecipes from "./SeedRecipes";
import FrontPage from "./FrontPage";
import RecipeBook from "./RecipeBook";
import Recipe from "./Recipe";
function App() {
  const [recipes, setRecipes] = useState(SeedRecipes);
  const findRecipe = id => recipes.find(recipe => recipe.id === id);
  const GetRecipe = () => {
    const { id } = useParams();
    const recipe = findRecipe(parseInt(id));
    return <Recipe recipe={recipe} />
  }
  const location = useLocation();
  return (
    <div className="App">
      <Routes location={location}>
          <Route index element={<FrontPage/>} />
          <Route path='/recipes'>
          <Route index element={<RecipeBook recipes={recipes} />} />
            {/* <Route path='new' element={}/> */}
            <Route path=':id' element={<GetRecipe/>}/>
          </Route>
        <Route path='*' element={<FrontPage />} />
        </Routes>
    </div>
  );
}

export default App;
