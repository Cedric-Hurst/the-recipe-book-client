import { Link } from "react-router-dom"
import { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
            recipeTitle,
            id: uuid(),
            category,
            servings,
            timing,
            ingredients,
            instructions,
            notes: []
        };
        addRecipe(recipe);
        navigate(`/recipes/${recipe.id}`)
    }
     const handleTextChange = (e) => {
        e.target.name === 'recipeTitle' && setRecipeTitle(e.target.value);
        e.target.name === 'servings' && setServings(parseInt(e.target.value));
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
        if ((event.target.id).substring(0,7) === 'measure') { // a way to handle autocomplete option and turn it into abbreviated version of measurement
            const abrevMeasure = measurements[parseInt(event.target.id.substring(15))].value;
            ingreData[index][(event.target.id).substring(0,7)] = abrevMeasure;
        } else {
            ingreData[index][event.target.name] = event.target.value;
        }
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


    return (
        <div style={{ margin: '50px' }}>

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
                    sx={{mb: 3, width: '30%'}}
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
                    sx={{my: "20px", width: '75px'}}
                    onChange={handleTextChange}
                />
                <div>
                    <span>Prep Time:</span>
                    <TextField
                        id="prepTime-hr"
                        name="prepHr"
                        label="Hours"
                        variant="standard"
                        sx={{width: '50px', mx: '10px'}}
                        onChange={event => event.target.value >= 0 && handleTimingChange(event)}
                    />
                    <span style={{fontSize: 40}}>:</span>
                    <TextField
                        id="prepTime-min"
                        name="prepMin"
                        label="Mins"
                        variant="standard"
                        sx={{width: '50px', mx: '10px'}}
                        onChange={event => (event.target.value >= 0 && event.target.value < 60) && handleTimingChange(event)}
                    />

                    <span>Cook Time:</span>
                    <TextField 
                        id="cookTime-hr" 
                        name="cookHr" 
                        label="Hours" 
                        variant="standard" 
                        sx={{width: '50px', mx: '10px'}}
                        onChange={event => event.target.value >= 0 && handleTimingChange(event)}
                    />
                    <span style={{fontSize: 40}}>:</span>
                    <TextField 
                        id="cookTime-min" 
                        name="cookMin"
                        label="Mins" 
                        variant="standard" 
                        sx={{width: '50px', mx: '10px'}}
                        onChange={event => (event.target.value >= 0 && event.target.value < 60) && handleTimingChange(event)}
                    />
                </div>

                <div>
                    <p>Ingredients:</p>
                    {ingredients.map((input, index) => { 
                        return (
                            <span key={index}>
                                <Stack direction="row">
                                    <TextField
                                        id="qty-text"
                                        name='qty'
                                        label="qty"
                                        variant="standard"
                                        value={input.qty}
                                        sx={{ width: '75px'}}
                                        onChange={event => handleIngredientFormChange(event,index)}
                                    />
                                    <Autocomplete
                                        disablePortal
                                        id="measure"
                                        name="measure"
                                        options={measurements}
                                        freeSolo={true}
                                        value={input.measurement}
                                        sx={{ width: 130 }}
                                        renderInput={(params) => <TextField {...params} variant="standard" label="Measurement" />}
                                        onInputChange={event => handleIngredientFormChange(event,index)}
                                    />
                                    <TextField
                                        id="ingredient-text"
                                        name='ingredient'
                                        label="Ingredient"
                                        value={input.ingredient}
                                        variant="standard"
                                        onChange={event => handleIngredientFormChange(event,index)}
                                    />
                                    <TextField
                                        id="description-text"
                                        name='description'
                                        label="Description"
                                        value={input.description}
                                        variant="standard"
                                        onChange={event => handleIngredientFormChange(event,index)}
                                    />
                                    <Button onClick={() => removeIngredientFields(index)}><CloseIcon /></Button>
                                </Stack>
                            </span>
                        )
                    })}
                    <Button onClick={addIngredientFields} >Add More Ingredients <AddIcon/></Button>
                </div>

                <p>Instructions:</p>
                {instructions.map((instruction, index) => { 
                    return(
                        <div key={index}>
                            {index + 1}. 
                            <TextField
                                id="instruction"
                                name="instruction"
                                label="Instructions"
                                multiline
                                value={instruction}
                                rows={4}
                                variant="standard"
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