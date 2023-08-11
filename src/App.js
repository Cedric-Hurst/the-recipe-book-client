import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FrontPage from './FrontPage';
import RecipeRoutes from './RecipeBook/RecipeRoutes';
import Navbar from './Navbar';
import SignInFrontPage from './SignInFrontPage';
import { decryptData, getBookmark } from './CodeHelper';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({
		username: '',
		id: 0,
		email: '',
	});
	const [bookmarks, setBookmarks] = useState([]);
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);

	const logOut = () => {
		setUser({ username: '', id: 0, email: '' });
		let now = new Date();
		now.setMonth(now.getMonth() - 1);
		document.cookie = `rbuid = ${JSON.stringify(
			user
		)}; expires = ${now.toUTCString()}; secure`;
		setIsLoggedIn(false);
	};
	const logIn = () => {
		setIsLoggedIn(true);
	};
	const getCookieValue = (name) =>
		document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '';
	// log in if session cookie is still active
	useEffect(() => {
		const fetchCookieValue = async () => {
			if (getCookieValue('rbuid')) {
				setUser(await decryptData(getCookieValue('rbuid')));
				logIn();
			}
			if (getCookieValue('bmfavs')) {
				setBookmarks(await decryptData(getCookieValue('bmfavs')));
			}
		};
		fetchCookieValue();
		setIsLoading(false);
	}, []);

	// get users bookmarks
	useEffect(() => {
		const fetchBookmarks = async () => {
			setBookmarks(await getBookmark(user.id));
		};
		fetchBookmarks();
	}, [user.id]);

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
						isLoading ? (
							<CircularProgress
								color="success"
								sx={{
									marginTop: '200px',
									marginLeft: '50%',
								}}
							/>
						) : isLoggedIn ? (
							<FrontPage />
						) : (
							<SignInFrontPage logIn={logIn} setUser={setUser} />
						)
					}
				/>
				{RecipeRoutes(
					user,
					isLoggedIn,
					logIn,
					setUser,
					bookmarks,
					setBookmarks
				)}
				<Route path="*" element={<FrontPage />} />
			</Routes>
		</div>
	);
}

export default App;
