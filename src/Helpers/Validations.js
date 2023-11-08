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
// validate password, one capitalize letter, one lower, one number,
// and one special character, min 8 characters
export function validatePassword(str) {
	let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	return re.test(str);
}
// validate username. ex: name.name or name_name or name123
// (min 6 characters, max 30) cant start or end with . or _ and no special characters
export function validateUsername(name) {
	let re = /^(?=.{6,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
	return re.test(name);
}
export function validateImageUrl(url) {
	// not used yet, added for possible future use
	let re = /(https?:\/\/.*\.(?:png|jpg))/i;
	return re.test(url);
}

// check to see if file extension is an image. may add more to later (maybe use an array)
export function validateFileExt(fileName) {
	const fileExt = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
	if (fileExt === '.png' || fileExt === '.jpg' || fileExt === '.jpeg') {
		return true;
	} else {
		return false;
	}
}
