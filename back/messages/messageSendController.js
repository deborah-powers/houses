// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import messagesModel from './messageModel'
import usersModel from '../users/userModel'
// module de gestion des dates perso
import date from '../library/date'

let saveMessage = (newMessage, result) =>{
	let savedMessage = new messagesModel (newMessage)
	return savedMessage.save().then(
		()=>{
			result.succes = 'succes'
			return result
		},
		(error) =>{
			result.succes = 'error in saving the message'
			return result
		}
)}
let sendMessage = (body, userEmail)=>{
	let result ={
		succes: 'error',
	}
	// verifier si l'utilisateur a entre un titre dans son message
	if (! body.title){
		result.succes = 'no title'
		return result
	}
	else{
		// trouver le destinataire
		const recipientId = body.recipientId
		return usersModel.findOne ({ _id: recipientId }).then(
			(recipient) =>{
				if (! recipient){
					result.succes = 'recipient not found'
					return result
				}
				else{
					// trouver la date
					const today = date.newDate()
					date.todayDate (today)
					const day = date.dayToString (today)
					// creer le message
					let newMessage ={
						date: day,
						dateRead: day,
						author: userEmail,
						recipient: recipient.email,
						title: body.title,
						content: body.content,
						read: false
					}
					// enregistrer le message
					return saveMessage (newMessage, result)
				}
			},
			(error) =>{ return result }
		)
	}
}
export default sendMessage
