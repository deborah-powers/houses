import express from 'express';
import bodyParser from 'body-parser';
import findUser from './authLoginController'

let router = express.Router();

router.use (bodyParser.json());
router.use (bodyParser.urlencoded ({ extended: false }));

router.post ('/auth/login', function (req, res){
	findUser (req.body.email, req.body.password).then (result =>{
		const toSend = {
			message: 'login: '+ result.succes,
			token: result.token
		}
		let statusCode = 200
		if (result.succes === 'error') statusCode = 404
		console.log (toSend.message)
		res.status (statusCode).send (toSend)
	})
})
export default router;
