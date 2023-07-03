import { useEffect, useState } from 'react';
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
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Tooltip from '@mui/material/Tooltip';

import { measurements, categories } from '../RecipeData';
import './RecipeForm.css';
import { useNavigate } from 'react-router-dom';

export default function RecipeForm({ addRecipe, user }) {
	const [recipeTitle, setRecipeTitle] = useState('');
	const [category, setCategory] = useState([]);
	const [servings, setServings] = useState(0);
	const [img, setImg] = useState(
		'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
	);
	const [timing, setTiming] = useState({
		prepHr: 0,
		prepMin: 0,
		cookHr: 0,
		cookMin: 0,
	});
	const [ingredients, setIngredients] = useState([
		{
			qty: '',
			measure: '',
			ingredient: '',
			description: '',
		},
	]);
	const [instructions, setInstructions] = useState(['']);
	const navigate = useNavigate();
	useEffect(() => {
		const isSignedIn = user.username !== '';
		!isSignedIn && navigate('/');
	}, [navigate, user.username]);
	const handleSubmit = (e) => {
		e.preventDefault();

		const recipe = {
			recipeTitle: recipeTitle,
			category: category,
			servings: servings,
			img: img,
			id: 0,
			timing: timing,
			ingredients: ingredients,
			instructions: instructions,
		};
		addRecipe(recipe);
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
			<Paper elevation={18} className="rForm-paper">
				<div className="rForm-root">
					<Tooltip title="Add Recipe" placement="left">
						<SpeedDial
							ariaLabel="add recipe"
							sx={{ position: 'fixed', bottom: 16, right: 16 }}
							icon={<SpeedDialIcon openIcon={<LibraryAddIcon />} />}
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
					<form onSubmit={handleSubmit} noValidate className="rForm-form">
						<Grid container spacing={2}>
							<Grid item xs={12} lg={6}>
								<div>
									<h1>Add a New Recipe</h1>
									<TextField
										id="recipe-text"
										label="Recipe Name"
										name="recipeTitle"
										variant="standard"
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
										sx={{ my: '20px', width: '75px' }}
										onKeyDown={handleEnterPress}
										onChange={handleTextChange}
									/>
									<div>
										<div className="rForm-pTime">
											<span>Prep Time:</span>
											<TextField
												id="prepTime-hr"
												name="prepHr"
												label="Hours"
												variant="standard"
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
												sx={{ width: '50px', mx: '10px' }}
												onKeyDown={handleEnterPress}
												onChange={(event) =>
													event.target.value >= 0 &&
													event.target.value < 60 &&
													handleTimingChange(event)
												}
											/>
										</div>
										<div className="rForm-cTime">
											<span>Cook Time:</span>
											<TextField
												id="cookTime-hr"
												name="cookHr"
												label="Hours"
												variant="standard"
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
												sx={{ width: '50px', mx: '10px' }}
												onKeyDown={handleEnterPress}
												onChange={(event) =>
													event.target.value >= 0 &&
													event.target.value < 60 &&
													handleTimingChange(event)
												}
											/>
										</div>
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
																className="rForm-qty"
																onKeyDown={handleEnterPress}
																onChange={(event) =>
																	handleIngredientFormChange(event, index)
																}
															/>
															<FormControl
																variant="standard"
																className="rForm-measure">
																<InputLabel
																	htmlFor={`measure-id-${index}`}
																	id={`measure-label${index}`}>
																	Measure
																</InputLabel>
																<Select
																	inputProps={{ id: `measure-id-${index}` }}
																	labelId={`measure-label${index}`}
																	id={`measure${index}`}
																	name="measure"
																	defaultValue=""
																	onKeyDown={handleEnterPress}
																	onChange={(event) =>
																		handleIngredientFormChange(event, index)
																	}
																	label="Measure">
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
																className="rForm-ingre-desc"
																onKeyDown={handleEnterPress}
																onChange={(event) =>
																	handleIngredientFormChange(event, index)
																}
															/>
															<TextField
																id={`description-text${index}`}
																name="description"
																label="Desc"
																value={input.description}
																variant="standard"
																className="rForm-ingre-desc"
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
													id={`instruction-${index}`}
													name="instruction"
													label="Instructions"
													multiline
													value={instruction}
													rows={3}
													variant="standard"
													className="instruction"
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
