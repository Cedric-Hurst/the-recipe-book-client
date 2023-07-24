import { useEffect, useState } from 'react';
import { Route, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import RecipeBook from './RecipeBook';
import RecipeForm from './RecipeForm';
import RecipeEdit from './RecipeEdit';
import Recipe from './Recipe';
import SignInFrontPage from '../SignInFrontPage';

export default function RecipeRoutes(user, isLoggedIn, logIn, setUser) {
	const [recipes, setRecipes] = useState([]);
	const navigate = useNavigate();

	// snackbar handle click/close and open state
	const [openSnack, setOpenSnack] = useState(false);
	const handleClickSnack = () => {
		setOpenSnack(true);
	};
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnack(false);
	};

	// get recipes when site is loaded
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

	// find one Recipe using recipe_id
	const findRecipe = (id) => {
		return recipes.findIndex((res) => parseInt(res.id) === parseInt(id));
	};
	// get recipe
	const GetRecipe = () => {
		const { id } = useParams();
		return (
			<Recipe
				recipe={recipes[findRecipe(id)]}
				handleCloseSnack={handleCloseSnack}
				openSnack={openSnack}
			/>
		);
	};
	// get recipe for edit page
	const GetRecipeEdit = () => {
		const { id } = useParams();
		const recipe = recipes[findRecipe(id)];
		return (
			<RecipeEdit
				recipe={recipe}
				updateRecipe={updateRecipe}
				deleteRecipe={deleteRecipe}
				user={user}
			/>
		);
	};
	// get recipes based on category
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
				user={user}
			/>
		);
	};
	// add recipe to database
	const addRecipe = async (newRecipe) => {
		try {
			const res = await axios.post(
				'http://localhost:3300/recipes/new',
				newRecipe
			);
			newRecipe.id = res.data;
			setRecipes([...recipes, newRecipe]);
			handleClickSnack();
			navigate(`/recipes/${res.data}`);
		} catch (e) {
			console.error(e); // change for post
		}
	};
	// delete recipe from database
	const deleteRecipe = async (id) => {
		handleClickSnack();
		try {
			setRecipes(recipes.filter((recipe) => recipe.id !== id));
			await axios.delete(`http://localhost:3300/recipes/${id}`);
			window.location.reload();
		} catch (e) {
			console.log(e); // change for post
		}
	};
	// update recipe in database
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
	// array of bookmarked recipes
	const favRecipes = recipes.filter((recipe) => recipe.favorite === true);
	// array of recipes created by current user
	const myRecipes = recipes.filter(
		(recipe) => recipe.author.toLowerCase() === user.username.toLowerCase()
	);
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
						user={user}
						handleCloseSnack={handleCloseSnack}
						openSnack={openSnack}
					/>
				}
			/>
			<Route
				path="bookmarks"
				element={
					isLoggedIn ? (
						<RecipeBook
							recipes={favRecipes}
							updateRecipe={updateRecipe}
							deleteRecipe={deleteRecipe}
							user={user}
						/>
					) : (
						<SignInFrontPage logIn={logIn} setUser={setUser} />
					)
				}
			/>
			<Route
				path="myrecipes"
				element={
					isLoggedIn ? (
						<RecipeBook
							recipes={myRecipes}
							updateRecipe={updateRecipe}
							deleteRecipe={deleteRecipe}
							user={user}
						/>
					) : (
						<SignInFrontPage logIn={logIn} setUser={setUser} />
					)
				}
			/>
			<Route path="category/:cat" element={<GetCatRecipes />} />
			<Route
				path="new"
				element={
					isLoggedIn ? (
						<RecipeForm addRecipe={addRecipe} user={user} />
					) : (
						<SignInFrontPage logIn={logIn} setUser={setUser} />
					)
				}
			/>
			<Route path=":id" element={<GetRecipe />} />
			<Route
				path=":id/edit"
				element={
					isLoggedIn ? (
						<GetRecipeEdit />
					) : (
						<SignInFrontPage logIn={logIn} setUser={setUser} />
					)
				}
			/>
		</Route>
	);
}
