import { Link } from "react-router-dom";

export default function RecipeBook({recipes}) {
    return (
        <div>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <Link to='/recipes/new'>Add Recipe</Link>
            </div>
            {recipes.map(recipe =>
                <div key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.recipeTitle}</Link>
                </div>
            )}
        </div>
    )
}