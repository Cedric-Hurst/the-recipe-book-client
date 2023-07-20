import FrontPageCard from './FrontPageCard';
import Grid from '@mui/material/Grid';

export default function FrontPage() {
	return (
		<div style={{ margin: '25px', marginTop: '75px' }}>
			<Grid
				container
				spacing={2}
				justifyContent="space-evenly"
				direction="row"
				sx={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '30px' }}>
				<Grid item xs={4}>
					<div className="fp-card">
						<FrontPageCard
							description="Click here to discover new recipes."
							pageUrl="/recipes"
							title="Discover Recipes"
							img="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=892&q=80"
							imgAlt="Recipes"
						/>
					</div>
				</Grid>
				<Grid item xs={4}>
					<div className="fp-card">
						<FrontPageCard
							description="Click here to view your bookmarked recipes."
							pageUrl="/bookmarks"
							title="Bookmarked Recipes"
							img="https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=867&q=80"
							imgAlt="Bookmarks"
						/>
					</div>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				justifyContent="space-evenly"
				direction="row"
				sx={{ marginLeft: 'auto' }}>
				<Grid item xs={4}>
					<div className="fp-card">
						<FrontPageCard
							description="Click here to view all recipes created you"
							pageUrl="/myrecipes"
							title="My Recipes"
							img="https://images.unsplash.com/photo-1556909211-36987daf7b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
							imgAlt="MyRecipes"
						/>
					</div>
				</Grid>
				<Grid item xs={4}>
					<div className="fp-card">
						<FrontPageCard
							description="Click here to add a new recipe."
							pageUrl="/recipes/new"
							title="Add New Recipe"
							img="https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
							imgAlt="Add New Recipe"
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
