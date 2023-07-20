import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function FrontPageCard({
	description,
	pageUrl,
	title,
	img,
	imgAlt,
}) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(pageUrl);
	};
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea onClick={handleClick}>
				<CardMedia component="img" height="140" image={img} alt={imgAlt} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
