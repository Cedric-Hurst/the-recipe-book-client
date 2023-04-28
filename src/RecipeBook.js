import Navbar from "./Navbar"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { printTiming } from "./CodeHelper";

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

export default function RecipeBook({ recipes, updateRecipe, pageName, deleteRecipe }) {
  const expandArray = new Array(recipes.length).fill(false);
  const [expanded, setExpanded] = React.useState([...expandArray]);
  const [flipFlop, setFlipFlop] = React.useState(true);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openElem, setOpenElem] = React.useState(null);

  const handleClick = (id) => (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpenElem(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenElem(null);
  };
  const handleDelete = (id) => {
    deleteRecipe(id);
    handleClose();
  }
  const handleEdit = (id) => {
    handleClose();
    navigate(`/recipes/${id}/edit`);
  }

  const handleExpandClick = (index) => {
    const newExpanded = expanded;
    newExpanded[index] = !newExpanded[index];
    setExpanded([...newExpanded]);
  };
  const handleFavClick = (index) => {
    const newRecipe = recipes[index];
    newRecipe.favorite = !newRecipe.favorite;
    updateRecipe(newRecipe);
    setFlipFlop(!flipFlop);
  }
  const totalTime = (timing) => {
    const { prepTime, cookTime } = timing;
    let totalTime = { totalHr: 0, totalMin: 0 };

    totalTime.totalHr = prepTime.prepHr + cookTime.cookHr;
    totalTime.totalMin = prepTime.prepMin + cookTime.cookMin;
    if ((totalTime.totalMin / 60) > 0) {
      totalTime.totalHr += Math.floor(totalTime.totalMin / 60);
      totalTime.totalMin = totalTime.totalMin % 60;
    }
    return printTiming(totalTime.totalHr, totalTime.totalMin);
  }

  const navigate = useNavigate();
  return (
    <div>
      <Navbar pageName={pageName}/>
      <div style={{ margin: '25px', marginTop: '75px' }}>
        <div>
          <Button aria-label="add new Recipe" onClick={() => navigate('/recipes/new')}>
            <LibraryAddIcon /> <span style={{paddingLeft: '5px'}}>Add New Recipe</span>
          </Button>
        </div>
        {recipes.map((recipe, index) =>
          <div key={recipe.id} style={{display: 'inline-flex' , margin: '10px'}}>
            <Card sx={{ width: 345 }}>
              <CardHeader
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                avatar={
                <Avatar sx={{ bgcolor: red[300 + (100 * index)] }} aria-label="recipe">
                  {recipe.recipeTitle[0]}
                </Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={handleClick(recipe)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={recipe.recipeTitle}
                subheader={`Serves: ${recipe.servings}`}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openElem ===  recipe}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={(e)=> handleEdit(recipe.id)}>
                  <EditIcon sx={{mr: '15px'}}/> Edit
                </MenuItem>
                <MenuItem onClick={(e) => handleDelete(recipe.id)}>
                  <DeleteForeverIcon sx={{mr: '15px'}}/> Delete
                </MenuItem>
              </Menu>
              <CardMedia
                component="img"
                height="194"
                image={recipe.img}
                alt={recipe.recipeTitle}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Total Time: {totalTime(recipe.timing)}
                </Typography>
                <Stack direction="row" spacing={1} sx={{mt:'10px'}}>
                  {recipe.category.map((cat, i)=> <Chip key={i} label={cat} />)}
                </Stack>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add or remove from favorites" onClick={() => handleFavClick(index)}>
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