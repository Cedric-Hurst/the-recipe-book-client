import { Link } from "react-router-dom";
import Navbar from "./Navbar"

export default function RecipeBook({recipes}) {
    return (
        <div>
            <Navbar pageName='Recipe Book'/>
            <div style={{ margin: '25px', marginTop: '75px' }}>
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
        </div>
    )
}