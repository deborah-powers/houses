var mongoose = require ('mongoose')
// les noms
const dbName = 'projetVuejs'
const listUsers = 'users'
const listMessages = 'messages'
// connexion a mongodb via mongoose
mongoose.connect ('mongodb://localhost/' + dbName, function (err){
	if (err) { throw err; }
	else console.log ("la connection s'est bien passee")
});
// les schemas representent les patrons des objets a mettre dans les tables
var userSchema = new mongoose.Schema ({
	email:	String,
	password:	String,
	firstName:	String,
	lastName:	String
})
var messageSchema = new mongoose.Schema ({
	date:	String,
	dateRead:	String,
	author:	String,
	recipient:	String,
	title:	String,
	content:	String,
	read:	Boolean
})
// les models representent les tables de la bdd
var usersModel = mongoose.model (listUsers, userSchema)
var messagesModel = mongoose.model (listMessages, messageSchema)
// des tests. la bdd et ses collections ne sont crees que lors de l'insertion d'objet dedans
var user ={
	email:	'deborah.powers89@gmail.com',
	password:	'noisette',
	firstName:	'Deborah',
	lastName:	'Powers'
}
var message ={
	date:	'2018/03/26',
	dateRead:	'2018/03/26',
	author:	'deborah',
	recipient:	'hakima',
	title:	'test de message',
	content:	'ceci est un test',
	read:	false	
}
// inserer les objets dans la bdd
var insertUser = new usersModel (user)
insertUser.save (function (error){
	if (error) { throw error }
	else console.log ("l'utilisateur a ete insere")
})
var insertMessage = new messagesModel (message)
insertMessage.save (function (error){
	if (error) { throw error }
	else console.log ("le message a ete insere")
})
/* fermer la connecion
mongoose.connection.close()
*/