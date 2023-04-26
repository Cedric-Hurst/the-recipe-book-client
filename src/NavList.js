import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';import { mainCategories } from './FormData';
import {useNavigate} from 'react-router-dom';

export default function NavList({pageName}) {
    const [open, setOpen] = React.useState(false);
    const [catOpen, setCatOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };
    const handleCatClick = () => { 
        setCatOpen(!catOpen);
    }

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                MyRecipes
                </ListSubheader>
            }
        >
            <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Recipe Book" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/recipes')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recipes" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/recipes/new')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <LibraryAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add New Recipe" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/recipes/favorites')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItemButton>
                    <ListItemButton onClick={handleCatClick} sx={{ pl: 4 }}>
                        <ListItemText primary="Recipe Categories" />
                        {catOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={catOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {mainCategories.map((cat, i) =>
                                <ListItemButton key={i} sx={{ pl: 8 }}>
                                    <ListItemText primary={`${cat}`} />
                                </ListItemButton>
                            )}
                        </List>
                    </Collapse>
                </List>
            </Collapse>
        </List>
    );
}

/* 




            
*/