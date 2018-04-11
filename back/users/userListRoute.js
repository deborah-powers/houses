import express from 'express';
import bodyParser from 'body-parser';
import middleware from '../library/user-exists';
import getUsersList from './userListController'

let router = express.Router();

router.use (bodyParser.json());
router.use (bodyParser.urlencoded ({ extended: false }));

router.get ('/users', middleware, function (req, res){
	getUsersList().then (result =>{
		const toSend = {
			message: 'users list: '+ result.succes,
			usersList: result.usersList
		}
		let statusCode = 200
		if (result.succes.indexOf ('error') ===0) statusCode = 404
		console.log (toSend.message)
		res.status (statusCode).send (toSend)
	})
})
export default router;
