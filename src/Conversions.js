import './Conversions.css';
const fraction = (x) => {
	//replace decimals with fractions
	const wholeNum = Math.floor(x);
	const decimal = round2Num(x - wholeNum);
	if (decimal === 0.25) return `${wholeNum === 0 ? '' : wholeNum}¼`;
	else if (decimal === 0.33) return `${wholeNum === 0 ? '' : wholeNum}⅓`;
	else if (decimal === 0.5) return `${wholeNum === 0 ? '' : wholeNum}½`;
	else if (decimal === 0.67) return `${wholeNum === 0 ? '' : wholeNum}⅔`;
	else if (decimal === 0.75) return `${wholeNum === 0 ? '' : wholeNum}¾`;
	else return x;
};
const round2Num = (x) => {
	//round decimals to the 100th place
	return Math.round((x + Number.EPSILON) * 100) / 100;
};
// Volume conversions
export const tsp = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x / 3))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{round2Num(x / 6)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 48))}
					<span id="measure">{' c'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 96))}
					<span id="measure">{' pt'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x / 192))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 768))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x * 4.928922)}
					<span id="measure">{' ml'}</span>
				</span>
				<span id="full">
					{round2Num(x * 0.004929)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const tbsp = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 3))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{round2Num(x / 2)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 16))}
					<span id="measure">{' c'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 32))}
					<span id="measure">{' pt'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x / 64))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 256))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x * 14.786765)}
					<span id="measure">{' ml'}</span>
				</span>
				<span id="full">
					{round2Num(x * 0.014787)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const fl = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 6))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 2))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 8))}
					<span id="measure">{' c'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 16))}
					<span id="measure">{' pt'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x / 32))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 128))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x * 29.57353)}
					<span id="measure">{' ml'}</span>
				</span>
				<span id="full">
					{round2Num(x * 0.029574)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const c = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 48))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 16))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{round2Num(x * 8)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 2))}
					<span id="measure">{' pt'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x / 4))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 16))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x * 236.588236)}
					<span id="measure">{' ml'}</span>
				</span>
				<span id="full">
					{round2Num(x * 0.236588)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const pt = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 96))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 32))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{round2Num(x * 16)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 2))}
					<span id="measure">{' c'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x / 2))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 8))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x * 473.176473)}
					<span id="measure">{' ml'}</span>
				</span>
				<span id="full">
					{round2Num(x * 0.473176)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const qt = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 192))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 64))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{round2Num(x * 32)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 4))}
					<span id="measure">{' c'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 2))}
					<span id="measure">{' pt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x / 4))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x * 946.352946)}
					<span id="measure">{' ml'}</span>
				</span>
				<span id="full">
					{round2Num(x * 0.946353)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const gal = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 768))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 256))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{round2Num(x * 128)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 16))}
					<span id="measure">{' c'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 8))}
					<span id="measure">{' pt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 4))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{round2Num(x * 3785.411784)}
					<span id="measure">{' ml'}</span>
				</span>
				<span id="full">
					{round2Num(x * 3.785412)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const ml = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 0.202884))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 0.067628))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{round2Num(x * 0.033814)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 0.004227))}
					<span id="measure">{' c'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 0.002113))}
					<span id="measure">{' pt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 0.001057))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 0.000264))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x / 1000)}
					<span id="measure">{' l'}</span>
				</span>
			</span>
		</span>
	);
};
export const l = (x) => {
	return (
		<span className="measureSpan">
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 202.884136))}
					<span id="measure">{' tsp'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 67.628045))}
					<span id="measure">{' tbsp'}</span>
				</span>
				<span id="full">
					{round2Num(x * 33.814023)}
					<span id="measure">{' fl oz'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 4.226753))}
					<span id="measure">{' c'}</span>
				</span>
			</span>
			<span id="half">
				<span id="full">
					{fraction(round2Num(x * 2.113376))}
					<span id="measure">{' pt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 1.056688))}
					<span id="measure">{' qt'}</span>
				</span>
				<span id="full">
					{fraction(round2Num(x * 0.264172))}
					<span id="measure">{' gal'}</span>
				</span>
				<span id="full">
					{round2Num(x * 1000)}
					<span id="measure">{' ml'}</span>
				</span>
			</span>
		</span>
	);
};
// Weight Conversions
export const kg = (x) => {
	return (
		<span className="measureSpan">
			<span id="full">
				{round2Num(x * 1000)}
				<span id="measure">{' g'}</span>
			</span>
			<span id="full">
				{round2Num(x * 1000000)}
				<span id="measure">{' mg'}</span>
			</span>
			<span id="full">
				{round2Num(x * 35.273962)}
				<span id="measure">{' oz'}</span>
			</span>
			<span id="full">
				{round2Num(x * 2.204623)}
				<span id="measure">{' lb'}</span>
			</span>
		</span>
	);
};
export const mg = (x) => {
	return (
		<span className="measureSpan">
			<span id="full">
				{round2Num(x / 1000000)}
				<span id="measure">{' kg'}</span>
			</span>
			<span id="full">
				{round2Num(x / 1000)}
				<span id="measure">{' g'}</span>
			</span>
			<span id="full">
				{round2Num(x * 0.000035274)}
				<span id="measure">{' oz'}</span>
			</span>
			<span id="full">
				{round2Num(x * 0.0000022046)}
				<span id="measure">{' lb'}</span>
			</span>
		</span>
	);
};
export const g = (x) => {
	return (
		<span className="measureSpan">
			<span id="full">
				{round2Num(x / 1000)}
				<span id="measure">{' kg'}</span>
			</span>
			<span id="full">
				{round2Num(x * 1000)}
				<span id="measure">{' mg'}</span>
			</span>
			<span id="full">
				{round2Num(x * 0.035274)}
				<span id="measure">{' oz'}</span>
			</span>
			<span id="full">
				{round2Num(x * 0.002205)}
				<span id="measure">{' lb'}</span>
			</span>
		</span>
	);
};
export const oz = (x) => {
	return (
		<span className="measureSpan">
			<span id="full">
				{round2Num(x * 0.02835)}
				<span id="measure">{' kg'}</span>
			</span>
			<span id="full">
				{round2Num(x * 28.349523)}
				<span id="measure">{' g'}</span>
			</span>
			<span id="full">
				{round2Num(x * 28349.523125)}
				<span id="measure">{' mg'}</span>
			</span>
			<span id="full">
				{round2Num(x / 16)}
				<span id="measure">{' lb'}</span>
			</span>
		</span>
	);
};
export const lb = (x) => {
	return (
		<span className="measureSpan">
			<span id="full">
				{round2Num(x * 0.45359237)}
				<span id="measure">{' kg'}</span>
			</span>
			<span id="full">
				{round2Num(x * 453.59237)}
				<span id="measure">{' g'}</span>
			</span>
			<span id="full">
				{round2Num(x * 453592.37)}
				<span id="measure">{' mg'}</span>
			</span>
			<span id="full">
				{round2Num(x * 16)}
				<span id="measure">{' oz'}</span>
			</span>
		</span>
	);
};
