import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FrontPage() {
	const [names, setNames] = useState([]);

	useEffect(() => {
		const fetchAllNames = async () => {
			try {
				const res = await axios.get('http://localhost:3300/test');
				setNames(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchAllNames();
	}, []);
	return (
		<div style={{ margin: '25px', marginTop: '75px' }}>
			<Navbar pageName="MyRecipes" />
			<p>
				<Link to="/recipes">Recipe Book</Link>
			</p>
			<p>Pantry</p>
			<p>random recipes</p>
			<p>Drink Book?</p>
			<p>Dry Bar?</p>
		</div>
	);
}
