// encoder le token
import jwt from 'jsonwebtoken';
// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import usersModel from '../users/userModel'

let findUser = (email, password)=>{
	let result ={
		succes: 'error',
		token: null
	}
	return usersModel.findOne ({ email: email, password: password }).then(
		(goodUser) =>{
			if (! goodUser) result.succes = 'unknown user'
			else{
				// le token n'est pas cree a partir de goodUser, il faut transvaser ses donnees dans une variable
				let simpleUser ={
					id: goodUser._id,
					email: goodUser.email,
					password: goodUser.password,
					firstName: goodUser.firstName,
					lastName: goodUser.lastName
				}
				let token = jwt.sign (simpleUser, 'shhhhh')
				result.succes = 'succes'
				result.token = token
			}
			return result
		},
		(error) =>{ return result }
	)
}
export default findUser;
