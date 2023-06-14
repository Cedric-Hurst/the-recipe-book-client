import { v4 as uuid } from 'uuid';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RecipeSubsDialog from './RecipeSubsDialog';
import RecipeConDialog from './RecipeConDialog';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { printTiming } from '../CodeHelper';
import './Recipe.css';

export default function Recipe({ recipe }) {
	const recipePage = () => {
		const { recipeTitle, servings, img, timing, ingredients, instructions } =
			recipe;
		let prep = printTiming(timing.prepHr, timing.prepMin);
		let cook = printTiming(timing.cookHr, timing.cookMin);

		return (
			<div className="recipe-background">
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
													<Checkbox
														color="success"
														id={`recipe-checkbox-${i}`}
													/>
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
	};
	const loadingPage = () => {
		return (
			<div className="recipe-background">
				<Paper elevation={18} className="recipe-paper">
					<div className="recipe-root">
						<Grid container columnSpacing={2}>
							<Grid item xs={12} lg={6}>
								<div className="recipe-info">
									<Skeleton variant="rectangular" id="skeletonImg" />
									<Skeleton
										variant="text"
										sx={{ fontSize: '3rem', marginTop: '15px', width: '80%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '2rem', marginTop: '2.5px', width: '80%' }}
									/>
									<Skeleton
										variant="text"
										sx={{ fontSize: '2rem', marginTop: '2.5px', width: '20%' }}
									/>
									<Skeleton variant="rectangular" width={400} height={300} />
								</div>
							</Grid>
							<Grid item xs={12} lg={6}>
								<Skeleton
									variant="text"
									sx={{ fontSize: '2rem', marginTop: '12.5px', width: '30%' }}
								/>
								<Skeleton
									variant="rectangular"
									width={400}
									height={300}
									sx={{ marginTop: '10px' }}
								/>
							</Grid>
						</Grid>
					</div>
				</Paper>
			</div>
		);
	};
	return recipe === undefined ? loadingPage() : recipePage();
}
