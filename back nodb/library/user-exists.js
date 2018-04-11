import jwtDecode from 'jwt-decode';

const jsonFile = '../data/login.json';
let usersList = require (jsonFile);

let userExists = (req, res, next) => {
	/* le token est dans le header */
	const codedToken = req.headers.token;
	let token = null;
	if (! codedToken || codedToken === null || codedToken === 'null'){
		console.log ('You must be loged to access this route');
		res.status (412).send ({ succes: false, message: 'You must be loged to access this route' });
	}
	else{
		let token = jwtDecode (codedToken);
		if (! token.email || ! token.password){
			console.log ('An error ocurred during the token creation');
			res.status (412).send ({ succes: false, message: 'An error ocurred during the token creation' });
		}
		else{
			function findUser (user){
				return user.email === token.email && user.password === token.password; }
			let goodUser = usersList.find (findUser);
			if (goodUser){
				console.log ('You can access this route')
				req.headers.user = goodUser;
				next();
			}
			else{
				console.log ('You must be loged to access this route');
				res.status (412).send ({ succes: false, message: 'You must be loged to access this route' });
			}
		}
	}
};
export default userExists;