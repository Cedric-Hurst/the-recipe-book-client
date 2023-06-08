import { useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import axios from 'axios';
import RecipeBook from './RecipeBook';
import RecipeForm from './RecipeForm';
import RecipeEdit from './RecipeEdit';
import Recipe from './Recipe';

export default function RecipeRoutes(isLoggedIn, logOut, logIn) {
	const [recipes, setRecipes] = useState([]);
	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const res = await axios.get('http://localhost:3300/recipes');
				setRecipes(res.data);
			} catch (e) {
				console.log(e);
			}
		};
		fetchRecipes();
	}, []);
	const GetRecipe = () => {
		const { id } = useParams();
		return (
			<Recipe
				recipe={recipes[id - 1]}
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
			/>
		);
	};
	const GetRecipeEdit = () => {
		const { id } = useParams();
		return (
			<RecipeEdit
				recipe={recipes[id - 1]}
				updateRecipe={updateRecipe}
				deleteRecipe={deleteRecipe}
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
			/>
		);
	};
	const addRecipe = (newRecipe) => {
		setRecipes([...recipes, newRecipe]);
	};
	const deleteRecipe = (id) => {
		setRecipes(recipes.filter((recipe) => recipe.id !== id));
	};
	const updateRecipe = (updatedRecipe) => {
		const newRecipes = recipes;
		const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
		newRecipes[index] = updatedRecipe;
		setRecipes(newRecipes);
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
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
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
						isLoggedIn={isLoggedIn}
						logOut={logOut}
						logIn={logIn}
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
						isLoggedIn={isLoggedIn}
						logOut={logOut}
						logIn={logIn}
					/>
				}
			/>
			<Route path="category/:cat" element={<GetCatRecipes />} />
			<Route
				path="new"
				element={
					<RecipeForm
						title="Add a New Recipe"
						navTitle="New Recipe"
						addRecipe={addRecipe}
						isLoggedIn={isLoggedIn}
						logOut={logOut}
						logIn={logIn}
					/>
				}
			/>
			<Route path=":id" element={<GetRecipe />} />
			<Route path=":id/edit" element={<GetRecipeEdit />} />
		</Route>
	);
}
