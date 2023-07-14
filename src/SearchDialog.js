import * as React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import './SearchDialog.css';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '300px',
	[theme.breakpoints.down('md')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
	[theme.breakpoints.down('sm')]: {
		display: 'none',
	},
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

export default function SearchDialog({ openSearchDia, handleSearchClose }) {
	const [searchResult, setSearchResult] = React.useState([]);
	const navigate = useNavigate();

	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (openSearchDia) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [openSearchDia]);

	const handleSearch = async (e) => {
		if (e.target.value !== '') {
			try {
				const res = await axios.get('http://localhost:3300/search', {
					params: {
						q: `${e.target.value}`,
					},
				});
				setSearchResult(res.data);
			} catch (e) {
				console.log(e); // TODO: change for post
			}
		} else {
			setSearchResult([]);
		}
	};
	return (
		<Dialog
			open={openSearchDia}
			onClose={handleSearchClose}
			scroll="paper"
			aria-labelledby="search-dialog"
			aria-describedby="search-info">
			<DialogTitle id="Searchbar">
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						id="searchbar"
						placeholder="Search…"
						inputProps={{ 'aria-label': 'search' }}
						onChange={handleSearch}
					/>
				</Search>
			</DialogTitle>
			<DialogContent dividers={true}>
				<DialogContentText
					id="scroll-dialog-description"
					ref={descriptionElementRef}
					tabIndex={-1}>
					{searchResult.map((res) => {
						return (
							<span
								className="sd-searchResult"
								onClick={() => {
									navigate(`/recipes/${res.id}`);
									handleSearchClose();
								}}>
								{res.recipeTitle}
							</span>
						);
					})}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
}
