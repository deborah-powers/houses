import express from 'express'
import fileSystem from 'fs'
import bodyParser from 'body-parser'
import basic from './library/user-list'
import middleware from './library/user-exists'
import writeJson from './library/writeJson'
import date from './library/date'

const jsonFile = './data/messages.json'
const messagesList = require (jsonFile)
function sortById (msg1, msg2){
	return msg1.id - msg2.id
}

let routeSendMessage = express.Router()

routeSendMessage.post ('/messages', middleware, function (req, res){
	// l'utilisateur est dans le header. je n'ai besoin que de son mail
	const userEmail = req.headers.user.email
	// creer le nouvel id
	messagesList.sort (sortById)
	const posMax = messagesList.length -1
	let idMax = messagesList [posMax].id
	idMax = idMax +1
	// trouver la date
	const today = date.newDate()
	date.todayDate (today)
	const day = date.dayToString (today)
	// trouver le destinataire
	const recipientId = req.body.recipientId
	function findRecipientById (usr){
		return (usr.id === parseInt (recipientId))
	}
	let recipient = basic.jsonList.find (findRecipientById)
	// echapper le titre et le message, afin qu'ils s'ecrivent bien dans le json
	let escapedTitle = ' '+ req.body.title +' '
	escapedTitle = encodeURI (escapedTitle)
	let escapedContent = ' '+ req.body.content +' '
	escapedContent = encodeURI (escapedContent)
	// creer le message
	let newMessage ={
		id: idMax,
		date: day,
		dateRead: day,
		author: userEmail,
		recipient: recipient.email,
		title: escapedTitle,
		content: escapedContent,
		read: false
	}
	// enregistrer le message
	messagesList.push (newMessage)
	let jsonText = JSON.stringify (messagesList)
	jsonText = writeJson (jsonText)
	fileSystem.writeFile ('./data/messages.json', jsonText, function(error){
			if (error) console.log ("le fichier des messages n'a pas put etre modifie"); 
		})
	res.status (200).send ({ message: "le message a ete engegistre" })
})
export default routeSendMessage;