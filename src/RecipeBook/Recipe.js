import { v4 as uuid } from 'uuid';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RecipeSubsDialog from './RecipeSubsDialog';
import RecipeConDialog from './RecipeConDialog';
import Grid from '@mui/material/Grid';

import { printTiming } from '../CodeHelper';
import Navbar from '../Navbar';
import './Recipe.css';

export default function Recipe({ recipe, isLoggedIn, logOut, logIn }) {
	const { recipeTitle, servings, img, timing, ingredients, instructions } =
		recipe;
	const { prepTime, cookTime } = timing;
	let prep = printTiming(prepTime.prepHr, prepTime.prepMin);
	let cook = printTiming(cookTime.cookHr, cookTime.cookMin);

	return (
		<div className="recipe-background">
			<Navbar
				pageName={recipeTitle}
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
			/>
			<Paper elevation={18} className="recipe-paper">
				<div className="recipe-root">
					<Grid container columnSpacing={2}>
						<Grid item xs={12} lg={6}>
							<div className="recipe-info">
								<img src={img} alt={recipeTitle} />
								<h1>{recipeTitle}</h1>
								<div>
									<span className="recipe-serving">Servings: </span>
									<span className="recipe-servingNum">{servings}</span>
									<span className="recipe-timing">
										<span className="recipe-time"> Prep Time: </span>
										<span className="recipe-timeNum">{prep}</span>
										<span className="recipe-time"> Cook Time: </span>
										<span className="recipe-timeNum">{cook}</span>
									</span>
								</div>
								<h2>Ingredients</h2>
								<FormGroup>
									{ingredients.map((ingredient, i) => (
										<FormControlLabel
											key={uuid()}
											control={
												<Checkbox color="success" id={`recipe-checkbox-${i}`} />
											}
											label={
												<span className="recipe-ingre">
													{`${ingredient.qty} ${ingredient.measure} ${
														ingredient.ingredient
													}${ingredient.description.length > 1 ? ',' : ''} ${
														ingredient.description
													}`}
												</span>
											}
										/>
									))}
								</FormGroup>
								<RecipeSubsDialog />
								<RecipeConDialog />
							</div>
						</Grid>
						<Grid item xs={12} lg={6}>
							<div className="recipe-instNote">
								<h3>Instructions</h3>
								<FormGroup>
									{instructions.map((step, i) => (
										<span className="recipe-spacer" key={uuid()}>
											<FormControlLabel
												control={
													<Checkbox
														color="success"
														id={`instruction-checkbox-${i}`}
													/>
												}
												label={
													<span className="recipe-inst">{`${
														i + 1
													}. ${step}`}</span>
												}
											/>
										</span>
									))}
								</FormGroup>
							</div>
						</Grid>
					</Grid>
				</div>
			</Paper>
		</div>
	);
}
