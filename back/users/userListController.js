// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import usersModel from './userModel'

let getUsersList =()=>{
	let result ={
		succes: 'error',
		usersList: []
	}
	return usersModel.find ({}, { password: false }).then(
		(usersList) =>{
			if (! usersList || usersList.length ===0) result.succes = 'no users'
			else{
				// changer le nom du champ _id en id, afin de s'adapter au front
				usersList.forEach (function (user){
					let newUser ={
						id: user._id,
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName,
						adress: user.adress,
						creationDate: user.creationDate
					}
					result.usersList.push (newUser)
				})
				result.succes = 'succes'
			}
			return result
		},
		(error) =>{ return result }
	)
}
export default getUsersList
