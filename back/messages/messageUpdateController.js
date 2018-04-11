// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import messagesModel from './messageModel'
// module de gestion des dates perso
import date from '../library/date'

let updateMessage = (messageId)=>{
	let result ={
		succes: 'error',
	}
	// trouver la date
	const today = date.newDate()
	date.todayDate (today)
	const day = date.dayToString (today)
	// retrouver le message
	return messagesModel.updateOne ({ _id: messageId }, { dateRead: day, read: true }).then(
		()=>{
			result.succes = 'succes'
			return result
		},
		(error) =>{ return result }
	)
}
export default updateMessage