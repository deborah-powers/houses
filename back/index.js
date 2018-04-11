import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routeAuthLogin from './auth/authLoginRoute'
import routeAuthSignup from './auth/authSignupRoute'
import routeUserList from './users/userListRoute'
import routeMessageList from './messages/messageListRoute'
import routeMessageSend from './messages/messageSendRoute'
import routeMessageUpdate from './messages/messageUpdateRoute'

// port du serveur
const port = 1407
// connexion a mongodb via une promesse mongoose
const dbName = 'projetVuejs'
let options ={}
mongoose.connect ('mongodb://localhost/' + dbName, options).then(
	()=>{
		console.log ("la connection avec la base de donnees "+ dbName +" s'est bien passee")
		// appeler express
		let app = express()
		// utiliser body parser
		app.use (bodyParser.json())
		app.use (bodyParser.urlencoded ({ extended: false }))
		// cross origin, permet à l'app de faire le crud
		app.use (function(req, res, next) {
			res.header('Access-Control-Allow-Origin', '*')
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token')
			next()
		})
		// lancer le server
		app.use ('/', routeAuthLogin)
		app.use ('/', routeAuthSignup)
		app.use ('/', routeUserList)
		app.use ('/', routeMessageList)
		app.use ('/', routeMessageSend)
		app.use ('/', routeMessageUpdate)
		app.listen (port, function(){ console.log ('ecoute sur le port '+ port) })
	},
	(error) =>{
		console.log ("un probleme empeche la connection avec la base de donnees "+ dbName)
		throw error
	}
)