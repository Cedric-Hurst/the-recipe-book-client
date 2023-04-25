import Navbar from "./Navbar"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeBook({ recipes }) {
    const expandArray = new Array(recipes.length).fill(false);
    const [expanded, setExpanded] = React.useState([...expandArray]);
    const navigate = useNavigate();

    const handleExpandClick = (index) => {
        const newExpanded = expanded;
        newExpanded[index] = !newExpanded[index];
        setExpanded([...newExpanded]);
    };
    return (
        <div>
            <Navbar pageName='Recipe Book'/>
            <div style={{ margin: '25px', marginTop: '75px' }}>
                <div>
                    <Button aria-label="add new Recipe" onClick={() => navigate('/recipes/new')}>
                        <LibraryAddIcon /> <span style={{paddingLeft: '5px'}}>Add New Recipe</span>
                    </Button>
                </div>
                {recipes.map((recipe, index) =>
                    <div key={recipe.id} style={{display: 'inline-flex' , margin: 5}}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                onClick={() => navigate(`/recipes/${recipe.id}`)}
                                avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    R
                                </Avatar>
                                }
                                action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                                }
                                title={recipe.recipeTitle}
                                subheader={`Serves: ${recipe.servings}`}
                            />
                          {/*   <CardMedia
                                component="img"
                                height="194"
                                image="/static/images/cards/paella.jpg"
                                alt="Paella dish"
                            /> */}
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add or remove from favorites">
                                    {recipe.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                expand={expanded[index]}
                                onClick={() => handleExpandClick(index)}
                                aria-expanded={expanded[index]}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>Ingredients:</Typography>
                                    <ul>
                                        {recipe.ingredients.map((ingredient, i) =>
                                            <li key={i}>
                                                {`${ingredient.qty} ${ingredient.measure} ${ingredient.ingredient}${ingredient.description.length > 1 ? ',' : ''} ${ingredient.description}`}
                                            </li>
                                        )}
                                    </ul>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}