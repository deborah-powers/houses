import express from 'express';
import routeLogin from './login-back';
import bodyParser from 'body-parser';
import routeSignup from './signup-back';
import routeUsers from './users-back';
import routeMessages from './messages-back';
import routeSendMessage from './sendMessage';
import routeUpdateMessage from './updateMessage';

// appeler express
let app = express();
// utiliser body parser
app.use (bodyParser.json());
app.use (bodyParser.urlencoded ({ extended: false }));
// cross origin, permet à l'app de faire le crud
app.use (function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
	next();
});
// lancer le server
const port = 1407;
app.use ('/', routeLogin);
app.use ('/', routeSignup);
app.use ('/', routeUsers);
app.use ('/', routeMessages);
app.use ('/', routeSendMessage);
app.use ('/', routeUpdateMessage);

app.listen (port, function(){ console.log ('ecoute sur le port '+ port); });