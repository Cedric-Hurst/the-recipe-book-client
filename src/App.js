import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FrontPage from './FrontPage';
import RecipeRoutes from './RecipeBook/RecipeRoutes';
import Navbar from './Navbar';
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [allUsers, setAllUsers] = useState([]);
	const [user, setUser] = useState('');
	const location = useLocation();
	const logOut = () => {
		setUser('');
		setIsLoggedIn(false);
	};
	const logIn = (user) => {
		setUser(user);
		setIsLoggedIn(true);
	};
	useEffect(() => {
		const fetchAccounts = async () => {
			try {
				const res = await axios.get('http://localhost:3300/accounts');
				setAllUsers(res.data);
			} catch (e) {
				console.log(e); // change for post
			}
		};
		fetchAccounts();
	}, []);
	return (
		<div className="App">
			<Navbar
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
				allUsers={allUsers}
				user={user}
			/>
			<Routes location={location}>
				<Route index element={<FrontPage />} />
				{RecipeRoutes(allUsers)}
				<Route path="*" element={<FrontPage />} />
			</Routes>
		</div>
	);
}

export default App;
