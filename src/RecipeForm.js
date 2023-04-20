import { Link } from "react-router-dom"
import { useState } from "react";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import {measurements, categories} from './FormData';
export default function RecipeForm({ addRecipe }) {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [category, setCategory] = useState([]);

    const [servings, setServings] = useState(0);

    const [timing, setTiming] = useState({});

    const [ingredients, setIngredients] = useState({});
    const [qty, setQty] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [description, setDescription] = useState('');

    const [instructions, setInstructions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
     const handleTextChange = (e) => {
        e.target.name === 'recipeTitle' && setRecipeTitle(e.target.value);
        e.target.name === 'ingredient' && setIngredient(e.target.value);
        e.target.name === 'description' && setDescription(e.target.value);
        e.target.name === 'qty' && setQty(e.target.value);
    }
    
    const handleClick = (e) => { 
    }

    return (
        <div>

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
                    onChange={handleTextChange}
                />
                <div>
                    <Autocomplete
                        multiple
                        id="category-select"
                        options={categories}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Categories" />}
                        onChange={(e, newVal) => { setCategory(newVal)}}
                    />
                </div>

                <p>Servings:</p>

                <div>
                    <span>Prep Time:</span>
                    <TextField id="standard-basic" label="prepTime" variant="standard" />
                    <span>Cook Time:</span>
                    <TextField id="standard-basic" label="cookTime" variant="standard" />
                </div>
                <div>
                    <p>Ingredients:</p>
                    <TextField id="qty-text" name='qty' label="qty" variant="standard" onChange={handleTextChange} />
                    <Autocomplete
                        disablePortal
                        id="measurements"
                        options={measurements}
                        sx={{ width: 175 }}
                        renderInput={(params) => <TextField {...params} label="Measurement" />}
                        onInputChange={(e, newVal) => { setMeasurement(newVal); }}
                    />
                    <TextField
                        id="ingredient-text"
                        name='ingredient'
                        label="Ingredient"
                        variant="standard"
                        onChange={handleTextChange}
                    />
                    <TextField
                        id="description-text"
                        name='description'
                        label="Description"
                        variant="standard"
                        onChange={handleTextChange}
                    />
                    <AddIcon/>
                </div>
                <p>Instructions:</p>
                <TextField
                    id="standard-multiline-static"
                    label="Instructions"
                    multiline
                    rows={6}
                    variant="standard"
                />
                <AddIcon />
                <Button type="submit" variant="outlined">Add Recipe</Button>
            </form>
        </div>
    )
}