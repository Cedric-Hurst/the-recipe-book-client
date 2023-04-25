import { Link } from "react-router-dom";
import {v4 as uuid} from 'uuid'
export default function Recipe({ recipe }) {
    const { recipeTitle, servings, timing, ingredients, instructions, notes } = recipe;
    const { prepTime, cookTime } = timing;
    let prep = '';
    let cook = '';

    if (prepTime.prepHr === 0) { //if no hours show mins
        prep = `${prepTime.prepMin} Mins`;
    }
    else if(prepTime.prepHr > 0) { //if there is hours
        if (prepTime.prepMin === 0) { //if there is hours and no mins
            if (prepTime.prepHr === 1) { //if hours is one
                prep = `${prepTime.prepHr} Hr`; 
            } else {
                prep = `${prepTime.prepHr} Hrs`;
            }
        } else { //if there is hours and mins
            if (prepTime.prepHr === 1) { //if there is one hour and mins
                prep = `${prepTime.prepHr} Hr ${prepTime.prepMin} Mins`;
            } else { //if there is hours and mins
                prep = `${prepTime.prepHr} Hrs ${prepTime.prepMin} Mins`;
            }
        }
    }
    if (cookTime.cookHr === 0) { //if no hours show mins
        cook = `${cookTime.cookMin} Mins`;
    }
    else if(cookTime.cookHr > 0) { //if there is hours
        if (cookTime.cookMin === 0) { //if there is hours and no mins
            if (cookTime.cookHr === 1) { //if hours is one
                cook = `${cookTime.cookHr} Hr`; 
            } else {
                cook = `${cookTime.cookHr} Hrs`;
            }
        } else { //if there is hours and mins
            if (cookTime.cookHr === 1) { //if there is one hour and mins
                cook = `${cookTime.cookHr} Hr ${cookTime.cookMin} Mins`;
            } else { //if there is hours and mins
                cook = `${cookTime.cookHr} Hrs ${cookTime.cookMin} Mins`;
            }
        }
    }

    return (
        <div style={{ margin: '25px' }}>
            <div><Link to='/recipes'>Back to Recipe Book</Link></div>
            <h1>{recipeTitle}</h1>
            <h2>{`Prep Time: ${prep} Cook Time: ${cook}`}</h2>
            <p>{`Servings: ${servings}`}</p>
            <h3>Ingredients</h3>
            <ul>
                {ingredients.map(ingredient =>
                    <li key={uuid()}>
                        {`${ingredient.qty} ${ingredient.measure} ${ingredient.ingredient}${ingredient.description.length > 1 ? ',' : ''} ${ingredient.description}`}
                    </li>
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