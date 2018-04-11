// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import usersModel from './userModel'

let getUser = (user) =>{
	let result ={
		succes: 'error',
		user: {}
	}
	if (user){
		result.succes = 'succes'
		result.user = user
	}
	return result
}
export default getUser
