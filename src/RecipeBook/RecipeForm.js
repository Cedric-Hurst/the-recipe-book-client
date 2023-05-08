import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import IconButton from '@mui/material/IconButton';
import { v4 as uuid } from 'uuid'
import { measurements, categories } from '../FormData';
import Navbar from "../Navbar"
import "./RecipeForm.css"

export default function RecipeForm({ addRecipe }) {
  const [recipeTitle, setRecipeTitle] = useState('');
  const [category, setCategory] = useState([]);
  const [servings, setServings] = useState(0);
  const [img, setImg] = useState(
    'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80'
  );
  const [timing, setTiming] = useState({
    prepTime: { prepHr: 0, prepMin: 0 },
    cookTime: { cookHr: 0, cookMin: 0 }
  });
  const [ingredients, setIngredients] = useState([{
    qty: '',
    measure: '',
    ingredient: '',
    description: ''
  }]);
  const [instructions, setInstructions] = useState(['']);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const recipe = {
      recipeTitle: recipeTitle,
      id: uuid(),
      category: category,
      servings: servings,
      img: img,
      timing: timing,
      ingredients: ingredients,
      instructions: instructions,
      notes: []
    };
    addRecipe(recipe);
    navigate(`/recipes/${recipe.id}`)
  }
    const handleTextChange = (e) => {
    e.target.name === 'recipeTitle' && setRecipeTitle(e.target.value);
    if (e.target.name === 'servings' && parseInt(e.target.value) > 0 && !isNaN(parseInt(e.target.value))) {
    setServings(parseInt(e.target.value));
    }
    else if (e.target.name === 'img') {
      e.target.value === ''
        ? setImg('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80')
        : setImg(e.target.value);
    }
  }
  const handleTimingChange = (event) => {
    let timingData = timing;
    if (parseInt(event.target.value) >= 0) {
      if (event.target.name === 'prepMin' || event.target.name === 'prepHr') {
        timingData.prepTime[event.target.name] = parseInt(event.target.value);
      } else {
        timingData.cookTime[event.target.name] = parseInt(event.target.value);
      }
    }
    setTiming(timingData);
  }
  const handleIngredientFormChange = (event, index) => {
    let ingreData = [...ingredients];
    ingreData[index][event.target.name] = event.target.value;
    setIngredients(ingreData);
  }
  const addIngredientFields = () => {
    let newInstrField = {
      qty: '',
      measure: '',
      ingredient: '',
      description: ''
    }
    setIngredients([...ingredients, newInstrField]);
    
  }
  const removeIngredientFields = (index) => {
    setIngredients(ingredients.filter((ingre,i) => i !== index))
  }
  const handleInstructionFormChange = (event, index) => {
    let instruData = [...instructions];
    instruData[index] = event.target.value;
    setInstructions(instruData);
  }
  const addInstructionFields = () => {
    setInstructions([...instructions, '']);
  }
  const removeInstructionFields = (index) => {
    setInstructions(instructions.filter((instr, i) => i !== index));
  }
  const handleEnterPress = (event) => {
    event.key === 'Enter' && event.preventDefault();
  }
  return (
    <div className="rForm-background">
      <Navbar pageName='New Recipe' />
      <Paper elevation={18} className="rForm-paper">
        <div className="rForm-root" >
          <form onSubmit={handleSubmit} noValidate className="rForm-form">
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6} >
                <div>
                  <h1>Add a New Recipe</h1>
                  <TextField
                    id="recipe-text"
                    label="Recipe Name"
                    name='recipeTitle'
                    variant="standard"
                    sx={{ mb: 3, width: '90%' }}
                    onKeyDown={handleEnterPress}
                    onChange={handleTextChange}
                  />
                  <div>
                    <TextField
                      id="img"
                      label="Image Url"
                      name='img'
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
                      renderInput={(params) => <TextField {...params} variant="standard" label="Categories" />}
                      onChange={(e, newVal) => { setCategory(newVal) }}
                    />
                  </div>
                  <TextField
                      id="servings"
                      name="servings"
                      label="Servings"
                      variant="standard"
                      sx={{ my: "20px", width: '75px' }}
                      onKeyDown={handleEnterPress}
                      onChange={handleTextChange}
                  />
                  <div>
                    <span>Prep Time:</span>
                    <TextField
                      id="prepTime-hr"
                      name="prepHr"
                      label="Hours"
                      variant="standard"
                      sx={{ width: '50px', mx: '10px' }}
                      onKeyDown={handleEnterPress}
                      onChange={event => event.target.value >= 0 && handleTimingChange(event)}
                    />
                    <span style={{fontSize: 40}}>:</span>
                    <TextField
                      id="prepTime-min"
                      name="prepMin"
                      label="Mins"
                      variant="standard"
                      sx={{ width: '50px', mx: '10px' }}
                      onKeyDown={handleEnterPress}
                      onChange={event => (event.target.value >= 0 && event.target.value < 60) && handleTimingChange(event)}
                    />

                    <span>Cook Time:</span>
                    <TextField 
                      id="cookTime-hr" 
                      name="cookHr" 
                      label="Hours" 
                      variant="standard" 
                      sx={{ width: '50px', mx: '10px' }}
                      onKeyDown={handleEnterPress}
                      onChange={event => event.target.value >= 0 && handleTimingChange(event)}
                    />
                    <span style={{fontSize: 40}}>:</span>
                    <TextField 
                      id="cookTime-min" 
                      name="cookMin"
                      label="Mins" 
                      variant="standard" 
                      sx={{ width: '50px', mx: '10px' }}
                      onKeyDown={handleEnterPress}
                      onChange={event => (event.target.value >= 0 && event.target.value < 60) && handleTimingChange(event)}
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
                                id="qty-text"
                                name='qty'
                                label="qty"
                                variant="standard"
                                value={input.qty}
                                sx={{ width: '75px' }}
                                onKeyDown={handleEnterPress}
                                onChange={event => handleIngredientFormChange(event,index)}
                              />
                              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel id="measure-label">Measurement</InputLabel>
                                <Select
                                  labelId="measure-label"
                                  id="measure"
                                  name="measure"
                                  defaultValue=''
                                  onKeyDown={handleEnterPress}
                                  onChange={event => handleIngredientFormChange(event,index)}
                                  label="Measurement"
                                >
                                  {measurements.map((measure, i) =>
                                    <MenuItem key={i} value={measure.value}>{ measure.label}</MenuItem>
                                  )}
                                </Select>
                              </FormControl>
                              <TextField
                                id="ingredient-text"
                                name='ingredient'
                                label="Ingredient"
                                value={input.ingredient}
                                variant="standard"
                                sx={{ width: 150 }}
                                onKeyDown={handleEnterPress}
                                onChange={event => handleIngredientFormChange(event,index)}
                              />
                              <TextField
                                id="description-text"
                                name='description'
                                label="Description"
                                value={input.description}
                                variant="standard"
                                sx={{ width: 125 }}
                                onKeyDown={handleEnterPress}
                                onChange={event => handleIngredientFormChange(event,index)}
                              />
                              <IconButton onClick={() => removeIngredientFields(index)}><CloseIcon /></IconButton>
                            </Stack>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <Button onClick={addIngredientFields} >Add More Ingredients <AddIcon /></Button>
                  </div>   
                </div>
              </Grid>
              <Grid item xs={12} lg={6}>
                <div>
                  <p>Instructions:</p>
                  {instructions.map((instruction, index) => { 
                    return(
                      <div className="rForm-inst" key={index}>
                        <span>{`${index + 1}.`}</span>
                        <TextField
                          id="instruction"
                          name="instruction"
                          label="Instructions"
                          multiline
                          value={instruction}
                          rows={3}
                          variant="standard"
                          sx={{ width: 500 }}
                          onChange={event => handleInstructionFormChange(event, index)}
                        />
                        <IconButton onClick={() => removeInstructionFields(index)}><CloseIcon/></IconButton>
                      </div>
                    )
                  }
                  )}
                  <Button onClick={addInstructionFields}>
                    Add More instructions
                    <AddIcon />
                  </Button>
                  <div >
                    <Button type="submit" variant="outlined">Add Recipe</Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
    </div>
  )
}