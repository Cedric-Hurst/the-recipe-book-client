import Navbar from '../Navbar';
import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useNavigate } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Tooltip from '@mui/material/Tooltip';
import './RecipeBook.css';
import RecipeCard from './RecipeCard';

export default function RecipeBook({
	recipes,
	updateRecipe,
	pageName,
	deleteRecipe,
	isLoggedIn,
	logOut,
	logIn,
}) {
	const navigate = useNavigate();
	return (
		<div>
			<Navbar
				pageName={pageName}
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
			/>
			<div className="rb-root">
				<Tooltip title="Add New Recipe" placement="left">
					<SpeedDial
						ariaLabel="add new recipe"
						sx={{ position: 'fixed', bottom: 16, right: 16 }}
						icon={<SpeedDialIcon openIcon={<LibraryAddIcon />} />}
						onClick={() => navigate('/recipes/new')}
						FabProps={{
							sx: {
								bgcolor: 'green',
								'&:hover': {
									bgcolor: 'green',
								},
							},
						}}
					/>
				</Tooltip>
				<div className="rb-card-container">
					{recipes.map((recipe, index) => (
						<div key={recipe.id} className="rb-cards">
							<RecipeCard
								recipe={recipe}
								recipes={recipes}
								index={index}
								updateRecipe={updateRecipe}
								deleteRecipe={deleteRecipe}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
