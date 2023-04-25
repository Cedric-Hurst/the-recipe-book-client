import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { mainCategories } from './FormData';
import {useNavigate} from 'react-router-dom';

export default function NavList({pageName}) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

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
            <ListItemButton onClick={() => navigate('/recipes')}>
                <ListItemIcon>
                    <MenuBookIcon />
                </ListItemIcon>
                <ListItemText primary="Recipe Book" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                    <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Favorites" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Recipe Categories" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {mainCategories.map((cat, i) =>
                        <ListItemButton key={i} sx={{ pl: 4 }}>
                            <ListItemText primary={`${cat}`} />
                        </ListItemButton>
                    )}
                </List>
            </Collapse>
        </List>
    );
}