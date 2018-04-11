import mongoose from 'mongoose';
// les noms
const dbName = 'projetVuejs'
const listUsers = 'users'
const listMessages = 'messages'
// connexion a mongodb via mongoose
mongoose.connect ('mongodb://localhost/' + dbName, function (err){
	if (err) { throw err; }
});
// les schemas representent les patrons des objets a mettre dans les tables
let userSchema = new mongoose.Schema ({
	email:	String,
	password:	String,
	firstName:	String,
	lastName:	String
})
let messageSchema = new mongoose.Schema ({
	date:	String,
	dateRead:	String,
	author:	String,
	recipient:	String,
	title:	String,
	content:	String,
	read:	Boolean
})
// les models representent les tables de la bdd
let usersModel = mongoose.model (listUsers, userSchema)
let messagesModel = mongoose.model (listMessages, messageSchema)
// fermer la connecion
mongoose.connection.close()