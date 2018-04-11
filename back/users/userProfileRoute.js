import express from 'express';
import bodyParser from 'body-parser';
import middleware from '../library/user-exists';
import getUser from './userProfileController'

let router = express.Router();

router.use (bodyParser.json());
router.use (bodyParser.urlencoded ({ extended: false }));

router.get ('/profile', middleware, function (req, res){
	const user = req.headers.user
	let result = getUser (user)
	let statusCode = 200
	if (result.succes === 'error') statusCode = 404
	console.log (toSend.message)
	res.status (statusCode).send (toSend)
})
export default router;