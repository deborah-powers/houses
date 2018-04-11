// les donnees sont stoquees dans un json
const jsonFile = '../data/login.json';
let jsonList = require (jsonFile);

function sortById (user1, user2){
	return user1.id - user2.id;
}
jsonList.sort (sortById);
let posMax = jsonList.length -1;
let idMax = jsonList [posMax].id;

export default {
	jsonFile,
	jsonList,
	idMax
}