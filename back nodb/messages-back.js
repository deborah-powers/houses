import express from 'express';
import basic from './library/user-list'
import middleware from './library/user-exists';

const jsonFile = './data/messages.json';
const messagesListAll = require (jsonFile);

let routeMessages = express.Router();

routeMessages.get ('/messages', middleware, function (req, res){
	// l'utilisateur est dans le header
	const user = req.headers.user;
	// liste finale qui contiendra tous les messages
	let messagesList =[];

	// A) trouver les messages ecris par user
	function findMessageFromUser (message){
		return message.author === user.email;
	}
	let messagesListTmp = messagesListAll.filter (findMessageFromUser);
	// pour chaque message, remplacer les emails representant les autheurs et destinataires par leur noms et prenoms
	messagesListTmp.forEach (function (message){
		// message aux nom modifies
		// decoder le titre et le message, qui ont ete escapes afin d'etre ecris dans du json
		let messageWithName ={
			id: message.id,
			date: message.date,
			author: user.firstName +' '+ user.lastName,
			recipient: message.recipient,
			title: decodeURI (message.title).trim(),
			content: decodeURI (message.content).trim(),
			read: message.read,
			toMarkAsRead: false
		};
		// l'autheur est l'utilisateur
		// retrouver les noms du destinataire
		function findRecipientByEmail (usr){
			return usr.email === message.recipient; }
		let recipient = basic.jsonList.find (findRecipientByEmail);
		messageWithName.recipient = recipient.firstName +' '+ recipient.lastName;
		messagesList.push (messageWithName);
	});

	// vider la liste
	messagesListTmp =[];

	// B) trouver les messages recus par user
	function findMessageToUser (message){
		return message.recipient === user.email;
	}
	messagesListTmp = messagesListAll.filter (findMessageToUser);

	// pour chaque message, remplacer les emails representant les autheurs et destinataires par leur noms et prenoms
	messagesListTmp.forEach (function (message){
		// message aux nom modifies
		let messageWithName ={
			id: message.id,
			date: message.date,
			author: message.author,
			recipient: user.firstName +' '+ user.lastName,
			title: decodeURI (message.title).trim(),
			content: decodeURI (message.content).trim(),
			read: message.read,
			toMarkAsRead: true
		};
		// retrouver les noms de l'autheur
		function findAuthorByEmail (usr){
			return usr.email === message.author; }
		let author = basic.jsonList.find (findAuthorByEmail);
		messageWithName.author = author.firstName +' '+ author.lastName;
		messagesList.push (messageWithName);
	});

	// C) trier les messages par date
	function sortMessagesByDate (msg1, msg2){
		return msg1.date - msg2.date;
	}
	messagesList.sort (sortMessagesByDate);
	if (messagesList.length >2) messagesList.reverse();

	if (messagesListTmp.length >0) res.status (200).send ({ message: 'les messages', user: user, messagesList: messagesList });
	else res.status (200).send ({ message: 'Aucun message', user: user, messagesList: [] });
});
export default routeMessages;
