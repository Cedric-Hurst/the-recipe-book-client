import { Routes, Route, useLocation } from 'react-router-dom';
import {useState} from "react";
import FrontPage from "./FrontPage";
import RecipeRoutes from "./RecipeBook/RecipeRoutes";
import SeedAccounts from "./SeedAccounts";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
