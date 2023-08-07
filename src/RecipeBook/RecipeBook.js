import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useNavigate } from 'react-router-dom';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Tooltip from '@mui/material/Tooltip';
import './RecipeBook.css';
import RecipeCard from './RecipeCard';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RecipeBook({
	recipes,
	deleteRecipe,
	user,
	handleCloseSnack,
	openSnack,
	bookmarks,
	setBookmarks,
}) {
	const navigate = useNavigate();
	const isSignedIn = user.username !== '';

	const snackAction = (
		<React.Fragment>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleCloseSnack}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);
	return (
		<div>
			<div className="rb-root">
				{isSignedIn && (
					<Tooltip title="Add New Recipe" placement="left">
						<SpeedDial
							ariaLabel="add new recipe"
							sx={{ position: 'fixed', bottom: 16, right: 16 }}
							icon={<SpeedDialIcon openIcon={<LibraryAddIcon />} />}
							onClick={() => navigate('/recipes/new')}
							FabProps={{
								sx: {
									bgcolor: 'green',
									'&:hover': {
										bgcolor: 'green',
									},
								},
							}}
						/>
					</Tooltip>
				)}
				<div className="rb-card-container">
					{recipes.map((recipe, index) => (
						<div key={recipe.id} className="rb-cards">
							<RecipeCard
								recipe={recipe}
								recipes={recipes}
								index={index}
								deleteRecipe={deleteRecipe}
								user={user}
								bookmarks={bookmarks}
								setBookmarks={setBookmarks}
							/>
						</div>
					))}
				</div>
			</div>
			<div>
				<Snackbar
					open={openSnack}
					autoHideDuration={6000}
					onClose={handleCloseSnack}
					action={snackAction}>
					<Alert
						onClose={handleCloseSnack}
						severity="error"
						sx={{ width: '100%' }}>
						Recipe Deleted!
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
}
