import mongoose from 'mongoose'

const userSchema = new mongoose.Schema ({
	email:			String,
	password:		String,
	firstName:		String,
	lastName:		String,
	adress:			adress,
	creationDate:	Date
})
let usersModel = mongoose.model ('users', userSchema)

export default usersModel