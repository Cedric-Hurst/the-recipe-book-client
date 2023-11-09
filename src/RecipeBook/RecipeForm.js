import { useState } from 'react';
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
import { styled } from '@mui/material/styles';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { measurements, categories } from '../Helpers/RecipeData';
import { validateName, validateFileExt } from '../Helpers/Validations';
import { uploadImgCloud } from '../Helpers/CodeHelper';
import './RecipeForm.css';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

export default function RecipeForm({ addRecipe, user }) {
	// recipe state
	const [recipeTitle, setRecipeTitle] = useState('');
	const [category, setCategory] = useState([]);
	const [servings, setServings] = useState(0);
	const [img, setImg] = useState({});
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
	const [imgName, setImgName] = useState('Upload an Image here');
	const [imgView, setImgView] = useState('');
	//validation
	const errorText = [
		'Recipe titles must have between 5 and 30 characters and cannot have special characters.',
		"File ext must be '.png' or '.jpg'",
		'choose 1 or more categories.',
		'Add an ingredient.',
		'Add an instruction.',
	];
	const [badTitle, setBadTitle] = useState(false);
	const [badImg, setBadImg] = useState(false);
	const [badCat, setBadCat] = useState(false);
	const [badIngre, setBadIngre] = useState(false);
	const [badInstr, setBadInstr] = useState(false);
	const resetBads = () => {
		setBadImg(false);
		setBadTitle(false);
		setBadCat(false);
		setBadIngre(false);
		setBadInstr(false);
	};
	//validation check
	const checkRecipe = () => {
		//if any badState is true then return false for checkRecipe
		let returnVal = true;

		const checkLength = recipeTitle.length >= 5 && recipeTitle.length < 50;
		// if title is less then 5 or greater then 50 - trigger warning
		if (!checkLength) {
			setBadTitle(true);
			returnVal = false;
		}
		// if title has special characters - trigger warning
		if (!validateName(recipeTitle)) {
			setBadTitle(true);
			returnVal = false;
		}
		//if category is empty - trigger warning
		if (category.length <= 0) {
			setBadCat(true);
			returnVal = false;
		}
		//if there is no ingredient name input - trigger warning
		if (ingredients[0].ingredient === '') {
			setBadIngre(true);
			returnVal = false;
		}
		//if there is no text in instructions - trigger warning
		if (instructions[0] === '') {
			setBadInstr(true);
			returnVal = false;
		}
		//if img is not valid - trigger warning
		if (!validateFileExt(img.name)) {
			setBadImg(true);
			setImg({});
			returnVal = false;
		}
		return returnVal;
	};
	const warning = () => {
		const message = [];
		badTitle && message.push(' Recipe Title');
		badImg && message.push(' Image Url');
		badCat && message.push(' Category');
		badIngre && message.push(' Ingredients');
		badInstr && message.push(' Instructions');
		return message.toString();
	};

	//snackbar
	const [open, setOpen] = React.useState(false);
	const handleSnackOpen = () => {
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// recipe form functions
	const handleSubmit = async (e) => {
		e.preventDefault(); //prevent normal form submit
		resetBads(); // resets error warnings to be checked again
		const recipe = {
			// set all recipe states to one recipe object to send to backend
			recipeTitle: recipeTitle,
			category: category,
			servings: servings,
			img: img,
			id: 0,
			timing: timing,
			ingredients: ingredients,
			instructions: instructions,
			user_id: user.id,
			author: user.username,
		};
		if (checkRecipe()) {
			recipe.img = await uploadImgCloud(img);
			addRecipe(recipe);
		} else handleSnackOpen(); // if form is missing any field, show snack that says missing field(s)
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

	//handle anytime a user presses enter in the from inputs
	const handleEnterPress = (event) => {
		event.key === 'Enter' && event.preventDefault();
	};

	//Image upload
	const uploadImage = (files) => {
		const fileName = files[0].name;
		if (validateFileExt(fileName)) {
			setImg(files[0]);
			setImgView(URL.createObjectURL(files[0]));
			setImgName(fileName);
			setBadImg(false);
		} else {
			setImg({});
			setBadImg(true);
		}
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
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert
							onClose={handleClose}
							severity="warning"
							sx={{ width: '100%' }}>
							Recipe missing {warning()}
						</Alert>
					</Snackbar>
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
										error={badTitle}
										helperText={badTitle ? errorText[0] : ''}
										sx={{ mb: 3, width: '90%' }}
										onKeyDown={handleEnterPress}
										onChange={handleTextChange}
									/>
									<div>
										{/* <TextField
											id="img"
											label="Image Url"
											name="img"
											variant="standard"
											error={badImg}
											helperText={badImg ? errorText[1] : ''}
											sx={{ mb: 3, width: '90%' }}
											onKeyDown={handleEnterPress}
											onChange={handleTextChange}
										/> */}
										<Button
											component="label"
											id="img"
											name="img"
											variant="contained"
											startIcon={<PhotoCameraIcon />}>
											Upload Image
											<VisuallyHiddenInput
												type="file"
												onChange={(e) => uploadImage(e.target.files)}
											/>
										</Button>
										<span>
											{' '}
											{badImg ? ( // if img ext is bad then show error message
												<span style={{ color: 'red' }}>{errorText[1]}</span>
											) : (
												// if img has been uploaded and is correct file ext then show img preview and file name
												<>
													{imgName === 'Upload an Image here' ? (
														imgName
													) : (
														<>
															<span style={{ color: 'green' }}>
																{imgName.substring(0, 23)}
															</span>
															<img
																src={imgView}
																alt={imgName}
																style={{
																	marginLeft: '15px',
																	height: '30px',
																	width: '30px',
																}}
															/>
														</>
													)}
												</>
											)}
										</span>
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
													error={badCat}
													helperText={badCat ? errorText[2] : ''}
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

									<p>{`Ingredients:`}</p>
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
																error={badIngre}
																helperText={badIngre ? ' ' : ''}
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
																error={badIngre}
																helperText={badIngre ? errorText[3] : ''}
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
																error={badIngre}
																helperText={badIngre ? ' ' : ''}
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
													error={badInstr}
													helperText={badInstr ? errorText[4] : ''}
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
