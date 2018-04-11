import express from 'express';
import basic from './library/user-list.js'
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

let routeLogin = express.Router();

routeLogin.use (bodyParser.json());
routeLogin.use (bodyParser.urlencoded ({ extended: false }));

/* quand je tente un post, la page me dit cannot get /ma-page
body parser
il faut utiliser postman pour faire des put, post, delete
*/
routeLogin.post ('/auth/login', function (req, res){
	// recuperer les parametres
	let email = req.body.email;
	let password = req.body.password;
	function findPerson (user){
		return user.email === email;
	}
	let goodUser = basic.jsonList.find (findPerson);
	if (goodUser){
		if (goodUser.password === password){
			let token = jwt.sign (goodUser, 'shhhhh');
			console.log ('user exists. created token =', token);
			res.status (200).send ({ message: "cet utilisateur existe", token: token });
		}
		// je renvoi un statut de 200 car sinon le token n'est pas renvoye
		else{
			console.log ('unknown password:', password);
			res.status (200).send ({ message: "aucun utilisateur n'utilise le mot de passe "+ password, token: null });
		}
	}
	else{
		console.log ('unknown email:', email);
		res.status (200).send ({ message: "aucun utilisateur n'utilise le nom "+ email, token: null });
	}
});
export default routeLogin;
