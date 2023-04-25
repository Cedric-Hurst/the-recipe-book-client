import { Link } from "react-router-dom"
import Navbar from "./Navbar"

export default function FrontPage() {
    return (
        <div style={{margin: '25px', marginTop: '75px'}}>
            <Navbar pageName='MyRecipes'/>
            <p><Link to='/recipes'>Recipe Book</Link></p>
            <p>Pantry</p>
            <p>random recipes</p>
            <p>Drink Book?</p>
            <p>Dry Bar?</p>
        </div>
    )
}