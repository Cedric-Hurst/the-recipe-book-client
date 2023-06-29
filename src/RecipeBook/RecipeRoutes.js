import { useEffect, useState } from 'react';
import { Route, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import RecipeBook from './RecipeBook';
import RecipeForm from './RecipeForm';
import RecipeEdit from './RecipeEdit';
import Recipe from './Recipe';

export default function RecipeRoutes() {
	const [recipes, setRecipes] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const res = await axios.get('http://localhost:3300/recipes');
				setRecipes(res.data);
			} catch (e) {
				console.log(e); // change for post
			}
		};
		fetchRecipes();
	}, []);
	const findRecipe = (id) => {
		return recipes.findIndex((res) => parseInt(res.id) === parseInt(id));
	};
	const GetRecipe = () => {
		const { id } = useParams();
		return <Recipe recipe={recipes[findRecipe(id)]} />;
	};
	const GetRecipeEdit = () => {
		const { id } = useParams();
		return (
			<RecipeEdit
				recipe={recipes[findRecipe(id)]}
				updateRecipe={updateRecipe}
				deleteRecipe={deleteRecipe}
			/>
		);
	};
	const addRecipe = async (newRecipe) => {
		try {
			const res = await axios.post(
				'http://localhost:3300/recipes/new',
				newRecipe
			);
			newRecipe.id = res.data;
			setRecipes([...recipes, newRecipe]);
			navigate(`/recipes/${res.data}`);
		} catch (e) {
			console.error(e); // change for post
		}
	};
	const deleteRecipe = async (id) => {
		try {
			setRecipes(recipes.filter((recipe) => recipe.id !== id));
			await axios.delete(`http://localhost:3300/recipes/${id}`);
			window.location.reload();
		} catch (e) {
			console.log(e); // change for post
		}
	};
	const updateRecipe = async (updatedRecipe) => {
		try {
			await axios.put('http://localhost:3300/recipes/edit', updatedRecipe);
			const newRecipes = recipes;
			const index = recipes.findIndex(
				(recipe) => recipe.id === updatedRecipe.id
			);
			newRecipes[index] = updatedRecipe;
			setRecipes(newRecipes);
		} catch (e) {
			console.log(e);
		}
	};
	const favRecipes = recipes.filter((recipe) => recipe.favorite === true);
	const GetCatRecipes = () => {
		const { cat } = useParams();
		const catRecipes = recipes.filter((recipe) =>
			recipe.category.includes(cat)
		);
		return (
			<RecipeBook
				recipes={catRecipes}
				updateRecipe={updateRecipe}
				pageName={`Category: ${cat}`}
				deleteRecipe={deleteRecipe}
			/>
		);
	};
	return (
		<Route path="/recipes">
			<Route
				index
				element={
					<RecipeBook
						recipes={recipes}
						updateRecipe={updateRecipe}
						pageName="Recipe Book"
						deleteRecipe={deleteRecipe}
					/>
				}
			/>
			<Route
				path="favorites"
				element={
					<RecipeBook
						recipes={favRecipes}
						updateRecipe={updateRecipe}
						pageName="Favorites"
						deleteRecipe={deleteRecipe}
					/>
				}
			/>
			<Route path="category/:cat" element={<GetCatRecipes />} />
			<Route path="new" element={<RecipeForm addRecipe={addRecipe} />} />
			<Route path=":id" element={<GetRecipe />} />
			<Route path=":id/edit" element={<GetRecipeEdit />} />
		</Route>
	);
}
