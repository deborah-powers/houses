import express from 'express';
import basic from './library/user-list'
import jwt from 'jsonwebtoken';
import fileSystem from 'fs';
import bodyParser from 'body-parser';
import writeJson from './library/writeJson';
import mongoose from 'mongoose';

function replaceAll (text, oldWord, newWord){
	var textList = text.split (oldWord);
	text = textList.join (newWord);
	return text;
}

let routeSignup = express.Router();

routeSignup.use (bodyParser.json());
routeSignup.use (bodyParser.urlencoded ({ extended: false }));

/* quand je tente un post, la page me dit cannot get /ma-page
body parser
il faut utiliser postman pour faire des put, post, delete
*/
routeSignup.post ('/auth/signup', function (req, res){
	// recuperer les parametres
	let email = req.body.email;
	let password = req.body.password;
	function findPersonByemail (user){
		return user.email === email;
	}
	function findPersonByPassword (user){
		return user.password === password;
	}
	let goodUser = basic.jsonList.find (findPersonByemail);
	if (goodUser) res.status (200).send ({ message: "un utilisateur utilise deja le couriel "+ email, token: null });
	else{
		goodUser = basic.jsonList.find (findPersonByPassword);
		if (goodUser) res.status (200).send ({ message: "un utilisateur utilise deja le mot de passe "+ password, token: null });
		else{
			// calculer le nouvel indentifiant
			let newId = basic.idMax +1;
			basic.idMax = newId;
			// creer l'utilisateur
			goodUser ={
				id: newId,
				email: email,
				password: password,
				firstName: req.body.firstName,
				lastName: req.body.lastName
			};
			// rajouter le nouveau profil dans la liste
			basic.jsonList.push (goodUser);
			let jsonText = JSON.stringify (basic.jsonList);
			jsonText = writeJson (jsonText);
			jsonText = replaceAll (jsonText, '":\t', '":\t\t');
			// l'id
			jsonText = replaceAll (jsonText, '"id":\t', '"id":\t\t');
			// garder les affichages alignes
			jsonText = replaceAll (jsonText, 'firstName":\t\t', 'firstName":\t');
			fileSystem.writeFile ('./data/login.json', jsonText, function(error){
				if (error) console.log ("le fichier json n'a pas put etre modifie"); 
			});
			// creer le token
			let token = jwt.sign (goodUser, 'shhhhh');
			console.log ('user created. created token =', token);
			res.status (200).send ({ message: "le nouvel utilisateur a ete cree", token: token });
		}
	}
});
export default routeSignup;
