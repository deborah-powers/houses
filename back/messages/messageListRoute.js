import express from 'express';
import bodyParser from 'body-parser';
import middleware from '../library/user-exists';
import getmessagesList from './messageListController'

let router = express.Router();

router.use (bodyParser.json());
router.use (bodyParser.urlencoded ({ extended: false }));

router.get ('/messages', middleware, function (req, res){
	const user = req.headers.user
	getmessagesList (user).then (result =>{
		const toSend = {
			message: 'messages list: '+ result.succes,
			messagesList: result.messagesList
		}
		let statusCode = 200
		if (result.succes.indexOf ('error') ===0) statusCode = 404
		console.log (toSend.message)
		res.status (statusCode).send (toSend)
	})
})
export default router;
