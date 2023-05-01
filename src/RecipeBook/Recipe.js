import { v4 as uuid } from 'uuid'
import { printTiming } from "../CodeHelper";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
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
      <div className='recipe-root'>
        <div><Button sx={{ color: 'green' }} onClick={() => navigate(-1)}>Back</Button></div>
        <div className='recipe-info'>
          <h1>{recipeTitle}</h1>
          <p>{`Servings: ${servings}`}</p>
          <img src={img} alt={recipeTitle}/>
          <h2>{`Prep Time: ${prep} Cook Time: ${cook}`}</h2>
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map(ingredient =>
              <li key={uuid()}>
                {`${ingredient.qty} ${ingredient.measure} ${ingredient.ingredient}${ingredient.description.length > 1 ? ',' : ''} ${ingredient.description}`}
              </li>
            )}
          </ul>
        </div>
        <div className='recipe-inst'>
          <h4>Instructions</h4>
          <ul>
            {instructions.map((step, i) => <li key={uuid()}>{`${i+1}. ${step}`}</li>)}
          </ul>
          <h5>Notes</h5>
          <ul>
            {notes.map(note => <li key={uuid()}>note</li>)}
          </ul>
        </div>
      </div>
    </>
  )
}