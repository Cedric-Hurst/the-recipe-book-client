import { Routes, Route, useLocation } from 'react-router-dom';
import FrontPage from "./FrontPage";
import RecipeRoutes from "./RecipeBook/RecipeRoutes";
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Routes location={location}>
        <Route index element={<FrontPage/>} />
        {RecipeRoutes()}
        <Route path='*' element={<FrontPage />} />
      </Routes>
    </div>
  );
}

export default App;
