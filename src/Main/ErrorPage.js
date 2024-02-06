import './ErrorPage.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const ErrorPaper = styled(Paper)(({ theme }) => ({
	width: '50%',
	height: '35%',
	padding: theme.spacing(2),
	...theme.typography.body2,
	margin: 'auto',
	marginTop: '30vh',
	backgroundColor: 'rgba(0,128,0,0.9)',
	color: 'white',
}));

export default function ErrorPage({ errorCode }) {
	return (
		<div className="EP_background">
			<ErrorPaper elevation={3}>
				<p className="EP_text">Uh Oh, there seems to be a problem </p>
				<p className="EP_para">
					<span className="EP_title">ERROR: </span>
					<span className="EP_error">{errorCode}</span>
				</p>
				<p className="EP_para">
					<span className="EP_title">PATH: </span>
					<span className="EP_error">{useLocation().pathname}</span>
				</p>
			</ErrorPaper>
		</div>
	);
}
