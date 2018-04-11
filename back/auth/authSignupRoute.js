import express from 'express';
import bodyParser from 'body-parser';
import findUser from './authSignupController'

let router = express.Router();

router.use (bodyParser.json());
router.use (bodyParser.urlencoded ({ extended: false }));

router.post ('/auth/signup', function (req, res){
	findUser (req.body).then (result =>{
		const toSend = {
			message: 'signup: '+ result.succes,
			token: result.token
		}
		let statusCode = 200
		if (result.succes.indexOf ('error') ===0) statusCode = 404
		console.log (toSend.message)
		res.status (statusCode).send (toSend)
	})
})
export default router;
