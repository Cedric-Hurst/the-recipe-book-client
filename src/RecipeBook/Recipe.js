import { v4 as uuid } from 'uuid'
import { printTiming } from "../CodeHelper";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Navbar from "../Navbar";
import './Recipe.css';

export default function Recipe({ recipe }) {
  const { recipeTitle, servings, img, timing, ingredients, instructions, notes } = recipe;
  const { prepTime, cookTime } = timing;
  let prep = printTiming(prepTime.prepHr, prepTime.prepMin);
  let cook = printTiming(cookTime.cookHr, cookTime.cookMin);
  const navigate = useNavigate();

  return (
    <>
      <Navbar pageName={`Recipe Page: ${recipeTitle}`} />
      <Paper elevation={18} className="recipe-paper">
        <div className='recipe-root'>
          <div className='recipe-info'>
            <img src={img} alt={recipeTitle}/>
            <h1>{recipeTitle}</h1>
            <div>
              <span className='recipe-serving'>Servings: </span>
              <span className='recipe-servingNum'>{servings}</span>
              <span className='recipe-timing'>
                <span className='recipe-time'> Prep Time: </span>
                <span className='recipe-timeNum'>{prep}</span>
                <span className='recipe-time'> Cook Time: </span>
                <span className='recipe-timeNum'>{cook}</span>
              </span>
          </div>
            <h3>Ingredients</h3>
            <FormGroup>
              {ingredients.map(ingredient =>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    `${ingredient.qty} ${ingredient.measure} ${ingredient.ingredient}${ingredient.description.length > 1 ? ',' : ''} ${ingredient.description}`
                  }
                  key={uuid()}
                />
              )}
            </FormGroup>
          </div>
          <div className='recipe-inst'>
            <h4>Instructions</h4>
            <FormGroup>
              {instructions.map((step, i) =>
                <FormControlLabel
                  control={<Checkbox />}
                  label={`${i + 1}. ${step}`}
                  key={uuid()}
                />
              )}
            </FormGroup>
            <h5>Notes</h5>
            <ul>
              {notes.map(note => <li key={uuid()}>note</li>)}
            </ul>
          </div>
        </div>
      </Paper>
    </>
  )
}