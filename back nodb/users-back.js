import express from 'express';
import basic from './library/user-list'
import middleware from './library/user-exists';

let routeUsers = express.Router();

routeUsers.get ('/users', middleware, function (req, res){
	if (basic.jsonList){
		let usersList =[];
		basic.jsonList.forEach (function (user){
			let userPasswordless ={
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			};
			usersList.push (userPasswordless);
		});
		res.status (200).send ({ message: "Utilisateurs", usersList: usersList });
	}
	else res.status (200).send ({ message: "Aucun utilisateur", usersList: [] });
});
export default routeUsers;


