// encoder le token
import jwt from 'jsonwebtoken';
// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import usersModel from '../users/userModel'

let findUser = (body)=>{
	let result ={
		succes: 'error',
		token: null
	}
	if (! body.email || ! body.password) result.succes = 'missing parameters'
	else{
		usersModel.findOne ({ email: email, password: password }, function (error, goodUser){
			if (error) result.succes = 'error'
			else if (goodUser) result.succes = 'user already exists'
			else{
				// creer l'utilisateur
				let simpleUser ={
					email: body.email,
					password: body.password,
					firstName: body.firstName,
					lastName: body.lastName
				}
				// rajouter le nouveau profil dans la bdd
				let newUser = new dbConnect.usersModel (simpleUser)
				newUser.save (function (error, result){
					if (error) result.succes = 'error in creating the user'
					else{
						// creer le token. on ne peut le creer a partir de goodUser, il faut passer par un objet simple
						let token = jwt.sign (simpleUser, 'shhhhh')
						result.succes = 'succes'
						result.token = token
					}
				})
			}
		})
	}
	return result
}
export default findUser;
