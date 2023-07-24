import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FrontPage from './FrontPage';
import RecipeRoutes from './RecipeBook/RecipeRoutes';
import Navbar from './Navbar';
import SignInFrontPage from './SignInFrontPage';
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({ username: '', id: 0, email: '' });
	const location = useLocation();
	const logOut = () => {
		setUser({ username: '', id: 0, email: '' });
		let now = new Date();
		now.setMonth(now.getMonth() - 1);
		document.cookie = `user = ${JSON.stringify(
			user
		)}; expires = ${now.toUTCString()}`;
		setIsLoggedIn(false);
	};
	const logIn = () => {
		setIsLoggedIn(true);
	};
	const getCookieValue = (name) =>
		document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
	// log in if session cookie is still active
	useEffect(() => {
		if (getCookieValue('user')) {
			setUser(JSON.parse(getCookieValue('user')));
			logIn();
		}
	}, []);

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
				<Route
					index
					element={
						isLoggedIn ? (
							<FrontPage />
						) : (
							<SignInFrontPage logIn={logIn} setUser={setUser} />
						)
					}
				/>
				{RecipeRoutes(user, isLoggedIn, logIn, setUser)}
				<Route path="*" element={<FrontPage />} />
			</Routes>
		</div>
	);
}

export default App;
