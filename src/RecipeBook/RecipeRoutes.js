import { useEffect, useState } from 'react';
import { Route, useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import RecipeBook from './RecipeBook';
import RecipeForm from './RecipeForm';
import RecipeEdit from './RecipeEdit';
import Recipe from './Recipe';
import SignInFrontPage from '../SignInFrontPage';

export default function RecipeRoutes(
	user,
	isLoggedIn,
	logIn,
	setUser,
	bookmarks,
	setBookmarks,
	isLoading
) {
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

	//get recipe book based on whatever recipes your looking for.
	const recipeBook = (specRecipes) => {
		return isLoading ? (
			<CircularProgress
				color="success"
				sx={{
					marginTop: '200px',
					marginLeft: '50%',
				}}
			/>
		) : (
			<RecipeBook
				recipes={specRecipes}
				deleteRecipe={deleteRecipe}
				user={user}
				handleCloseSnack={handleCloseSnack}
				openSnack={openSnack}
				bookmarks={bookmarks}
				setBookmarks={setBookmarks}
			/>
		);
	};
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
				user={user}
				deleteRecipe={deleteRecipe}
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
		return recipeBook(catRecipes);
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
	const favRecipes = recipes.filter((recipe) => bookmarks.includes(recipe.id));
	// array of recipes created by current user
	const myRecipes = recipes.filter(
		(recipe) => recipe.author.toLowerCase() === user.username.toLowerCase()
	);
	return (
		<Route path="/recipes">
			<Route index element={recipeBook(recipes)} />
			<Route
				path="bookmarks"
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
						recipeBook(favRecipes)
					) : (
						<SignInFrontPage logIn={logIn} setUser={setUser} />
					)
				}
			/>
			<Route
				path="myrecipes"
				element={
					isLoggedIn ? (
						recipeBook(myRecipes)
					) : (
						<SignInFrontPage logIn={logIn} setUser={setUser} />
					)
				}
			/>
			<Route path="category/:cat" element={<GetCatRecipes />} />
			<Route
				path="new"
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
					isLoading ? (
						<CircularProgress
							color="success"
							sx={{
								marginTop: '200px',
								marginLeft: '50%',
							}}
						/>
					) : isLoggedIn ? (
						<GetRecipeEdit />
					) : (
						<SignInFrontPage logIn={logIn} setUser={setUser} />
					)
				}
			/>
		</Route>
	);
}
