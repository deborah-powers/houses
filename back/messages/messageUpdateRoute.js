import express from 'express';
import bodyParser from 'body-parser';
import middleware from '../library/user-exists';
import updateMessage from './messageUpdateController'

let router = express.Router();

router.use (bodyParser.urlencoded ({ extended: false }));

router.put ('/messages/:id', middleware, function (req, res){
	const messageId = req.params.id
	updateMessage (messageId).then( (result) =>{
		const toSend ={
			message: 'messages update: '+ result.succes
		}
		let statusCode = 200
		if (result.succes === 'error') statusCode = 404
		console.log (toSend.message)
		res.status (statusCode).send (toSend)
	})
})
export default router
