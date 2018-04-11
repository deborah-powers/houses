// connection avec la bdd
import mongoose from 'mongoose'
// recuperer le modele
import messagesModel from './messageModel'
import usersModel from '../users/userModel'

let nammingMessagesFromUser	 = (messagesList, user, whoIsUser) =>{
	// fonction des messages
	// si user est leur autheur
	let selectMessages = (message) =>{ return (user.email === message.author) && (message.author !== message.recipient) }
	let setMessageName = (message) =>{
		message.author = user.firstName +' '+ user.lastName
		return message
	}
	// si user est leur destinataire
	if (whoIsUser === 'recipient'){
		selectMessages = (message) =>{ return user.email === message.recipient }
		setMessageName = (message) =>{
			message.recipient = user.firstName +' '+ user.lastName
			message.toMarkAsRead = true
			return message
		}
	}
	// recuperer les messages d'interet
	let yourMessages = messagesList.filter (selectMessages)
	let nammedMessages =[]
	yourMessages.forEach (function (message){
		let messageWithName ={
			id: message._id,
			date: message.date,
			author: message.author,
			recipient: message.recipient,
			title: message.title,
			content: message.content,
			read: message.read,
			toMarkAsRead: false
		}
		messageWithName = setMessageName (messageWithName)
		nammedMessages.push (messageWithName)
	})
	return nammedMessages
}
let getMessagesList = (user)=>{
	let result ={
		succes: 'error',
		messagesList: []
	}
	// recuperer tous les messages
	return messagesModel.find ({}).then(
		(messagesList) =>{
			if (! messagesList || messagesList.length ===0){
				result.succes = 'no messages'
				return result
			}
			else{
				// recuperer les messages ecris ou recus par l'utilisateur
				let msgWrittenByYou = nammingMessagesFromUser (messagesList, user, 'author')
				let msgReceivedByYou = nammingMessagesFromUser (messagesList, user, 'recipient')
				// recuperer les utilisateurs afin de retrouver leurs noms
				return usersModel.find ({}, { password: false }).then(
					(usersList) =>{
						if (! usersList || usersList.length ===0) result.succes = 'no users'
						else{
							// retrouver les noms des destinataires
							msgWrittenByYou.forEach (function (message){
								function findMessageRecipient (usr){
									return message.recipient === usr.email
								}
								const recipient = usersList.find (findMessageRecipient)
								message.recipient = recipient.firstName +' '+ recipient.lastName
								result.messagesList.push (message)
							})
							// retrouver les noms des autheurs
							msgReceivedByYou.forEach (function (message){
								function findMessageAuthor (usr){ return message.author === usr.email }
								const author = usersList.find (findMessageAuthor)
								message.author = author.firstName +' '+ author.lastName
								result.messagesList.push (message)
							})
							result.succes = 'succes'
						}
						return result
					},
					(error) =>{
						result.succes = 'error in listing users'
						return result
					}
				)
			}
		},
		(error) =>{
			result.succes = 'error in listing messages'
			return result
		}
)}
export default getMessagesList
