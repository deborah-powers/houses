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

let routeUpdateMessage = express.Router()

routeUpdateMessage.put ('/messages/:id', middleware, function (req, res){
	// l'utilisateur est dans le header. je n'ai besoin que de son mail
	const userEmail = req.headers.user.email
	// retrouver le message
	const messageId = req.params.id
	function findMessageById (msg){ return msg.id == messageId }
	let message = messagesList.find (findMessageById)
	// retrouver aussi sa position dans la liste, afin de le modifier
	const indexMessage = messagesList.indexOf (message)
	// verifier si l'utilisateur en est bien le destinataire
	if (message.recipient !== userEmail)
		res.status (200).send ({ message: "vous n'etes pas le destinaire du message n°" + messageId })
	else{
		message.read = true
		// trouver la date
		const today = date.newDate()
		date.todayDate (today)
		const day = date.dayToString (today)
		message.dateRead = day
		// enregistrer le message
		console.log (messagesList)
		let jsonText = JSON.stringify (messagesList)
		jsonText = writeJson (jsonText)
		fileSystem.writeFile ('./data/messages.json', jsonText, function(error){
				if (error) console.log ("le fichier des messages n'a pas put etre lu"); 
			})
		res.status (200).send ({ message: 'le message n°'+ messageId +' a ete lu' })
	}
})
export default routeUpdateMessage;