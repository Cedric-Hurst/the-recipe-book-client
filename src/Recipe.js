import { Link } from "react-router-dom";
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
                    <li>{`${ingredient.qty} ${ingredient.measure} ${ingredient.name}${ingredient.des.length >1 ? ',': ''} ${ingredient.des}`}</li>
                )}
            </ul>
            <h4>Instructions</h4>
            <ul>
                {instructions.map((step, i) => <li>{`${i+1}. ${step}`}</li>)}
            </ul>
            <h5>Notes</h5>
            <ul>
                {notes.map(note => <li>note</li>)}
            </ul>
        </div>
    )
}

/* 
recipeTitle: "Crock Pot Teriyaki Pulled Pork",
id: 1,
favorite: true,
servings: 8,
timing: {prep: 5, cook: 480}, // mins convert to hours if >=60
ingredients: [
    {name: "pork shoulder butt roast", qty: "3", measure: "lb", des: ""},
    {name: "teriyaki sauce", qty: "1", measure: "cup", des: ""},
    {name: "honey", qty: "1/3", measure: "cup", des: ""},
    {name: "apple cider vinegar", qty: "1/3", measure: "cup", des: ""},
    {name: "garlic powder", qty: "2", measure: "tsp", des: ""},
    {name: "black pepper", qty: "1", measure: "tsp", des: ""},
    {name: "crushed red pepper flakes", qty: "1", measure: "tsp", des: ""},
],
instructions: [
    "Place pork roast in slow cooker",
    "Add all ingredients",
    "Cover and cook on LOW for 8 to 10 hours or HIGH for 5 to 6 hours.",
    "Shred with 2 forks"
],
notes:[] 
*/