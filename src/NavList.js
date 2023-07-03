import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { mainCategories } from './RecipeData';
import { useNavigate } from 'react-router-dom';

export default function NavList({ handleDrawerClose, user }) {
	const [catOpen, setCatOpen] = React.useState(false);
	const navigate = useNavigate();
	const handleCatClick = () => {
		setCatOpen(!catOpen);
	};

	return (
		<List
			sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			/* subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        MyRecipes
        </ListSubheader>
      } */
		>
			<ListItemButton
				onClick={() => {
					navigate('/');
					handleDrawerClose();
				}}>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItemButton>
			<ListItemButton
				onClick={() => {
					navigate('/recipes');
					handleDrawerClose();
				}}>
				<ListItemIcon>
					<ArticleIcon />
				</ListItemIcon>
				<ListItemText primary="Recipes" />
			</ListItemButton>
			{user.username !== '' && ( // if signed in then user can see favorites and add recipes
				<>
					<ListItemButton
						onClick={() => {
							navigate('/recipes/new');
							handleDrawerClose();
						}}>
						<ListItemIcon>
							<LibraryAddIcon />
						</ListItemIcon>
						<ListItemText primary="Add New Recipe" />
					</ListItemButton>
					<ListItemButton
						onClick={() => {
							navigate('/recipes/favorites');
							handleDrawerClose();
						}}>
						<ListItemIcon>
							<FavoriteIcon />
						</ListItemIcon>
						<ListItemText primary="Favorites" />
					</ListItemButton>
				</>
			)}
			<ListItemButton onClick={handleCatClick}>
				<ListItemText primary="Recipe Categories" />
				{catOpen ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={catOpen} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{mainCategories.map((cat, i) => (
						<ListItemButton
							key={i}
							onClick={() => {
								navigate(`/recipes/category/${cat}`);
								handleDrawerClose();
							}}
							sx={{ pl: 4 }}>
							<ListItemText primary={`${cat}`} />
						</ListItemButton>
					))}
				</List>
			</Collapse>
		</List>
	);
}
