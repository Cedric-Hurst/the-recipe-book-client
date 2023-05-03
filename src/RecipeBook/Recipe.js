import { v4 as uuid } from 'uuid'
import { printTiming } from "../CodeHelper";
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

  return (
    <div className='recipe-background'>
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
            <h2>Ingredients</h2>
            <FormGroup>
              {ingredients.map(ingredient =>
                <FormControlLabel
                  control={<Checkbox color="success"/>}
                  label={
                    <span className='recipe-ingre'>
                      {`${ingredient.qty} ${ingredient.measure} ${ingredient.ingredient}${ingredient.description.length > 1 ? ',' : ''} ${ingredient.description}`}
                    </span>
                  }
                  key={uuid()}
                />
              )}
            </FormGroup>
          </div>
          <div className='recipe-instNote'>
            <h3>Instructions</h3>
            <FormGroup>
              {instructions.map((step, i) =>
                <span className='recipe-spacer'>
                <FormControlLabel
                  control={<Checkbox color="success"/>}
                  label={
                    <span className='recipe-inst'>
                      {`${i + 1}. ${step}`}
                    </span>
                  }
                  key={uuid()}
                />
                </span>
              )}
            </FormGroup>
            <h4>Notes</h4>
            <ul>
              {notes.map(note => <li key={uuid()}>note</li>)}
            </ul>
          </div>
        </div>
      </Paper>
    </div>
  )
}