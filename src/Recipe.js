import { Link } from "react-router-dom";
import {v4 as uuid} from 'uuid'
export default function Recipe({ recipe }) {
    const { recipeTitle, servings, timing, ingredients, instructions, notes } = recipe;

    let cookTime = `${timing.cook} mins`;
    let prepTime = `${timing.prep} mins`;

    if (timing.cook >= 60) {
        const min = timing.cook % 60;
        const hr = Math.floor(timing.cook / 60);
        if (min > 0) {
            cookTime = `${hr} ${hr > 1 ? 'hrs' : 'hr'} ${min} mins`;
        } else {
            cookTime = `${hr} ${hr > 1 ? 'hrs' : 'hr'}`;
        }
    }
    if (timing.prep >= 60) {
        const min = timing.prep % 60;
        const hr = timing.prep / 60;
        if (min > 0) {
            prepTime = `${hr} ${hr > 1 ? 'hrs' : 'hr'} ${min} mins`;
        } else {
            prepTime = `${hr} ${hr > 1 ? 'hrs' : 'hr'}`;
        }
    }
    return (
        <div>
            <div><Link to='/recipes'>Back to Recipe Book</Link></div>
            <h1>{recipeTitle}</h1>
            <h2>{`Prep Time: ${prepTime} Cook Time: ${cookTime}`}</h2>
            <p>{`Servings: ${servings}`}</p>
            <h3>Ingredients</h3>
            <ul>
                {ingredients.map(ingredient =>
                    <li key={uuid()}>{`${ingredient.qty} ${ingredient.measure} ${ingredient.name}${ingredient.des.length >1 ? ',': ''} ${ingredient.des}`}</li>
                )}
            </ul>
            <h4>Instructions</h4>
            <ul>
                {instructions.map((step, i) => <li key={uuid()}>{`${i+1}. ${step}`}</li>)}
            </ul>
            <h5>Notes</h5>
            <ul>
                {notes.map(note => <li key={uuid()}>note</li>)}
            </ul>
        </div>
    )
}