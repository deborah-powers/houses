function newDate(){
	return {
		year: 2018,
		month: 1,
		day: 1,
		hour: 0,
		minute: 0,
	};
}
// choisir la date du jour
function todayDate (date){
	var today = new Date();
	date.year = today.getFullYear();
	date.month = today.getMonth() +1;
	date.day = today.getDate();
	date.hour = today.getHours();
	date.minute = today.getMinutes();
}
// choisir la date par defaut, "blank", 0000/00/00, 00:00
function blankDate (date){
	date.year =2018;
	date.month =1;
	date.day =1;
	date.hour =0;
	date.minute =0;
}
// mettre la date selectionnee en forme
// transformer 1 en 01
function addO (number){
	if (typeof (number) === 'string' && number.length ===1) number ='0'+ number;
	else if (typeof (number) === 'number' && number <10) number ='0'+ number;
	return number;
}
function dayToString (date){
	let day = date.year +'/';
	day = day + addO (date.month) +'/';
	day = day + addO (date.day);
	return day;
}
function hourToString (date){
	let hour = addO (date.hour) +':';
	hour = hour + addO (date.minute);
	return hour;
}
export default {
	newDate,
	todayDate,
	blankDate,
	dayToString,
	hourToString
};