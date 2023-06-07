import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { measurements, categories } from '../RecipeData';
import Navbar from '../Navbar';
import './RecipeForm.css';

export default function RecipeForm({
	updateRecipe,
	recipe,
	deleteRecipe,
	isLoggedIn,
	logOut,
	logIn,
}) {
	const [recipeTitle, setRecipeTitle] = useState(recipe.recipeTitle);
	const [category, setCategory] = useState(recipe.category);
	const [servings, setServings] = useState(recipe.servings);
	const [img, setImg] = useState(recipe.img);
	const [timing, setTiming] = useState(recipe.timing);
	const [ingredients, setIngredients] = useState(recipe.ingredients);
	const [instructions, setInstructions] = useState(recipe.instructions);
	const id = recipe.id;
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		const recipe = {
			recipeTitle: recipeTitle,
			id: id,
			category: category,
			servings: servings,
			img: img,
			timing: timing,
			ingredients: ingredients,
			instructions: instructions,
			notes: [],
		};
		updateRecipe(recipe);
		navigate(`/recipes/${recipe.id}`);
	};
	const handleTextChange = (e) => {
		e.target.name === 'recipeTitle' && setRecipeTitle(e.target.value);
		if (
			e.target.name === 'servings' &&
			parseInt(e.target.value) > 0 &&
			!isNaN(parseInt(e.target.value))
		) {
			setServings(parseInt(e.target.value));
		} else if (e.target.name === 'img') {
			e.target.value === ''
				? setImg(
						'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
				  )
				: setImg(e.target.value);
		}
	};
	const handleTimingChange = (event) => {
		let timingData = timing;
		if (parseInt(event.target.value) >= 0) {
			if (event.target.name === 'prepMin' || event.target.name === 'prepHr') {
				timingData[event.target.name] = parseInt(event.target.value);
			} else {
				timingData[event.target.name] = parseInt(event.target.value);
			}
		}
		setTiming(timingData);
	};
	const handleIngredientFormChange = (event, index) => {
		let ingreData = [...ingredients];
		ingreData[index][event.target.name] = event.target.value;
		setIngredients(ingreData);
	};
	const addIngredientFields = () => {
		let newInstrField = {
			qty: '',
			measure: '',
			ingredient: '',
			description: '',
		};
		setIngredients([...ingredients, newInstrField]);
	};
	const removeIngredientFields = (index) => {
		setIngredients(ingredients.filter((ingre, i) => i !== index));
	};
	const handleInstructionFormChange = (event, index) => {
		let instruData = [...instructions];
		instruData[index] = event.target.value;
		setInstructions(instruData);
	};
	const addInstructionFields = () => {
		setInstructions([...instructions, '']);
	};
	const removeInstructionFields = (index) => {
		setInstructions(instructions.filter((instr, i) => i !== index));
	};
	const handleEnterPress = (event) => {
		event.key === 'Enter' && event.preventDefault();
	};

	return (
		<div className="rForm-background">
			<Navbar
				pageName="Edit Recipe"
				isLoggedIn={isLoggedIn}
				logOut={logOut}
				logIn={logIn}
			/>
			<Paper elevation={18} className="rForm-paper">
				<div className="rForm-root">
					<form onSubmit={handleSubmit} noValidate>
						<Tooltip title="Update Recipe" placement="left">
							<SpeedDial
								ariaLabel="update recipe"
								sx={{ position: 'fixed', bottom: 16, right: 16 }}
								icon={<SpeedDialIcon openIcon={<EditIcon />} />}
								onClick={handleSubmit}
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
						<Grid container spacing={2}>
							<Grid item xs={12} lg={6}>
								<div>
									<h1>Edit Recipe</h1>
									<TextField
										id="recipe-text"
										label="Recipe Name"
										name="recipeTitle"
										variant="standard"
										value={recipeTitle}
										sx={{ mb: 3, width: '90%' }}
										onKeyDown={handleEnterPress}
										onChange={handleTextChange}
									/>
									<div>
										<TextField
											id="img"
											label="Image Url"
											name="img"
											variant="standard"
											value={img}
											sx={{ mb: 3, width: '90%' }}
											onKeyDown={handleEnterPress}
											onChange={handleTextChange}
										/>
									</div>
									<div>
										<Autocomplete
											multiple
											id="category-select"
											limitTags={3}
											options={categories}
											defaultValue={category}
											sx={{ width: '90%' }}
											renderInput={(params) => (
												<TextField
													{...params}
													variant="standard"
													label="Categories"
												/>
											)}
											onChange={(e, newVal) => {
												setCategory(newVal);
											}}
										/>
									</div>
									<TextField
										id="servings"
										name="servings"
										label="Servings"
										variant="standard"
										value={servings}
										sx={{ my: '20px', width: '75px' }}
										onKeyDown={handleEnterPress}
										onChange={handleTextChange}
									/>
									<div className="rForm-time">
										<span>Prep Time:</span>
										<TextField
											id="prepTime-hr"
											name="prepHr"
											label="Hours"
											variant="standard"
											value={timing.prepTime.prepHr}
											sx={{ width: '50px', mx: '10px' }}
											onKeyDown={handleEnterPress}
											onChange={(event) =>
												event.target.value >= 0 && handleTimingChange(event)
											}
										/>
										<span style={{ fontSize: 40 }}>:</span>
										<TextField
											id="prepTime-min"
											name="prepMin"
											label="Mins"
											variant="standard"
											value={timing.prepTime.prepMin}
											sx={{ width: '50px', mx: '10px' }}
											onKeyDown={handleEnterPress}
											onChange={(event) =>
												event.target.value >= 0 &&
												event.target.value < 60 &&
												handleTimingChange(event)
											}
										/>

										<span>Cook Time:</span>
										<TextField
											id="cookTime-hr"
											name="cookHr"
											label="Hours"
											variant="standard"
											value={timing.cookTime.cookHr}
											sx={{ width: '50px', mx: '10px' }}
											onKeyDown={handleEnterPress}
											onChange={(event) =>
												event.target.value >= 0 && handleTimingChange(event)
											}
										/>
										<span style={{ fontSize: 40 }}>:</span>
										<TextField
											id="cookTime-min"
											name="cookMin"
											label="Mins"
											variant="standard"
											value={timing.cookTime.cookMin}
											sx={{ width: '50px', mx: '10px' }}
											onKeyDown={handleEnterPress}
											onChange={(event) =>
												event.target.value >= 0 &&
												event.target.value < 60 &&
												handleTimingChange(event)
											}
										/>
									</div>
									<p>Ingredients:</p>
									<div className="rForm-ingredients">
										{ingredients.map((input, index) => {
											return (
												<div key={index}>
													<span className="rForm-ingre">
														<Stack direction="row">
															<TextField
																id={`qty-text${index}`}
																name="qty"
																label="qty"
																variant="standard"
																value={input.qty}
																sx={{ width: '75px' }}
																onKeyDown={handleEnterPress}
																onChange={(event) =>
																	handleIngredientFormChange(event, index)
																}
															/>
															<FormControl
																variant="standard"
																sx={{ minWidth: 120 }}>
																<InputLabel
																	htmlFor={`measure-id-${index}`}
																	id={`measure-label${index}`}>
																	Measurement
																</InputLabel>
																<Select
																	inputProps={{ id: `measure-id-${index}` }}
																	labelId={`measure-label${index}`}
																	id={`measure${index}`}
																	name="measure"
																	defaultValue={input.measure}
																	onKeyDown={handleEnterPress}
																	onChange={(event) =>
																		handleIngredientFormChange(event, index)
																	}
																	label="Measurement">
																	{measurements.map((measure, i) => (
																		<MenuItem key={i} value={measure.value}>
																			{measure.label}
																		</MenuItem>
																	))}
																</Select>
															</FormControl>
															<TextField
																id={`ingredient-text${index}`}
																name="ingredient"
																label="Ingredient"
																value={input.ingredient}
																variant="standard"
																sx={{ width: 150 }}
																onKeyDown={handleEnterPress}
																onChange={(event) =>
																	handleIngredientFormChange(event, index)
																}
															/>
															<TextField
																id={`description-text${index}`}
																name="description"
																label="Description"
																value={input.description}
																variant="standard"
																sx={{ width: 125 }}
																onKeyDown={handleEnterPress}
																onChange={(event) =>
																	handleIngredientFormChange(event, index)
																}
															/>
															<Button
																onClick={() => removeIngredientFields(index)}>
																<CloseIcon />
															</Button>
														</Stack>
													</span>
												</div>
											);
										})}
									</div>
									<div>
										<Button onClick={addIngredientFields}>
											Add More Ingredients <AddIcon />
										</Button>
									</div>
								</div>
							</Grid>
							<Grid item xs={12} lg={6}>
								<div>
									<p>Instructions:</p>
									{instructions.map((instruction, index) => {
										return (
											<div className="rForm-inst" key={index}>
												<span>{`${index + 1}.`}</span>
												<TextField
													id={`instruction${index}`}
													name="instruction"
													label="Instructions"
													multiline
													value={instruction}
													rows={3}
													variant="standard"
													sx={{ width: 500 }}
													onChange={(event) =>
														handleInstructionFormChange(event, index)
													}
												/>
												<Button onClick={() => removeInstructionFields(index)}>
													<CloseIcon />
												</Button>
											</div>
										);
									})}
									<Button onClick={addInstructionFields}>
										Add More instructions
										<AddIcon />
									</Button>
								</div>
							</Grid>
						</Grid>
					</form>
				</div>
			</Paper>
		</div>
	);
}
