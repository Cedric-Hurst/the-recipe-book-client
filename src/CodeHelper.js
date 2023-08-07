import axios from 'axios';

// Encrypt data
export async function encryptData(data) {
	try {
		const res = await axios.get('http://localhost:3300/encrypt', {
			params: {
				q: `${JSON.stringify(data)}`,
			},
		});
		return res.data;
	} catch (e) {
		console.log(e); // TODO: change for post
	}
}
// Decrypt data
export async function decryptData(encryptedData) {
	try {
		const res = await axios.get('http://localhost:3300/decrypt', {
			params: {
				q: `${encryptedData}`,
			},
		});
		return JSON.parse(res.data);
	} catch (e) {
		console.log(e); // TODO: change for post
	}
}
export const printTiming = (hr, min) => {
	let res = '';

	if (hr === 0) {
		//if no hours show mins
		res = `${min} Mins`;
	} else if (hr > 0) {
		//if there is hours
		if (min === 0) {
			//if there is hours and no mins
			if (hr === 1) {
				//if hours is one
				res = `${hr} Hr`;
			} else {
				res = `${hr} Hrs`;
			}
		} else {
			//if there is hours and mins
			if (hr === 1) {
				//if there is one hour and mins
				res = `${hr} Hr ${min} Mins`;
			} else {
				//if there is hours and mins
				res = `${hr} Hrs ${min} Mins`;
			}
		}
	}
	return res;
};

// Bookmarked
export async function bookmark(recipeId, userId) {
	try {
		await axios.post('http://localhost:3300/bookmark', {
			recipeId: recipeId,
			userId: userId,
		});
	} catch (e) {
		console.log(e);
	}
}
export async function removeBookmark(recipeId, userId) {
	try {
		await axios.put('http://localhost:3300/bookmark', {
			recipeId: recipeId,
			userId: userId,
		});
	} catch (e) {
		console.log(e);
	}
}
export async function getBookmark(userId) {
	try {
		const res = await axios.get('http://localhost:3300/bookmark', {
			params: {
				q: userId,
			},
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
}
