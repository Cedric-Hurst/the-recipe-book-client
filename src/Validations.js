//no special characters
export function validateName(input) {
	let re = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
	return re.test(input);
}
// whole numbers only
export function validateNumber(number) {
	let re = /^[0-9]*$/;
	return re.test(number);
}
// validate email addresses. ex: name.anothername@example.com
export function validateEmail(email) {
	let re = /\S+@\S+\.\S+/;
	return re.test(email);
}
// validate username. ex: name.name or name_name or name123
// (min 6 characters, max 30) cant start or end with . or _ and no special characters
export function validateUsername(name) {
	let re = /^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
	return re.test(name);
}