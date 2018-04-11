// encoder le token
import jwt from 'jsonwebtoken';
// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import usersModel from '../users/userModel'


let createUser = (simpleUser, result) =>{
	let newUser = new usersModel (simpleUser)
	return newUser.save().then(
		()=>{
			// creer le token. on ne peut le creer a partir de goodUser, il faut passer par un objet simple
			let token = jwt.sign (simpleUser, 'shhhhh')
			result.succes = 'succes'
			result.token = token
			return result
		},
		(error) =>{
			result.succes = 'error in creating the user'
			return result
		}
)}

let findUser = (body) =>{
	let result ={
		succes: 'error',
		token: null
	}
	return usersModel.findOne ({ email: body.email, password: body.password }).then(
		(goodUser) =>{
			if (goodUser){
				result.succes = 'user already exists'
				return result
			}
			else{
				// creer l'utilisateur
				let simpleUser ={
					email: body.email,
					password: body.password,
					firstName: body.firstName,
					lastName: body.lastName
				}
				// rajouter le nouveau profil dans la bdd
				return createUser (simpleUser, result)
			}
		},
		(error) =>{ return result }
)}
export default findUser;
