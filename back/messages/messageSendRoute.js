import express from 'express';
import bodyParser from 'body-parser';
import middleware from '../library/user-exists';
import sendMessage from './messageSendController'

let router = express.Router();

router.use (bodyParser.json());
router.use (bodyParser.urlencoded ({ extended: false }));

router.post ('/messages', middleware, function (req, res){
	const userEmail = req.headers.user.email
	sendMessage (req.body, userEmail).then( (result) =>{
		const toSend ={
			message: 'messages send: '+ result.succes,
		}
		let statusCode = 200
		if (result.succes.indexOf ('error') ===0) statusCode = 404
		console.log (toSend.message)
		res.status (statusCode).send (toSend)
	})
})
export default router
