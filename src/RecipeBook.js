import { Link } from "react-router-dom";

export default function RecipeBook({recipes}) {
    return (
        <div>
            {recipes.map(recipe =>
                <div>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.recipeTitle}</Link>
                </div>
            )}
        </div>
    )
}