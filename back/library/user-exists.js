import jwtDecode from 'jwt-decode';
// connection avec la bdd
import mongoose from 'mongoose'
// modele des utilisateurs
import usersModel from '../users/userModel'

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
			// connection a la bdd
			usersModel.findOne ({ email: token.email, password: token.password }, function (error, goodUser){
				if (error){
					console.log ('une erreur est survenue durant la connection avec la bdd')
					res.status (404).send ({ succes: false, message: 'une erreur est survenue durant la connection avec la bdd' })
				}
				else if (goodUser){
					console.log ("l'utilisateur correspondant au couriel "+ token.email +" a ete identifie dans la bdd. Vous pouvez acceder a cette page")
					// console.log ('You can access this route')
					req.headers.user = goodUser;
					next();
				}
				else{
					console.log ('You must be loged to access this route');
					res.status (412).send ({ succes: false, message: 'You must be loged to access this route' })
				}
			})
		}
	}
};
export default userExists;