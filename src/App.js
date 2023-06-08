import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import FrontPage from './FrontPage';
import RecipeRoutes from './RecipeBook/RecipeRoutes';
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const location = useLocation();
	const logOut = () => {
		setIsLoggedIn(false);
	};
	const logIn = () => {
		setIsLoggedIn(true);
	};
	return (
		<div className="App">
			<Routes location={location}>
				<Route index element={<FrontPage />} />
				{RecipeRoutes(isLoggedIn, logOut, logIn)}
				<Route path="*" element={<FrontPage />} />
			</Routes>
		</div>
	);
}

export default App;
