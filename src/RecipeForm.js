import { Link } from "react-router-dom"
import { useState } from "react";
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
import { v4 as uuid } from 'uuid'
import { measurements, categories } from './FormData';
import { useNavigate } from "react-router-dom";

export default function RecipeForm({ addRecipe }) {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [category, setCategory] = useState([]);
    const [servings, setServings] = useState(0);
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
        <div style={{padding: '25px', backgroundColor: '#cfcfcf'}}>

            <div>
                <Link to='/recipes'>Back</Link>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <h1>Add a New Recipe</h1>
                <TextField
                    id="recipe-text"
                    label="Recipe Name"
                    name='recipeTitle'
                    variant="standard"
                    sx={{ mb: 3, width: '30%' }}
                    onKeyDown={handleEnterPress}
                    onChange={handleTextChange}
                />
                <div>
                    <Autocomplete
                        multiple
                        id="category-select"
                        limitTags={3}
                        options={categories}
                        sx={{ width: '30%' }}
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

                <div>
                    <p>Ingredients:</p>
                    {ingredients.map((input, index) => { 
                        return (
                            <div key={index}>
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        paddingBottom: '20px',
                                        paddingLeft: '20px',
                                        borderLeft: '.5rem solid rgba(29, 40, 191,0.4)',
                                        marginBottom: '1px'
                                    }} key={index}
                                >
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
                                            sx={{ width: 150 }}
                                            onKeyDown={handleEnterPress}
                                            onChange={event => handleIngredientFormChange(event,index)}
                                        />
                                        <Button onClick={() => removeIngredientFields(index)}><CloseIcon /></Button>
                                    </Stack>
                                </span>
                            </div>
                        )
                    })}
                    <div>
                        <Button onClick={addIngredientFields} >Add More Ingredients <AddIcon /></Button>
                    </div>
                </div>

                <p>Instructions:</p>
                {instructions.map((instruction, index) => { 
                    return(
                        <div key={index}>
                            <span style={{fontSize: 25, lineHeight: '100px', marginRight: '10px'}}>{`${index + 1}.`}</span>
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
                            <Button onClick={() => removeInstructionFields(index)}><CloseIcon/></Button>
                        </div>
                    )
                }
                )}

                <Button onClick={addInstructionFields}>
                    Add More instructions
                    <AddIcon />
                </Button>
                <div>
                    <Button type="submit" variant="outlined">Add Recipe</Button>
                </div>
            </form>
        </div>
    )
}