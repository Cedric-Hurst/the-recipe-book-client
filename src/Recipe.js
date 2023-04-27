import { Link } from "react-router-dom";
import { v4 as uuid } from 'uuid'
import { printTiming } from "./CodeHelper";
import Navbar from "./Navbar"

export default function Recipe({ recipe }) {
    const { recipeTitle, servings, img, timing, ingredients, instructions, notes } = recipe;
    const { prepTime, cookTime } = timing;
    let prep = printTiming(prepTime.prepHr, prepTime.prepMin);
    let cook = printTiming(cookTime.cookHr, cookTime.cookMin);

    return (
        <>
            <Navbar pageName={`Recipe Page: ${recipeTitle}`} />
            <div style={{ margin: '25px', marginTop: '75px' }}>
                <div><Link to='/recipes'>Back to Recipe Book</Link></div>
                <h1>{recipeTitle}</h1>
                <img src={img} alt={recipeTitle} style={{ height: '400px'}} />
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
        </>
    )
}