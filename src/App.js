import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import FrontPage from './FrontPage';
import RecipeRoutes from './RecipeBook/RecipeRoutes';
import Navbar from './Navbar';
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({ username: '', id: 0, email: '' });
	const location = useLocation();
	const logOut = () => {
		setUser({ username: '', id: 0, email: '' });
		setIsLoggedIn(false);
	};
	const logIn = () => {
		setIsLoggedIn(true);
	};

	return (
		<div className="App">
			<Navbar
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
				user={user}
				setUser={setUser}
			/>
			<Routes location={location}>
				<Route index element={<FrontPage />} />
				{RecipeRoutes(user)}
				<Route path="*" element={<FrontPage />} />
			</Routes>
		</div>
	);
}

export default App;
