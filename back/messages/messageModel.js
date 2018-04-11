import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema ({
	date:		Date,
	dateRead:	D,
	author:		String,
	recipient:	String,
	title:		String,
	content:	String,
	read:		Boolean
})
let messagesModel = mongoose.model ('messages', messageSchema)

export default messagesModel